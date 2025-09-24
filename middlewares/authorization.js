
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
//const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`)

export async function authToken(req, res, next) {
    try {

        const creds = `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`;
        const auth = Buffer.from(creds, 'utf8').toString('base64');
        //console.log('AUTH_BASE64:', auth); 

        //const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`)
        //console.log(auth)

        const result = await axios.get(url, {
            headers: {
                Authorization: `Basic ${auth}`,
                Accept: 'application/json'
            }
        });


        console.log(result.data);
        req.token = result.data.access_token

        next();


    }
    catch (error) {
        console.log("Error Ocurred", error);
    }
}