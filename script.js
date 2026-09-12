// Mobile Menu
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) {
    nav.classList.toggle("open");
  }
}

// Current Year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Load Latest Jobs
async function loadJobs() {
  const jobContainer = document.getElementById("jobUpdates");

  if (!jobContainer) return;

  try {
    const response = await fetch("jobs.json");

    if (!response.ok) {
      throw new Error("jobs.json not found");
    }

    const jobs = await response.json();

    jobContainer.innerHTML = "";

    jobs.forEach((job) => {
      const jobItem = document.createElement("a");

      jobItem.href = `job.html?id=${encodeURIComponent(job.id)}`;
      jobItem.className = "job-update";

      jobItem.innerHTML = `
        <b>New</b>
        <span>${job.title}</span>
        <small>${job.date || ""}</small>
      `;

      jobContainer.appendChild(jobItem);
    });

  } catch (error) {
    console.error("Jobs loading error:", error);

    jobContainer.innerHTML = `
      <div class="job-error">
        Latest jobs temporarily unavailable.
      </div>
    `;
  }
}

// Start
document.addEventListener("DOMContentLoaded", loadJobs);
