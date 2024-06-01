import { Inter } from "next/font/google";
import Header from "./components/header";
import "./globals.css";
import "./main.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnyTru - Bringing Your Ideas To Life",
  description: "Bringing Your Ideas To Life",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        {/* {showHeader && <Header />} */}
        {/* <Header/> */}
        {children}
      </body>
    </html>
  );
}
