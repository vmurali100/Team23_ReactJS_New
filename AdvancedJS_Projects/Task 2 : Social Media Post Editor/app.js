// Post management
const createPostManager = () => {
    let posts = [];
  
    return {
      addPost: (content) => {
        const post = {
          id: Date.now(),
          content,
          likes: 0,
          comments: [],
          editHistory: [],
        };
        posts.push(post);
        renderPosts(posts);
      },
      editPost: (id, newContent) => {
        const post = posts.find((post) => post.id === id);
        if (post) {
          post.editHistory.push(post.content); // Save current content to history
          post.content = newContent;
          renderPosts(posts);
        }
      },
      likePost: (id) => {
        const post = posts.find((post) => post.id === id);
        if (post) {
          post.likes++;
          renderPosts(posts);
        }
      },
      addComment: (id, comment) => {
        const post = posts.find((post) => post.id === id);
        if (post) {
          post.comments.push(comment);
          renderPosts(posts);
        }
      },
      searchPosts: (keyword) => {
        const filteredPosts = posts.filter((post) =>
          post.content.toLowerCase().includes(keyword.toLowerCase())
        );
        renderPosts(filteredPosts);
      },
      getPosts: () => posts,
    };
  };
  
  const postManager = createPostManager();
  
  // Throttling
  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      func(...args);
    };
  };
  
  // Render posts
  const renderPosts = (posts) => {
    const feed = document.getElementById("posts-feed");
    feed.innerHTML = "";
  
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("p-4", "bg-white", "shadow", "rounded-lg");
  
      postElement.innerHTML = `
        <div class="mb-2">
          <textarea class="w-full p-2 border rounded-lg" disabled>${post.content}</textarea>
        </div>
        <div class="flex justify-between items-center mb-2">
          <button class="bg-green-500 text-white px-4 py-1 rounded" 
            onclick="postManager.likePost(${post.id})">Like (${post.likes})</button>
          <button class="bg-yellow-500 text-white px-4 py-1 rounded" 
            onclick="editPostPrompt(${post.id})">Edit</button>
        </div>
        <div>
          <textarea id="comment-${post.id}" placeholder="Add a comment..." 
            class="w-full p-2 border rounded-lg"></textarea>
          <button class="bg-blue-500 text-white px-4 py-1 mt-1 rounded" 
            onclick="addComment(${post.id})">Add Comment</button>
        </div>
        <div class="mt-4 space-y-2">
          ${post.comments
            .map((comment) => `<div class="p-2 bg-gray-100 rounded">${comment}</div>`)
            .join("")}
        </div>
      `;
      feed.appendChild(postElement);
    });
  };
  
  // Add comment
  const addComment = (postId) => {
    const commentInput = document.getElementById(`comment-${postId}`);
    const comment = commentInput.value;
    if (comment) {
      postManager.addComment(postId, comment);
      commentInput.value = "";
    }
  };
  
  // Prompt for editing a post
  const editPostPrompt = (postId) => {
    const newContent = prompt("Edit your post:");
    if (newContent) {
      postManager.editPost(postId, newContent);
    }
  };
  
  // Event listeners
  document.getElementById("add-post-btn").addEventListener("click", () => {
    const content = document.getElementById("new-post-content").value;
    if (content) {
      postManager.addPost(content);
      document.getElementById("new-post-content").value = "";
    }
  });
  
  document.getElementById("search").addEventListener(
    "input",
    throttle((e) => {
      postManager.searchPosts(e.target.value);
    }, 300)
  );
  
  // Initial Render
  document.addEventListener("DOMContentLoaded", () => {
    renderPosts(postManager.getPosts());
  });
  