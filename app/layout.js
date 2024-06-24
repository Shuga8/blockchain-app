import { Inter } from "next/font/google";
import "./globals.css";
import { ChatAppProvider } from "./Context/ChatAppContext";
import { Navbar } from "./Components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blockchain ChatApp",
  description: "Block Chain App, Development Stage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatAppProvider>
          <Navbar />
          {children}
        </ChatAppProvider>
      </body>
    </html>
  );
}
