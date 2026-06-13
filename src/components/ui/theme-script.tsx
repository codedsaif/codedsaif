// Dark is the default (the <html> tag ships with class="dark"). This runs
// before first paint and only DROPS dark mode if the user explicitly chose
// light — so there's no flash in either direction.
const themeScript = `
(function () {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
