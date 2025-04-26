// Selecting the burger menu and nav-links
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Toggle the active class to show or hide the navbar links
burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');  // Toggle the visibility of nav-links
});
function searchProfile() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    // Redirect to a search results page or filter profiles based on query
    alert('Searching for: ' + query);
    // Example redirect: window.location.href = 'search.html?query=' + encodeURIComponent(query);
  } else {
    alert('Please enter a profile name to search.');
  }
}
function searchProfile() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.href = 'search.html?query=' + encodeURIComponent(query);
  } else {
    alert('Please enter a profile name to search.');
  }
}
