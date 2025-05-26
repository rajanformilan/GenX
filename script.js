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

window.addEventListener('DOMContentLoaded', () => {
  const feedContainer = document.getElementById('feedContainer');

  // Example: get posts from localStorage or fallback to empty array
  const posts = JSON.parse(localStorage.getItem('profilePosts')) || [];

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = `
      <div class="post-info">
        <img src="${post.avatar || 'default-avatar.png'}" alt="User Avatar">
        <div>
          <div class="name">${post.name || 'Anonymous'}</div>
          <div class="date">${post.postDate || ''}</div>
        </div>
      </div>
      <p>${post.content || ''}</p>
    `;

    if (post.image) {
      postElement.innerHTML += `<img src="${post.image}" alt="Post image">`;
    }

    if (post.video) {
      postElement.innerHTML += `
        <video controls>
          <source src="${post.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
    }

    feedContainer.appendChild(postElement);
  });
});






window.onload = function () {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const postContainer = document.getElementById('feedContainer');

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-post-id', index);

    // Initialize engagement counts or get from localStorage (if you want persistence)
    const likes = post.likes || 0;
    const comments = post.comments || 0;
    const shares = post.shares || 0;

    postElement.innerHTML = `
      <div class="post-info">
        <img src="${post.avatar || 'default-avatar.png'}" alt="Avatar" style="width:40px; height:40px; border-radius:50%; margin-right:10px;">
        <div>
          <div class="name">${post.name || 'Unknown'}</div>
          <div class="date">${post.postDate || ''}</div>
        </div>
      </div>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" style="max-width: 100%; margin-top: 10px;">` : ''}
      ${post.video ? `
        <video controls style="max-width: 100%; margin-top: 10px;">
          <source src="${post.video}" type="video/mp4">
        </video>` : ''}
      <div class="engagements">
        <span class="likes-count">Likes: ${likes}</span> | 
        <span class="comments-count">Comments: ${comments}</span> | 
        <span class="shares-count">Shares: ${shares}</span>
      </div>
      <div class="engagement-buttons">
        <button class="engagement-btn like-btn">Like</button>
        <button class="engagement-btn comment-btn">Comment</button>
        <button class="engagement-btn share-btn">Share</button>
        <button class="engagement-btn copylink-btn">Copy Link</button>
      </div>
    `;

    // Append post to container
    postContainer.appendChild(postElement);
  });

  // Add event delegation for engagement buttons
  postContainer.addEventListener('click', function (e) {
    const target = e.target;
    const postDiv = target.closest('.post');
    if (!postDiv) return;
    const postId = postDiv.getAttribute('data-post-id');
    const post = posts[postId];

    if (target.classList.contains('like-btn')) {
      // Like button toggle
      let likesCountSpan = postDiv.querySelector('.likes-count');
      let likesCount = parseInt(likesCountSpan.textContent.split(': ')[1]);
      const isActive = target.classList.toggle('active');
      likesCount = isActive ? likesCount + 1 : likesCount - 1;
      likesCountSpan.textContent = 'Likes: ' + likesCount;
    }

    else if (target.classList.contains('comment-btn')) {
      // For demo, simple prompt to add comment count
      const commentText = prompt('Write your comment:');
      if (commentText) {
        let commentsCountSpan = postDiv.querySelector('.comments-count');
        let commentsCount = parseInt(commentsCountSpan.textContent.split(': ')[1]);
        commentsCount++;
        commentsCountSpan.textContent = 'Comments: ' + commentsCount;
        alert('Comment added!');
      }
    }

    else if (target.classList.contains('share-btn')) {
      // Share post URL - you can customize per post URL or current page URL
      const shareUrl = window.location.href;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      let sharesCountSpan = postDiv.querySelector('.shares-count');
      let sharesCount = parseInt(sharesCountSpan.textContent.split(': ')[1]);
      sharesCount++;
      sharesCountSpan.textContent = 'Shares: ' + sharesCount;
    }

    else if (target.classList.contains('copylink-btn')) {
      const postUrl = window.location.href; // Or you can customize per post
      navigator.clipboard.writeText(postUrl).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => alert('Failed to copy link: ' + err));
    }
  });
};
