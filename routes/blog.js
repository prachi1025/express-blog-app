import express from "express";
import Blog from "../models/blog.js"; // Importing the Mongoose model

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const posts = await Blog.find().sort({ createdAt: -1 }); // Fetch all posts from MongoDB
        res.render("index", { posts });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Render create form
router.get("/create", (req, res) => {
    res.render("create");
});

// Create a new blog post
router.post("/create", async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Blog({
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newPost.save(); // Save the new post to MongoDB
        res.redirect("/");
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Render edit form
router.get("/edit/:id", async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) return res.redirect("/");
        res.render("edit", { post });
    } catch (error) {
        console.error("Error fetching post for edit:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Update a blog post
router.post("/edit", async (req, res) => {
    try {
        const { id, title, content } = req.body;

        await Blog.findByIdAndUpdate(id, {
            title,
            content
        });

        res.redirect("/");
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Delete a blog post
router.post("/delete", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.body.id);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;