import mongoose from "mongoose";
const Mongoose = mongoose;
import {subreddits} from "../models/subreddits.js"
import { Post } from "../models/subreddits.js";

export const createSubreddit = async (req, res) => {
  const title = req.body.title;

  const existingSubreddit = await subreddits.findOne({ title: title });

  if (existingSubreddit) {
    return res.status(409).json({
      success: false,
      data: {
        message: "this subredddit already exists",
      },
    });
  }

  
  try {
    let subreddit = req.body;
    
    const art = await subreddits.create(subreddit);
    res.status(201).json({
      success: true,
      data: { message: "Subreddit created successfully" },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {
        message: "Something is wrong...",
      },
    });
  }
};


export const createPost = async (req, res) => {
  try {
    let postData = req.body;
    postData["subreddit"] = req.params.id;
    const post = await Post.create(postData);
    res.status(201).json({
      success: true,
      data: { message: "post created successfully", post },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {
        message: "Something is wrong...",
      },
    });
  }
};


export const getPosts = async (req, res) => {
  const id = req.params.id;
  const subreddit = await subreddits.findById(id);

  if (!subreddit) {
    return res.status(404).json({
      success: false,
      data: {
        message: "no subreddit found found",
      },
    });
  }
  const posts = await subreddit.getPosts()
  res.status(200).json({
    success: true,
    data: posts,
    
  });
};


export const viewAllSubreddits = async (req, res) => {
  const subreddit = await subreddits.find().sort({createdAt:'asc'});
  return res.status(200).json({
    success: true,
    data: {
      data: subreddit,
      count: subreddit.length,
    },
  });
};


// get one subreddit by id
//many posts


export const getSubredditById = async (req, res) => {
  if (!req.params.id || !Mongoose.isValidObjectId(req.params.id)) {
    // throw new BadRequest("Missing article id");
    return res.status(400).json({
      success: false,
      data: {
        message: "Missing subreddit id",
      },
    });
  }

  const id = req.params.id;
  const subreddit = await subreddits.findById(id);

  if (!subreddit) {
    return res.status(400).json({
      success: false,
      data: {
        message: "no subreddit exist for this id",
      },
    });
  }
  let numberOfposts = await subreddit.countPosts();
  const posts = await subreddit.getPosts()


  res.status(200).json({
    success: true,
    data: {
      data: subreddit,
      numberOfposts: numberOfposts,
      posts: posts
    },
  });
};

