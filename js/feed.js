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

const feed = document.getElementById("feed");

posts.forEach((post, index) => {
  const postDiv = document.createElement("div");
  postDiv.className = "post glass";

  postDiv.innerHTML = `
    <img src="${post.image}">
    <div class="post-actions">
      <button class="like-btn">❤️</button>
      <span class="likes">${post.likes} likes</span>
    </div>
    <p><b>${post.user}</b> ${post.caption}</p>
  `;

  const likeBtn = postDiv.querySelector(".like-btn");
  const likesText = postDiv.querySelector(".likes");

  let liked = false;

  likeBtn.addEventListener("click", () => {
    liked = !liked;
    post.likes += liked ? 1 : -1;
    likeBtn.textContent = liked ? "💖" : "❤️";
    likesText.textContent = post.likes + " likes";
  });

  feed.appendChild(postDiv);
});
