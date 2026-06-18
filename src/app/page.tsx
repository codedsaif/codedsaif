import {
  Navbar,
  Profile,
  About,
  Projects,
  GitHubActivity,
  Skills,
  Experience,
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
        {/* Order: lead with proof (Projects + GitHub), then background
            (Skills + Experience). Navy cards (About / GitHub / Contact)
            alternate with page-bg sections for visual rhythm. */}
        <Profile />
        <About />
        <Projects />
        <GitHubActivity />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
