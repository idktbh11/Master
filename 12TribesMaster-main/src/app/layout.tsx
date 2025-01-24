import "./globals.css";
import "../assets/css/style.scss";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <title>12 Tribes Website</title>
      </head>
      <body className="min-w-screen min-h-screen overflow-x-hidden" suppressHydrationWarning={true}>
        <audio id="audio" src="/audio/music.mp3" autoPlay loop></audio>
        <div className="fixed left-2/4 top-2/4 -z-[1] w-[400vw] h-[400vh] mt-[-200vh] ml-[-200vw] animate-[spin_240s_linear_infinite] bg-[length:240px_240px] bg-space origin-center bg-black"></div>
        <Header />
        {children}
        <ToastContainer autoClose={3000} style={{ paddingTop: "90px" }} />
      </body>
    </html>
  );
}
