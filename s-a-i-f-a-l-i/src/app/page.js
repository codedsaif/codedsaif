import Image from "next/image";
import {
  Navbar,
  Profile,
  About,
  Skills,
  SoftSkills,
  Projects,
  Contact,
  Footer,
} from "@/components";

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
        <SoftSkills />
        <Projects />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
