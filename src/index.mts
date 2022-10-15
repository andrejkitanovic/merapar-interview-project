import useData from "./data/index.mjs";
import { sortEntitiesByDate } from "./utils/sort.mjs";
import { dateTimeFormatter } from "./utils/date.mjs";
import { userSVG } from "./utils/svgs.mjs";
import { useParams } from "./utils/useParams.mjs";
import {
  filterEntitiesById,
  filterEntitiesByListOfIds,
  filterEntitiesByUserId,
} from "./utils/find.mjs";

(async function () {
  if (typeof window === "undefined") return;
  const { document } = window;

  const postsSection = document.querySelector("section.posts");
  if (!postsSection) return;

  const baseURL = window.location.pathname;
  const params = useParams();

  // Params
  const postId = params.get("postId");
  const userId = params.get("userId");

  const { getComments, getPosts, getUsers } = await useData();

  // Start with fetching promises
  const postsPromise = getPosts();
  const commentsPromise = getComments();
  const usersPromise = getUsers();

  const { data: posts } = await postsPromise;

  let postsData = posts;
  if (postId) {
    postsData = filterEntitiesById(posts, postId);
  } else if (userId) {
    postsSection.insertAdjacentHTML(
      "beforeend",
      `
        <h2>User Posts</h2>
      `
    );

    postsData = filterEntitiesByUserId(posts, userId);
  }
  postsData = sortEntitiesByDate(postsData);

  postsData.forEach((post) => {
    // [POSTS] Write posts on page
    postsSection.insertAdjacentHTML(
      "beforeend",
      `
        <div class="posts__post" aria-labelledby="${post.id}" aria-ownedby="${
        post.user_id
      }">
          <a href="${baseURL}?userId=${post.user_id}" class="posts__post-user">
            <div class="posts__post-date">${dateTimeFormatter(
              post.created_at
            )}</div>
          </a>
          <a href="${baseURL}?postId=${post.id}" class="posts__post-title">${
        post.title
      }</a>
          <div class="posts__post-body">${post.body}</div>
          <div class="posts__post-comments"></div>
        </div>
      `
    );
  });

  const { data: comments } = await commentsPromise;

  let commentsData = comments;
  commentsData = sortEntitiesByDate(commentsData);

  if (userId) {
    postsSection.insertAdjacentHTML(
      "beforeend",
      `
        <h2>User Commented on</h2>
      `
    );

    const userComments = filterEntitiesByUserId(commentsData, userId);
    const userPostCommented = filterEntitiesByListOfIds(
      posts,
      userComments.map(({ post_id }) => post_id)
    );

    userPostCommented.forEach((post) => {
      // [POSTS] Write posts on page
      postsSection.insertAdjacentHTML(
        "beforeend",
        `
          <div class="posts__post" aria-labelledby="${post.id}" aria-ownedby="${
          post.user_id
        }">
            <a href="${baseURL}?userId=${
          post.user_id
        }" class="posts__post-user">
              <div class="posts__post-date">${dateTimeFormatter(
                post.created_at
              )}</div>
            </a>
            <a href="${baseURL}?postId=${post.id}" class="posts__post-title">${
          post.title
        }</a>
            <div class="posts__post-body">${post.body}</div>
            <div class="posts__post-comments"></div>
          </div>
        `
      );
    });
  }

  commentsData.forEach((comment) => {
    // [COMMENTS][POSTS] Assign Comment to Post
    const postComments = postsSection.querySelectorAll(
      `div.posts__post[aria-labelledby="${comment.post_id}"] .posts__post-comments`
    );
    if (!postComments.length) return;

    postComments.forEach((postComment) =>
      postComment.insertAdjacentHTML(
        "beforeend",
        `
        <div class="posts__comment" aria-labelledby="${
          comment.id
        }" aria-ownedby="${comment.user_id}">
          <a href="${baseURL}?userId=${
          comment.user_id
        }" class="posts__comment-user">
            <div class="posts__comment-date">${dateTimeFormatter(
              comment.created_at
            )}</div>
          </a>
          <div class="posts__comment-body">
            ${comment.body}
          </div>
        </div>
      `
      )
    );
  });

  const { data: users } = await usersPromise;

  users.forEach((user) => {
    // [USER][POSTS] Assign User to Post
    const postUsers = postsSection.querySelectorAll(
      `div.posts__post[aria-ownedby="${user.id}"] .posts__post-user`
    );

    if (postUsers.length) {
      postUsers.forEach((postUser) =>
        postUser.insertAdjacentHTML(
          "afterbegin",
          `
      <div class="posts__post-user-icon">${userSVG}</div>
      <div class="posts__post-user-name">${user.name}</div>
      <div class="posts__post-user-email">${user.email}</div>
      `
        )
      );
    }

    // [USER][COMMENTS] Assign User to Comment
    const commentUsers = postsSection.querySelectorAll(
      `div.posts__comment[aria-ownedby="${user.id}"] .posts__comment-user`
    );

    if (commentUsers) {
      commentUsers.forEach((commentUser) =>
        commentUser.insertAdjacentHTML(
          "afterbegin",
          `
      <div class="posts__comment-user-icon">${userSVG}</div>
      <div class="posts__comment-user-name">${user.name}</div>
      <div class="posts__comment-user-email">${user.email}</div>
      `
        )
      );
    }
  });
})();
