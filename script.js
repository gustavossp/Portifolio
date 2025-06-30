document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Function to set the theme
  const setTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('light-theme');
      themeToggle.textContent = '☀️'; // Sun icon for light theme
    } else {
      body.classList.remove('light-theme');
      themeToggle.textContent = '🌙'; // Moon icon for dark theme
    }
    localStorage.setItem('theme', theme); // Save theme preference
  };

  // Get saved theme from localStorage or default to 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme); // Apply the saved theme on load

  // Event listener for theme toggle button
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // --- Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href').substring(1); // Get the section ID
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Scroll smoothly to the target section
        window.scrollTo({
          top: targetSection.offsetTop - (document.querySelector('header').offsetHeight + 20), // Adjust for fixed header height + a little extra padding
          behavior: 'smooth'
        });

        // Optional: Update URL hash without jumping
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });

  // --- Highlight Active Navigation Link on Scroll ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const highlightNavLink = () => {
    let current = '';
    sections.forEach(section => {
      // Get the position of the section relative to the viewport
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // If the scroll position is within the section
      if (scrollY >= sectionTop - sectionHeight / 3) { // Adjust 'sectionHeight / 3' for better activation point
        current = section.getAttribute('id');
      }
    });

    // Remove 'active' class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add 'active' class to the corresponding link
    if (current) {
      const activeLink = document.querySelector(`nav a[href*='${current}']`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  };

  // Listen for scroll events to highlight navigation links
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Call on load to set initial active section

  // --- Particle Animation Logic (REMOVED) ---
  // Todo o código relacionado ao canvas e partículas foi removido daqui.
  // O background agora é controlado puramente pelo CSS no body.
});
