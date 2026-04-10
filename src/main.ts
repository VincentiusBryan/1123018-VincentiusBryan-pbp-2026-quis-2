import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Post } from './models/Post';
import { Comment } from './models/Comment';

const sequelize = new Sequelize({
    username: "postgres",
    password: "bryan123",
    database: "pbp-quis2",
    host: "127.0.0.1",
    dialect: "postgres",
    models: [Post, Comment],
    logging: false
});

const app = express();
app.use(express.json());

app.get('/api/post', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/api/post', async (req, res) => {
    try {
        const { username, title, content } = req.body;

        if (!username || !title || !content) {
            return res.status(400).json({ message: "Bad Request" });
        }

        const post = await Post.create({
            username,
            title,
            content
        });

        res.status(201).json({ data: post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/api/post/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [Comment]
        });

        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.status(200).json({ data: post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put('/api/post/:id', async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }

        await post.update({ title, content });

        res.status(200).json({ data: post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete('/api/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }

        await post.destroy();

        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/api/post-comment', async (req, res) => {
    try {
        const { postId } = req.query;

        const where: any = {};
        if (postId) where.postId = postId;

        const comments = await Comment.findAll({ where });

        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/api/post-comment', async (req, res) => {
    try {
        const { postId, userName, content } = req.body;

        if (!postId || !userName || !content) {
            return res.status(400).json({ message: "Bad Request" });
        }

        const comment = await Comment.create({
            postId,
            userName,
            content
        });

        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/api/post-comment/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put('/api/post-comment/:id', async (req, res) => {
    try {
        const { content } = req.body;

        const comment = await Comment.findByPk(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Not Found" });
        }

        await comment.update({ content });

        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete('/api/post-comment/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Not Found" });
        }

        await comment.destroy();

        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(3000, async () => {
    await sequelize.authenticate();
    console.log("Server running on http://localhost:3000");
});