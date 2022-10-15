var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const importJSONOptions = { assert: { type: "json" } };
const generateDelayTime = () => Math.random() * 1500 + 100;
// Custom hook for conditional usage of json files
export default function useData() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = (yield import("./posts.json", importJSONOptions)).default;
        const comments = (yield import("./comments.json", importJSONOptions)).default;
        const users = (yield import("./users.json", importJSONOptions)).default;
        const getComments = () => new Promise((resolve) => setTimeout(() => resolve(comments), generateDelayTime()));
        const getPosts = () => new Promise((resolve) => setTimeout(() => resolve(posts), generateDelayTime()));
        const getUsers = () => new Promise((resolve) => setTimeout(() => resolve(users), generateDelayTime()));
        return {
            getComments,
            getPosts,
            getUsers,
        };
    });
}
