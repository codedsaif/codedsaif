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
        {/* Order: hook (Profile) → context (About) → proof (Projects + GitHub)
            → capability (Skills) → history (Experience) → CTA (Contact).
            GitHub and Contact are the ONLY navy cards — mid-page anchor and
            page finale; every page-bg section opens with the faded boundary
            hairline. */}
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
