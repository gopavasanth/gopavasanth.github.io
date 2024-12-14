// Initialize AOS
AOS.init();

// Function to fetch the last updated commit date from GitHub
function fetchLastUpdated() {
  const lastUpdatedElement = document.getElementById("last-updated");

  fetch("https://api.github.com/repos/gopavasanth/gopavasanth.github.io/commits")
    .then((response) => response.json())
    .then((commits) => {
      const lastCommitDate = new Date(commits[0].commit.author.date);
      lastUpdatedElement.innerText = `Last updated on: ${lastCommitDate.toDateString()}`;
    })
    .catch((error) => console.error("Error fetching commit data:", error));
}

// Load the footer using jQuery's .load() method
$(function () {
  $("#footer").load("footer.html", function () {
    // Footer loaded, now load the last updated commit info
    fetchLastUpdated();
  });
});
