import Image from "next/image";
import { Navbar, Profile, Contact, Footer } from "@/components";

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Profile />
        {/* <Contact /> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
