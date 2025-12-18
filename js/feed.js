document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     ADD POST MODAL LOGIC
  ======================== */
  const addPostBtn = document.getElementById("addPostBtn");
  const modal = document.getElementById("postModal");
  const imageInput = document.getElementById("postImage");
  const preview = document.getElementById("preview");
  const feed = document.getElementById("feed");

  addPostBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  modal.querySelector(".secondary").addEventListener("click", () => {
    closePostModal();
  });

  function closePostModal() {
    modal.style.display = "none";
    preview.style.display = "none";
    imageInput.value = "";
    document.getElementById("postCaption").value = "";
  }

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    }
  });

  /* =======================
     POSTS DATA
  ======================== */
  const posts = [
    {
      user: "user_one",
      image: "https://picsum.photos/500/400?1",
      caption: "First glass post ✨",
      likes: 0
    },
    {
      user: "user_two",
      image: "https://picsum.photos/500/400?2",
      caption: "Loving this UI 😍",
      likes: 0
    }
  ];

  /* =======================
     CREATE POST FUNCTION
  ======================== */
  function createPost(post, prepend = false) {
    const postDiv = document.createElement("div");
    postDiv.className = "post glass";

    postDiv.innerHTML = `
      <div class="post-img-wrapper">
        <img src="${post.image}" class="post-img">
        <div class="heart-overlay">💖</div>
      </div>

      <div class="post-actions">
        <button class="like-btn">❤️</button>
        <span class="likes">${post.likes} likes</span>
      </div>

      <p><b>${post.user}</b> ${post.caption}</p>
    `;

    const likeBtn = postDiv.querySelector(".like-btn");
    const likesText = postDiv.querySelector(".likes");
    const imgWrapper = postDiv.querySelector(".post-img-wrapper");
    const heart = postDiv.querySelector(".heart-overlay");

    let liked = false;

    /* ❤️ Like Button */
    likeBtn.addEventListener("click", () => {
      liked = !liked;

      if (liked) {
        post.likes++;
        likeBtn.textContent = "💖";
        likeBtn.classList.add("liked");
      } else {
        post.likes--;
        likeBtn.textContent = "❤️";
        likeBtn.classList.remove("liked");
      }

      likesText.textContent = post.likes + " likes";
    });

    /* 💖 Double Click Like */
    imgWrapper.addEventListener("dblclick", () => {
      if (!liked) {
        liked = true;
        post.likes++;
        likeBtn.textContent = "💖";
        likeBtn.classList.add("liked");
        likesText.textContent = post.likes + " likes";
      }

      heart.classList.add("show");
      setTimeout(() => heart.classList.remove("show"), 600);
    });

    prepend ? feed.prepend(postDiv) : feed.appendChild(postDiv);
  }

  /* =======================
     LOAD EXISTING POSTS
  ======================== */
  posts.forEach(post => createPost(post));

  /* =======================
     ADD NEW POST
  ======================== */
  window.addPost = function () {
    if (!preview.src) {
      alert("Select an image");
      return;
    }

    const newPost = {
      user: "you",
      image: preview.src,
      caption: document.getElementById("postCaption").value || "New post",
      likes: 0
    };

    createPost(newPost, true);
    closePostModal();
  };

});
