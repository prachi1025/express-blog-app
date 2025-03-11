import express from "express";
const router = express.Router();

let posts = [];

router.get("/", (req, res) => {
    res.render("index", {posts});
});

router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/create", (req, res) => {
    const {title, content} = req.body;
    posts.push({id: Date.now(), title, content});
    res.redirect("/");
    console.log(req.body);
})

router.get("/edit/:id", (req, res) => {
    const post = posts.find( p => p.id == req.params.id);
    if (!post) return res.redirect("/");
    res.render("edit",{post});
});

router.post("/edit", (req, res) => {
    const {id, title, content} = req.body;
    const postIndex = posts.findIndex(p => p.id == id);
    if (postIndex !== -1) {
        posts[postIndex] = {id: Number(id), title, content};
    }
    res.redirect("/");
    console.log(req.body);
});

router.post("/delete", (req, res) => {
    posts = posts.filter(p => p.id != req.body.id);
    res.redirect("/");
    console.log(req.body);
});

export default router;