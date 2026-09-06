function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
}

document.getElementById("year").textContent = new Date().getFullYear();
