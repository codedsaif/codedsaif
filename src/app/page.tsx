import {
  Navbar,
  Profile,
  About,
  Skills,
  SoftSkills,
  GitHubActivity,
  Projects,
  Contact,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Profile />
        <About />
        <Skills />
        <SoftSkills />
        <GitHubActivity />
        <Projects />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
