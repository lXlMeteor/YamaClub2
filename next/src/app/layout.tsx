import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header/header";
// import Footer from "./components/footer/footer";
import FooterWrapper from './components/footer/footerWrapper';
import AuthContext from './context/AuthContext';
import getCurrentUser from './actions/getCurrentUser';


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="ja">
      <body>
        <AuthContext>
          <Header currentUser={currentUser}/>
          {children}
          <FooterWrapper />
        </AuthContext>
      </body>
    </html>
  );
}
