// Privy + Supabase Authentication Integration
// Configure your Privy App ID below

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const PRIVY_APP_ID = 'cm5ya0hoz00f3kvz3dgplpznt'; // Get this from https://dashboard.privy.io
const SUPABASE_URL = 'https://bqncfjnigubyictxbliq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbmNmam5pZ3VieWljdHhibGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MDEwNTgsImV4cCI6MjA1MjM3NzA1OH0.GpQsJcKW-UENe7OZnZVkTx_HBvZjVrmbS2F7c8CJDWM';

// ============================================
// GLOBAL STATE
// ============================================
let supabaseClient = null;
let privyClient = null;
let currentUser = null;
let isAuthenticated = false;

// ============================================
// INITIALIZATION
// ============================================

// Initialize Supabase
function initSupabase() {
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized');
    return true;
  }
  console.error('Supabase library not loaded');
  return false;
}

// Initialize Privy
async function initPrivy() {
  try {
    if (typeof window.PrivyCore !== 'undefined') {
      privyClient = new window.PrivyCore.PrivyClient({
        appId: PRIVY_APP_ID,
      });
      console.log('Privy initialized');

      // Check if user is already authenticated
      const user = await privyClient.getUser();
      if (user) {
        await handleAuthenticatedUser(user);
      }
      return true;
    }
  } catch (err) {
    console.log('Privy SDK not available, using fallback auth');
  }
  return false;
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Login with Privy
async function login() {
  try {
    // Try Privy first
    if (privyClient) {
      await privyClient.login();
      const user = await privyClient.getUser();
      if (user) {
        await handleAuthenticatedUser(user);
        return;
      }
    }

    // Fallback to Phantom wallet direct connection
    await connectPhantomWallet();
  } catch (err) {
    console.error('Login error:', err);
    // Fallback to Phantom
    await connectPhantomWallet();
  }
}

// Connect Phantom wallet directly (fallback)
async function connectPhantomWallet() {
  if (!window.phantom?.solana) {
    // Show install prompt
    showInstallPhantomModal();
    return null;
  }

  try {
    const provider = window.phantom.solana;
    const resp = await provider.connect();
    const walletAddress = resp.publicKey.toString();

    console.log('Connected wallet:', walletAddress);

    // Check if user exists in database
    const existingUser = await checkUserByWallet(walletAddress);

    if (existingUser) {
      currentUser = existingUser;
      isAuthenticated = true;
      updateUIForLoggedInUser(existingUser);
    } else {
      // Show profile creation popup for new users
      showProfileCreationPopup(walletAddress);
    }

    return walletAddress;
  } catch (err) {
    console.error('Wallet connection error:', err);
    if (err.code === 4001) {
      console.log('User rejected the connection request');
    }
    return null;
  }
}

// Handle authenticated user (from Privy or wallet)
async function handleAuthenticatedUser(privyUser) {
  try {
    // Get wallet address from Privy user
    let walletAddress = null;
    if (privyUser.wallet) {
      walletAddress = privyUser.wallet.address;
    } else if (privyUser.linkedAccounts) {
      const walletAccount = privyUser.linkedAccounts.find(a => a.type === 'wallet');
      if (walletAccount) {
        walletAddress = walletAccount.address;
      }
    }

    // Check if user exists in our database
    const existingUser = walletAddress ? await checkUserByWallet(walletAddress) : null;

    if (existingUser) {
      currentUser = existingUser;
      isAuthenticated = true;
      updateUIForLoggedInUser(existingUser);
    } else {
      // Show profile creation for new users
      showProfileCreationPopup(walletAddress || privyUser.id);
    }
  } catch (err) {
    console.error('Error handling authenticated user:', err);
  }
}

// Logout
async function logout() {
  try {
    // Logout from Privy if available
    if (privyClient) {
      await privyClient.logout();
    }

    // Disconnect Phantom if connected
    if (window.phantom?.solana?.isConnected) {
      await window.phantom.solana.disconnect();
    }

    currentUser = null;
    isAuthenticated = false;
    updateUIForLoggedOutUser();

    // Clear storage
    localStorage.removeItem('predict_user');
    localStorage.removeItem('predict_wallet');

    console.log('Logged out successfully');
  } catch (err) {
    console.error('Logout error:', err);
  }
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

// Check if user exists by wallet address
async function checkUserByWallet(walletAddress) {
  if (!supabaseClient) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking user:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error checking user:', err);
    return null;
  }
}

// Create user in Supabase
async function createUser(userData) {
  if (!supabaseClient) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    const { data, error } = await supabaseClient
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      alert('Error creating profile: ' + error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error creating user:', err);
    return null;
  }
}

// Upload profile photo
async function uploadProfilePhoto(file, identifier) {
  if (!supabaseClient) return null;

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${identifier.substring(0, 8)}-${Date.now()}.${fileExt}`;
    const filePath = `profile-photos/${fileName}`;

    const { data, error } = await supabaseClient.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading photo:', error);
      return null;
    }

    const { data: urlData } = supabaseClient.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error('Error uploading photo:', err);
    return null;
  }
}

// ============================================
// UI FUNCTIONS
// ============================================

// Show install Phantom modal
function showInstallPhantomModal() {
  const modal = document.createElement('div');
  modal.id = 'phantom-install-modal';
  modal.className = 'modal-overlay show';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-title">Phantom Wallet Required</div>
      <p class="modal-text">To use Predict on Solana, you need to install the Phantom wallet browser extension.</p>
      <a href="https://phantom.app/" target="_blank" class="modal-btn modal-btn-primary" style="text-decoration: none;">
        <svg class="w-5 h-5" viewBox="0 0 128 128" fill="currentColor">
          <circle cx="64" cy="64" r="64" fill="url(#phantom-gradient-install)"/>
          <defs>
            <linearGradient id="phantom-gradient-install" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#534BB1"/>
              <stop offset="100%" style="stop-color:#551BF9"/>
            </linearGradient>
          </defs>
          <path d="M110.584 64.9142H99.142C99.142 41.7651 80.173 23 56.7724 23C33.6612 23 14.8716 41.3057 14.4118 64.0583C13.936 87.5169 35.1858 108 58.8862 108H64.4375C85.4561 108 110.584 89.1507 110.584 64.9142Z" fill="white"/>
          <ellipse cx="44.5" cy="58.5" rx="7.5" ry="8.5" fill="#534BB1"/>
          <ellipse cx="70.5" cy="58.5" rx="7.5" ry="8.5" fill="#534BB1"/>
        </svg>
        Install Phantom
      </a>
      <button onclick="this.closest('.modal-overlay').remove()" class="modal-btn modal-btn-secondary">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Show profile creation popup
function showProfileCreationPopup(walletAddress) {
  const popup = document.getElementById('profile-popup');
  if (popup) {
    popup.classList.remove('hidden');

    // Store wallet address for form submission
    popup.dataset.walletAddress = walletAddress;

    // Pre-fill wallet address
    const walletInput = document.getElementById('profile-wallet');
    if (walletInput) {
      walletInput.value = walletAddress;
    }
  }
}

// Hide profile creation popup
function hideProfileCreationPopup() {
  const popup = document.getElementById('profile-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
}

// Handle profile form submission
async function handleProfileSubmit(event) {
  event.preventDefault();

  const popup = document.getElementById('profile-popup');
  const walletAddress = popup?.dataset.walletAddress;

  if (!walletAddress) {
    alert('Please connect your wallet first');
    return;
  }

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Creating...';
  submitBtn.disabled = true;

  try {
    const username = document.getElementById('profile-username').value.trim();
    const bio = document.getElementById('profile-bio')?.value.trim() || '';
    const photoInput = document.getElementById('profile-photo');

    if (!username) {
      alert('Please enter a username');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    // Check if username is taken
    const { data: existingUsername } = await supabaseClient
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUsername) {
      alert('Username is already taken. Please choose another.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    // Upload photo if provided
    let photoUrl = null;
    if (photoInput?.files?.length > 0) {
      photoUrl = await uploadProfilePhoto(photoInput.files[0], walletAddress);
    }

    // Create user
    const userData = {
      username: username,
      bio: bio,
      profile_photo_url: photoUrl,
      wallet_address: walletAddress,
      created_at: new Date().toISOString()
    };

    const newUser = await createUser(userData);

    if (newUser) {
      currentUser = newUser;
      isAuthenticated = true;
      hideProfileCreationPopup();
      updateUIForLoggedInUser(newUser);
      console.log('Profile created successfully:', newUser);
    }
  } catch (error) {
    console.error('Error creating profile:', error);
    alert('Error creating profile. Please try again.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
  // Hide login/signup buttons
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');

  if (loginBtn) loginBtn.style.display = 'none';
  if (signupBtn) signupBtn.style.display = 'none';

  // Show user menu
  const userMenu = document.getElementById('user-menu');
  if (userMenu) {
    userMenu.classList.remove('hidden');

    // Update avatar
    const avatar = userMenu.querySelector('.user-avatar');
    if (avatar) {
      if (user.profile_photo_url) {
        avatar.src = user.profile_photo_url;
      } else {
        avatar.src = '/images/default-avatar.png';
      }
    }

    // Update username
    const usernameEl = userMenu.querySelector('.username');
    if (usernameEl) {
      usernameEl.textContent = user.username || 'User';
    }
  }

  // Store user in localStorage
  localStorage.setItem('predict_user', JSON.stringify(user));
  localStorage.setItem('predict_wallet', user.wallet_address);
}

// Update UI for logged out state
function updateUIForLoggedOutUser() {
  // Show login/signup buttons
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');

  if (loginBtn) loginBtn.style.display = 'inline-flex';
  if (signupBtn) signupBtn.style.display = 'inline-flex';

  // Hide user menu
  const userMenu = document.getElementById('user-menu');
  if (userMenu) {
    userMenu.classList.add('hidden');
  }

  // Clear localStorage
  localStorage.removeItem('predict_user');
  localStorage.removeItem('predict_wallet');
}

// Check for existing session
async function checkExistingSession() {
  const savedWallet = localStorage.getItem('predict_wallet');
  const savedUser = localStorage.getItem('predict_user');

  if (savedWallet && savedUser) {
    try {
      // Verify with database
      const user = await checkUserByWallet(savedWallet);
      if (user) {
        currentUser = user;
        isAuthenticated = true;
        updateUIForLoggedInUser(user);
        return;
      }
    } catch (err) {
      console.error('Error restoring session:', err);
    }
  }

  // Clear stale data and ensure logged out state
  localStorage.removeItem('predict_user');
  localStorage.removeItem('predict_wallet');
  updateUIForLoggedOutUser();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize services
  initSupabase();
  await initPrivy();

  // Ensure UI is in logged out state initially
  updateUIForLoggedOutUser();

  // Then check for existing session
  await checkExistingSession();

  // Attach event listeners
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');
  const logoutBtn = document.getElementById('logout-btn');
  const profileForm = document.getElementById('profile-form');
  const closePopupBtn = document.getElementById('close-profile-popup');

  if (loginBtn) {
    loginBtn.addEventListener('click', login);
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', login);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileSubmit);
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', hideProfileCreationPopup);
  }

  // Listen for Phantom wallet events
  if (window.phantom?.solana) {
    window.phantom.solana.on('disconnect', () => {
      console.log('Wallet disconnected');
      currentUser = null;
      isAuthenticated = false;
      updateUIForLoggedOutUser();
    });

    window.phantom.solana.on('accountChanged', (publicKey) => {
      if (!publicKey) {
        updateUIForLoggedOutUser();
      }
    });
  }
});

// Export functions
window.PredictAuth = {
  login,
  logout,
  isAuthenticated: () => isAuthenticated,
  getCurrentUser: () => currentUser
};
