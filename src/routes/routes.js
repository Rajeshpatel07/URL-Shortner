import express from 'express';
import UrlChecker from '../middlewares/UrlChecker.js';
import {home,upload,redirect,NotFound} from '../controllers/controller.js';
const router = express.Router();

router.get('/', home);
router.post('/upload',UrlChecker, upload);
router.get('/:url', redirect);
router.get('*',NotFound)

export default router;