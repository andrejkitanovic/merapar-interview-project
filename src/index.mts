import useData from "./data/index.mjs";
import { sortEntitiesByDate } from "./utils/sort.mjs";
import { dateTimeFormatter } from "./utils/date.mjs";
import { userSVG } from "./utils/svgs.mjs";

(async function () {
  if (typeof window === "undefined") return;
  const { document } = window;

  const postsSection = document.querySelector("section.posts");
  if (!postsSection) return;

  const { getComments, getPosts, getUsers } = await useData();

  // Start with fetching promises
  const postsPromise = getPosts();
  const commentsPromise = getComments();
  const usersPromise = getUsers();

  const { data: posts } = await postsPromise;

  sortEntitiesByDate(posts).forEach((post) => {
    // [POSTS] Write posts on page
    postsSection.insertAdjacentHTML(
      "beforeend",
      `
        <div class="posts__post" aria-labelledby="${post.id}" aria-ownedby="${
        post.user_id
      }">
          <div class="posts__post-user">
            <div class="posts__post-date">${dateTimeFormatter(
              post.created_at
            )}</div>
          </div>
          <div class="posts__post-title">${post.title}</div>
          <div class="posts__post-body">${post.body}</div>
          <div class="posts__post-comments"></div>
        </div>
      `
    );
  });

  const { data: comments } = await commentsPromise;

  sortEntitiesByDate(comments).forEach((comment) => {
    // [COMMENTS][POSTS] Assign Comment to Post
    const postComments = postsSection.querySelector(
      `div.posts__post[aria-labelledby="${comment.post_id}"] .posts__post-comments`
    );
    if (!postComments) return;

    postComments.insertAdjacentHTML(
      "beforeend",
      `
        <div class="posts__comment" aria-labelledby="${
          comment.id
        }" aria-ownedby="${comment.user_id}">
          <div class="posts__comment-user">
            <div class="posts__comment-date">${dateTimeFormatter(
              comment.created_at
            )}</div>
          </div>
          <div class="posts__comment-body">
            ${comment.body}
          </div>
        </div>
      `
    );
  });

  const { data: users } = await usersPromise;

  users.forEach((user) => {
    // [USER][POSTS] Assign User to Post
    const postUser = postsSection.querySelector(
      `div.posts__post[aria-ownedby="${user.id}"] .posts__post-user`
    );

    if (postUser) {
      postUser.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="posts__post-user-icon">${userSVG}</div>
      <div class="posts__post-user-name">${user.name}</div>
      <div class="posts__post-user-email">${user.email}</div>
      `
      );
    }

    // [USER][COMMENTS] Assign User to Comment
    const commentUser = postsSection.querySelector(
      `div.posts__comment[aria-ownedby="${user.id}"] .posts__comment-user`
    );

    if (commentUser) {
      commentUser.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="posts__comment-user-icon">${userSVG}</div>
      <div class="posts__comment-user-name">${user.name}</div>
      <div class="posts__comment-user-email">${user.email}</div>
      `
      );
    }
  });
})();
