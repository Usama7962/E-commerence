import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Providers.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatsappFloat from "./component/WhatsappFloat.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HerbalCure - Natural Herbal Products",
  description: "Your trusted source for premium herbal remedies and natural wellness products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <WhatsappFloat />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Providers>
      </body>
    </html>
  );
}
