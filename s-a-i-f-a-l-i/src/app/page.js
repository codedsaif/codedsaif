import Image from "next/image";
import { Navbar, Profile, About, Skills, Contact, Footer } from "@/components";

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Profile />
        <About />
        <Skills />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
