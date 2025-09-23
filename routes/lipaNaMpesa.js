
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { authToken } from '../middlewares/authorization.js';


dotenv.config();

const router = express.Router();

router.post('/lipaNaMpesa', authToken, async(req, res) => {
    try {
        const number = req.body.phoneNumber;
    } catch (error) {

    }
});


export default router;
