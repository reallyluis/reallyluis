(() => {
  const mediaStatus =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  const darkmodeToggle = document.querySelector(".darkmode-toggle input");

  const setDarkmodeToggle = (isOn = false) => {
    if (isOn) {
      document.body.classList.add("darkmode-on");
    } else {
      document.body.classList.remove("darkmode-on");
    }

    if (darkmodeToggle) {
      darkmodeToggle.checked = !!isOn;
    }
  };

  if (darkmodeToggle) {
    darkmodeToggle.addEventListener("change", () =>
      setDarkmodeToggle(darkmodeToggle && darkmodeToggle.checked)
    );
  }

  if (mediaStatus) {
    setDarkmodeToggle(mediaStatus.matches);

    mediaStatus.addEventListener("change", (e) => setDarkmodeToggle(e.matches));
  }

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  const navLinks = document.querySelectorAll(".link");
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
      });
    });
  }
})();
