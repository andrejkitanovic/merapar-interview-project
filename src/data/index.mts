import { APICall, CommentType, PostType, UserType } from "../types/index.mjs";

const importJSONOptions = { assert: { type: "json" } };
const generateDelayTime = () => Math.random() * 1500 + 100;

// Custom hook for conditional usage of json files
export default async function useData() {
  const posts = (await import("./posts.json", importJSONOptions)).default;
  const comments = (await import("./comments.json", importJSONOptions)).default;
  const users = (await import("./users.json", importJSONOptions)).default;

  const getComments = (): APICall<CommentType[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(comments), generateDelayTime())
    );
  const getPosts = (): APICall<PostType[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(posts), generateDelayTime())
    );
  const getUsers = (): APICall<UserType[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(users), generateDelayTime())
    );

  return {
    getComments,
    getPosts,
    getUsers,
  };
}
