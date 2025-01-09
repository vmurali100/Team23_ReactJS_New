// Post Class
class Post {
    constructor(content) {
      this.id = Date.now(); // Unique ID
      this.content = content;
      this.likes = 0;
      this.comments = [];
    }
  
    likePost() {
      this.likes++;
    }
  
    addComment(comment) {
      this.comments.push(comment);
    }
  }
  
  // Posts Array
  const posts = [];
  
  // Add Post
  document.getElementById("addPost").addEventListener("click", () => {
    const content = document.getElementById("postContent").value;
  
    if (content.trim()) {
      const newPost = new Post(content);
      posts.push(newPost);
      document.getElementById("postContent").value = "";
      renderPosts();
    } else {
      alert("Post content cannot be empty!");
    }
  });
  
  // Render Posts
  function renderPosts() {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = ""; // Clear current posts
  
    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "bg-white shadow-md rounded-lg p-6";
  
      postElement.innerHTML = `
        <p class="text-gray-700 mb-4">${post.content}</p>
        <div class="flex items-center justify-between">
          <div>
            <button onclick="likePost(${post.id})" class="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600">
              Like (${post.likes})
            </button>
            <button onclick="toggleCommentSection(${post.id})" class="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600">
              Comment
            </button>
          </div>
          <button onclick="editPost(${post.id})" class="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600">
            Edit
          </button>
        </div>
        <div id="commentsSection-${post.id}" class="mt-4 hidden">
          <textarea id="commentInput-${post.id}" class="w-full p-2 border rounded-lg mb-2" placeholder="Write a comment..."></textarea>
          <button onclick="addComment(${post.id})" class="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600">
            Add Comment
          </button>
          <ul id="commentsList-${post.id}" class="mt-2 space-y-2">
            ${post.comments.map(comment => `<li>${comment}</li>`).join("")}
          </ul>
        </div>
      `;
  
      postsContainer.appendChild(postElement);
    });
  }
  
  // Like Post
  function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likePost();
      renderPosts();
    }
  }
  
  // Add Comment
  function addComment(postId) {
    const post = posts.find(p => p.id === postId);
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const comment = commentInput.value;
  
    if (post && comment.trim()) {
      post.addComment(comment);
      commentInput.value = "";
      renderPosts();
    }
  }
  
  // Toggle Comment Section
  function toggleCommentSection(postId) {
    const commentSection = document.getElementById(`commentsSection-${postId}`);
    commentSection.classList.toggle("hidden");
  }
  
  // Edit Post
  function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    const newContent = prompt("Edit Post Content:", post.content);
  
    if (post && newContent !== null && newContent.trim()) {
      post.content = newContent;
      renderPosts();
    }
  }
  