// Initial Values
let likes = 100;
let dislikes = 20;
let comments = [];

// DOM Elements
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const likeCount = document.getElementById('likeCount');
const dislikeCount = document.getElementById('dislikeCount');
const commentInput = document.getElementById('commentInput');
const submitCommentBtn = document.getElementById('submitComment');
const clearBtn = document.getElementById('clearBtn');
const commentsSection = document.getElementById('commentsSection');

// Cookie Helpers
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${JSON.stringify(value)};${expires};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cName, cValue] = cookie.trim().split('=');
    if (cName === name) return JSON.parse(cValue);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Initialize App
function init() {
  const storedChoice = getCookie('vote');
  const storedComments = getCookie('comments');

  if (storedChoice) {
    if (storedChoice === 'like') likeBtn.disabled = true;
    if (storedChoice === 'dislike') dislikeBtn.disabled = true;
  }

  if (storedComments) {
    comments = storedComments;
    renderComments();
  }

  updateCounters();
}

// Update UI Counters
function updateCounters() {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;
}

// Render Comments
function renderComments() {
  commentsSection.innerHTML = '';
  comments.forEach(comment => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.textContent = comment;
    commentsSection.appendChild(div);
  });
}

// Like Click Handler
likeBtn.addEventListener('click', () => {
  likes++;
  likeBtn.disabled = true;
  dislikeBtn.disabled = true;
  setCookie('vote', 'like', 7);
  updateCounters();
});

// Dislike Click Handler
dislikeBtn.addEventListener('click', () => {
  dislikes++;
  likeBtn.disabled = true;
  dislikeBtn.disabled = true;
  setCookie('vote', 'dislike', 7);
  updateCounters();
});

// Comment Submission Handler
submitCommentBtn.addEventListener('click', () => {
  const comment = commentInput.value.trim();
  if (comment === '') return alert('Please write something!');

  comments.push(comment);
  setCookie('comments', comments, 7);
  commentInput.value = '';
  renderComments();
});

// Clear / Reset Handler
clearBtn.addEventListener('click', () => {
  if (!confirm('Are you sure you want to reset everything?')) return;

  deleteCookie('vote');
  deleteCookie('comments');

  likeBtn.disabled = false;
  dislikeBtn.disabled = false;

  comments = [];
  renderComments();
  updateCounters();

  alert('Reset successful! You can vote and comment again.');
});

// Run on page load
init();
