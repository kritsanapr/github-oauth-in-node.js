import express, { Router } from "express";

import { githubOauthHandler } from "../controllers/auth.controller";

const router = Router();

router.get("/github", githubOauthHandler);

export default router;
