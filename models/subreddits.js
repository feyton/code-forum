import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subreddits",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Post = mongoose.model("posts", postSchema);

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
   
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const comment = mongoose.model("comments", postSchema);

const subredditSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
     
    },
   

  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
subredditSchema.index({ title: "text" });
subredditSchema.methods.getPosts = async function () {
  let subreddit = this;
  const posts = await Post.find({ subreddit: subreddit._id });
  return posts;
};

subredditSchema.methods.countPosts = async function () {
  let subreddit = this;
  const posts = await Post.count({ subreddit: subreddit._id }).exec();
  return posts;
};




export const subreddits = mongoose.model("subreddits", subredditSchema);
