import { useEffect, useState } from "preact/hooks";

export interface HeaderProps {
  domain: string;
}

export default function Header({ domain }: HeaderProps) {
  const mediaStatus =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkmode") == undefined
      ? !!mediaStatus
      : localStorage.getItem("darkmode") === "true"
      ? true
      : false
  );
  const onChange = () => {
    localStorage.setItem("darkmode", !isDarkMode ? "true" : "false");
    setIsDarkMode(!isDarkMode);
  };
  const onOpen = () => document.body.classList.toggle("nav-open");
  const onClose = () => document.body.classList.remove("nav-open");

  if (mediaStatus) {
    mediaStatus.addEventListener("change", (e) => {
      localStorage.setItem("darkmode", e.matches ? "true" : "false");
      setIsDarkMode(e.matches);
    });
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkmode-on");
    } else {
      document.body.classList.remove("darkmode-on");
    }
  }, [isDarkMode]);

  return (
    <header data-nosnippet>
      <div class="logo">
        <a aria-label={`${domain} Logo`} href="#top">
          <img
            src="/img/icons/manifest-icon-192.png"
            width="48"
            height="48"
            alt=""
          />
        </a>
      </div>

      <div class="darkmode-toggle">
        <label for="darkmode-toggle">
          <input
            type="checkbox"
            id="darkmode-toggle"
            checked={isDarkMode}
            onChange={onChange}
          />
        </label>
      </div>

      <button
        class="nav-toggle"
        aria-label="Toggle Navigation"
        onClick={onOpen}
      >
        <span class="hamburger"></span>
      </button>

      <nav class="nav">
        <ul class="list">
          <li class="item">
            <a href="#home" class="link" onClick={onClose}>
              Home
            </a>
          </li>
          <li class="item">
            <a href="#services" class="link" onClick={onClose}>
              Skills
            </a>
          </li>
          <li class="item">
            <a href="#about" class="link" onClick={onClose}>
              About
            </a>
          </li>
          <li class="item">
            <a href="#work" class="link" onClick={onClose}>
              Work
            </a>
          </li>
          <li class="item">
            <a href="#contact" class="link" onClick={onClose}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
