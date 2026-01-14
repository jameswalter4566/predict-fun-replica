// Phantom Wallet and Supabase Authentication Integration
// This provides direct Phantom wallet integration for a static HTML site

// Configuration
const SUPABASE_URL = 'https://bqncfjnigubyictxbliq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbmNmam5pZ3VieWljdHhibGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MDEwNTgsImV4cCI6MjA1MjM3NzA1OH0.GpQsJcKW-UENe7OZnZVkTx_HBvZjVrmbS2F7c8CJDWM'; // Replace with your actual anon key

// Global state
let supabase = null;
let currentUser = null;
let connectedWallet = null;

// Initialize Supabase
function initSupabase() {
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized');
    return true;
  }
  console.error('Supabase library not loaded');
  return false;
}

// Check if Phantom wallet is installed
function isPhantomInstalled() {
  const provider = window.phantom?.solana;
  return provider?.isPhantom;
}

// Get Phantom provider
function getPhantomProvider() {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
  // If Phantom is not installed, redirect to install page
  window.open('https://phantom.app/', '_blank');
  return null;
}

// Connect to Phantom wallet
async function connectWallet() {
  try {
    const provider = getPhantomProvider();
    if (!provider) {
      alert('Please install Phantom wallet to continue');
      return null;
    }

    // Connect to wallet
    const resp = await provider.connect();
    const walletAddress = resp.publicKey.toString();
    connectedWallet = walletAddress;

    console.log('Connected wallet:', walletAddress);

    // Check if user exists in database
    const existingUser = await checkUserByWallet(walletAddress);

    if (existingUser) {
      currentUser = existingUser;
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

// Disconnect wallet
async function disconnectWallet() {
  try {
    const provider = getPhantomProvider();
    if (provider) {
      await provider.disconnect();
    }
    connectedWallet = null;
    currentUser = null;
    updateUIForLoggedOutUser();
    console.log('Wallet disconnected');
  } catch (err) {
    console.error('Disconnect error:', err);
  }
}

// Check if user exists by wallet address
async function checkUserByWallet(walletAddress) {
  if (!supabase) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
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
  if (!supabase) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
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

// Upload profile photo to Supabase storage
async function uploadProfilePhoto(file, walletAddress) {
  if (!supabase) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${walletAddress.substring(0, 8)}-${Date.now()}.${fileExt}`;
    const filePath = `profile-photos/${fileName}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading photo:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error('Error uploading photo:', err);
    return null;
  }
}

// Show profile creation popup
function showProfileCreationPopup(walletAddress) {
  const popup = document.getElementById('profile-popup');
  if (popup) {
    popup.classList.remove('hidden');

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

  if (!connectedWallet) {
    alert('Please connect your wallet first');
    return;
  }

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Creating...';
  submitBtn.disabled = true;

  try {
    // Get form data
    const username = document.getElementById('profile-username').value.trim();
    const bio = document.getElementById('profile-bio').value.trim() || '';
    const photoInput = document.getElementById('profile-photo');

    if (!username) {
      alert('Please enter a username');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    // Check if username is already taken
    const { data: existingUsername } = await supabase
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
    if (photoInput.files.length > 0) {
      photoUrl = await uploadProfilePhoto(photoInput.files[0], connectedWallet);
    }

    // Create user in database
    const userData = {
      privy_user_id: `phantom_${connectedWallet}`,
      username: username,
      bio: bio,
      profile_photo_url: photoUrl,
      wallet_address: connectedWallet,
      email: null,
      created_at: new Date().toISOString()
    };

    const newUser = await createUser(userData);

    if (newUser) {
      currentUser = newUser;
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
    if (avatar && user.profile_photo_url) {
      avatar.src = user.profile_photo_url;
    } else if (avatar) {
      // Create a gradient avatar with initials
      avatar.style.background = 'linear-gradient(135deg, rgb(110, 87, 249), rgb(139, 92, 246))';
    }

    // Update username
    const usernameEl = userMenu.querySelector('.username');
    if (usernameEl) {
      usernameEl.textContent = user.username || 'User';
    }
  }

  // Store user in localStorage for persistence
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

// Check for existing session on page load
async function checkExistingSession() {
  const savedWallet = localStorage.getItem('predict_wallet');
  const savedUser = localStorage.getItem('predict_user');

  if (savedWallet && savedUser) {
    try {
      // Verify the wallet is still connected
      const provider = getPhantomProvider();
      if (provider && provider.isConnected) {
        const user = JSON.parse(savedUser);
        currentUser = user;
        connectedWallet = savedWallet;
        updateUIForLoggedInUser(user);
        return;
      }
    } catch (err) {
      console.error('Error restoring session:', err);
    }
  }

  // Clear any stale data
  localStorage.removeItem('predict_user');
  localStorage.removeItem('predict_wallet');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Supabase
  initSupabase();

  // Check for existing session
  await checkExistingSession();

  // Attach event listeners
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');
  const logoutBtn = document.getElementById('logout-btn');
  const profileForm = document.getElementById('profile-form');
  const closePopupBtn = document.getElementById('close-profile-popup');

  if (loginBtn) {
    loginBtn.addEventListener('click', connectWallet);
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', connectWallet);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', disconnectWallet);
  }

  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileSubmit);
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', hideProfileCreationPopup);
  }

  // Listen for wallet disconnect events
  if (window.phantom?.solana) {
    window.phantom.solana.on('disconnect', () => {
      console.log('Wallet disconnected');
      currentUser = null;
      connectedWallet = null;
      updateUIForLoggedOutUser();
    });

    window.phantom.solana.on('accountChanged', (publicKey) => {
      if (publicKey) {
        console.log('Account changed to:', publicKey.toString());
        // Reconnect with new account
        connectWallet();
      } else {
        // Disconnected
        updateUIForLoggedOutUser();
      }
    });
  }
});

// Export functions for use in HTML
window.PredictAuth = {
  connectWallet,
  disconnectWallet,
  isPhantomInstalled,
  checkExistingSession
};
