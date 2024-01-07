import Image from "next/image";
import { Navbar, Profile, Footer } from "@/components";

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Profile />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
