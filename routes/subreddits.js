import express from "express";
import {
  getPosts,
  viewAllSubreddits,
  createPost,
  createSubreddit,
  getSubredditById
} from "../controllers/subreddits.js";
const subredditRouter = express.Router();


subredditRouter.get("/:id/posts", getPosts);
subredditRouter.get("/:id/subreddit", getSubredditById);
subredditRouter.get("/", viewAllSubreddits);
subredditRouter.post("/:id/", createPost);
subredditRouter.post(
  "/",  createSubreddit
);

export default subredditRouter;
