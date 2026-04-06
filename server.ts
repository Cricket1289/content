import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Octokit } from 'octokit';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

const OWNER = process.env.GITHUB_REPO_OWNER;
const REPO = process.env.GITHUB_REPO_NAME;
const PATH = process.env.GITHUB_FILE_PATH || 'src/data/content.json';

// GET content.json
app.get('/api/content', async (req, res) => {
    try {
        if (!OWNER || !REPO) {
            return res.status(500).json({ error: 'GitHub Repo Configuration Missing' });
        }

        const { data } = await octokit.rest.repos.getContent({
            owner: OWNER,
            repo: REPO,
            path: PATH,
        });

        if ('content' in data && !Array.isArray(data)) {
            const content = Buffer.from(data.content, 'base64').toString('utf-8');
            res.json({ content: JSON.parse(content), sha: data.sha });
        } else {
            res.status(404).json({ error: 'File not found or invalid type' });
        }
    } catch (err: any) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

// POST update content.json
app.post('/api/content', async (req, res) => {
    const { content, sha, message } = req.body;
    try {
        if (!OWNER || !REPO) {
            return res.status(500).json({ error: 'GitHub Repo Configuration Missing' });
        }

        const updatedContentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

        await octokit.rest.repos.createOrUpdateFileContents({
            owner: OWNER,
            repo: REPO,
            path: PATH,
            message: message || 'Update content.json via Admin UI',
            content: updatedContentBase64,
            sha: sha
        });

        res.json({ success: true });
    } catch (err: any) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 GitHub Proxy ready at http://localhost:${PORT}`);
});
