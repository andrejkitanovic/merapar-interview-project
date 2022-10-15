var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sortEntitiesByDate } from "./utils/sort.mjs";
import useData from "./data/index.mjs";
import { dateTimeFormatter } from "./utils/date.mjs";
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof window === "undefined")
            return;
        const { document } = window;
        const postsSection = document.querySelector("section.posts");
        if (!postsSection)
            return;
        const { getComments, getPosts, getUsers } = yield useData();
        const postsPromise = getPosts();
        const commentsPromise = getComments();
        const usersPromise = getUsers();
        const { data: posts } = yield postsPromise;
        sortEntitiesByDate(posts).forEach((post) => {
            // [POSTS] Write posts on page
            postsSection.insertAdjacentHTML("beforeend", `
        <div class="posts__post" aria-labelledby="${post.id}" aria-ownedby="${post.user_id}">
          <div class="posts__post-user"></div>
          <div class="posts__post-title">${post.title}</div>
          <div class="posts__post-body">${post.body}</div>
          <div class="posts__post-date">${dateTimeFormatter(post.created_at)}</div>
          <div class="posts__post-comments"></div>
        </div>
      `);
        });
        const { data: comments } = yield commentsPromise;
        sortEntitiesByDate(comments).forEach((comment) => {
            // [COMMENTS][POSTS] Assign Comment to Post
            const postComments = postsSection.querySelector(`div.posts__post[aria-labelledby="${comment.post_id}"] .posts__post-comments`);
            if (!postComments)
                return;
            postComments.insertAdjacentHTML("beforeend", `
        <div class="posts__comment" aria-labelledby="${comment.id}" aria-ownedby="${comment.user_id}">
          <div class="posts__comment-user"></div>
          <div class="posts__comment-body">
            ${comment.body}
          </div>
          <div class="posts__comment--date">${dateTimeFormatter(comment.created_at)}</div>
        </div>
      `);
        });
        const { data: users } = yield usersPromise;
        users.forEach((user) => {
            // [USER][POSTS] Assign User to Post
            const postUser = postsSection.querySelector(`div.posts__post[aria-ownedby="${user.id}"] .posts__post-user`);
            if (postUser) {
                postUser.innerHTML = `
        <div>
        </div>
      `;
            }
            // [USER][COMMENTS] Assign User to Comment
            const commentUser = postsSection.querySelector(`div.posts__comment[aria-ownedby="${user.id}"] .posts__comment-user`);
            if (commentUser) {
                commentUser.innerHTML = `
        <div>
        </div>
      `;
            }
        });
    });
})();