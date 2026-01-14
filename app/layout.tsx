import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Predict | The BNB-native Prediction Market",
  description: "The BNB-native information market where it pays to be right. Bet on outcomes ranging from sports to politics, and cash in on your correct forecasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
