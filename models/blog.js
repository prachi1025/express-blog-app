import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: { type: Date, default: Date.now } // ✅ Add this
},
{ timestamps: true } // ✅ This will automatically add `createdAt` and `updatedAt`
);

// ✅ Middleware to auto-update `lastUpdatedAt`
blogSchema.pre("findOneAndUpdate", function (next) {
    this.set({ lastUpdatedAt: new Date() });
    next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;