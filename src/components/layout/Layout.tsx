import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ScrollRestoration } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col pt-[80px]"> {/* Height of navbar to prevent jump */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollRestoration />
    </div>
  );
}
