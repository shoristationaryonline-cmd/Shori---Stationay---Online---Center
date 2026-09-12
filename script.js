// ================================
// SHORI ONLINE CENTER - JOB SYSTEM
// ================================

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


// =================================
// Job Category
// =================================

function getJobCategory(job) {

  const text = (
    (job.title || "") + " " +
    (job.department || "") + " " +
    (job.postName || "") + " " +
    (job.details || "")
  ).toLowerCase();


  // Railway
  if (
    text.includes("railway") ||
    text.includes("rrb") ||
    text.includes("रेलवे")
  ) {
    return "Railway";
  }


  // Bank
  if (
    text.includes("bank") ||
    text.includes("ibps") ||
    text.includes("sbi") ||
    text.includes("pnb") ||
    text.includes("bob") ||
    text.includes("iob")
  ) {
    return "Bank";
  }


  // Defence
  if (
    text.includes("defence") ||
    text.includes("defense") ||
    text.includes("army") ||
    text.includes("air force") ||
    text.includes("navy") ||
    text.includes("crpf") ||
    text.includes("bsf") ||
    text.includes("cisf") ||
    text.includes("ssb") ||
    text.includes("itbp") ||
    text.includes("coast guard") ||
    text.includes("रक्षा")
  ) {
    return "Defence";
  }


  // SSC
  if (
    text.includes("ssc") ||
    text.includes("staff selection commission")
  ) {
    return "SSC";
  }


  // UPSC
  if (
    text.includes("upsc") ||
    text.includes("union public service")
  ) {
    return "UPSC";
  }


  // State
  if (
    text.includes("chhattisgarh") ||
    text.includes("cg ") ||
    text.includes("vyapam") ||
    text.includes("state government") ||
    text.includes("छत्तीसगढ़") ||
    text.includes("राज्य")
  ) {
    return "State";
  }


  // Teaching
  if (
    text.includes("teacher") ||
    text.includes("school") ||
    text.includes("education") ||
    text.includes("teaching") ||
    text.includes("professor") ||
    text.includes("lecturer") ||
    text.includes("शिक्षक") ||
    text.includes("शिक्षा")
  ) {
    return "Teaching";
  }


  return "Other";
}


// =================================
// Show Jobs
// =================================

function showJobs(jobs, container, category) {

  container.innerHTML = "";

  let filteredJobs = jobs;

  if (category !== "All") {
    filteredJobs = jobs.filter(function(job) {
      return getJobCategory(job) === category;
    });
  }


  if (filteredJobs.length === 0) {

    container.innerHTML = `
      <div class="job-error" style="padding:20px;">
        इस category में अभी कोई भर्ती उपलब्ध नहीं है।
      </div>
    `;

    return;
  }


  filteredJobs.forEach(function(job) {

    const jobItem = document.createElement("a");

    jobItem.href =
      "job.html?id=" + encodeURIComponent(job.id);

    jobItem.className = "job-update";

    jobItem.style.textDecoration = "none";
    jobItem.style.color = "inherit";
    jobItem.style.cursor = "pointer";

    jobItem.innerHTML = `
      <b>New</b>
      <span>${job.title || ""}</span>
      <small>${job.date || ""}</small>
    `;

    container.appendChild(jobItem);

  });
}


// =================================
// Category Buttons
// =================================

function createCategoryButtons(jobs, container) {

  const oldBox =
    document.querySelector(".job-categories");

  if (oldBox) {
    oldBox.remove();
  }


  const categories = [
    ["All India", "All"],
    ["🚆 Railway", "Railway"],
    ["🏦 Bank", "Bank"],
    ["🪖 Defence", "Defence"],
    ["🏛️ State", "State"],
    ["📋 SSC", "SSC"],
    ["🏢 UPSC", "UPSC"],
    ["🎓 Teaching", "Teaching"],
    ["📌 Other", "Other"]
  ];


  const categoryBox =
    document.createElement("div");

  categoryBox.className = "job-categories";


  categoryBox.style.display = "flex";
  categoryBox.style.flexWrap = "wrap";
  categoryBox.style.gap = "8px";
  categoryBox.style.margin = "20px 0";


  categories.forEach(function(item, index) {

    const button =
      document.createElement("button");

    button.type = "button";

    button.textContent = item[0];

    button.className =
      "job-category-button";


    button.style.padding = "10px 14px";
    button.style.borderRadius = "20px";
    button.style.border = "1px solid #ddd";
    button.style.fontWeight = "600";
    button.style.cursor = "pointer";


    if (index === 0) {
      button.style.background = "#17324d";
      button.style.color = "#ffffff";
    } else {
      button.style.background = "#ffffff";
      button.style.color = "#17324d";
    }


    button.addEventListener("click", function() {

      document
        .querySelectorAll(".job-category-button")
        .forEach(function(btn) {

          btn.style.background = "#ffffff";
          btn.style.color = "#17324d";

        });


      button.style.background = "#17324d";
      button.style.color = "#ffffff";


      showJobs(
        jobs,
        container,
        item[1]
      );

    });


    categoryBox.appendChild(button);

  });


  container.parentNode.insertBefore(
    categoryBox,
    container
  );
}


// =================================
// Load Jobs
// =================================

async function loadJobs() {

  const jobContainer =
    document.getElementById("jobUpdates");


  if (!jobContainer) {
    return;
  }


  try {

    const response =
      await fetch("jobs.json");


    if (!response.ok) {
      throw new Error("jobs.json not found");
    }


    const jobs =
      await response.json();


    if (!Array.isArray(jobs)) {
      throw new Error("jobs.json format error");
    }


    // Category Buttons
    createCategoryButtons(
      jobs,
      jobContainer
    );


    // Show All Jobs
    showJobs(
      jobs,
      jobContainer,
      "All"
    );


  } catch (error) {

    console.error(
      "Jobs loading error:",
      error
    );


    jobContainer.innerHTML = `
      <div class="job-error">
        Latest jobs temporarily unavailable.
      </div>
    `;

  }

}


// Start
document.addEventListener(
  "DOMContentLoaded",
  loadJobs
);