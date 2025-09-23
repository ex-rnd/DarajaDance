
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { authToken } from '../middlewares/authorization.js';

import { getTimestamp } from '../utils/timestamp.js';


dotenv.config();

const router = express.Router();

router.post('/lipaNaMpesa', authToken, async(req, res) => {
    try {

        // GET Customer Contact 
        //const number = req.body.phoneNumber;
        const number = req.body.phoneNumber.replace(/^0/, '');
        const phoneNumber = `254${number}`
        console.log(phoneNumber);

        // GET Timestamp
        const timestamp = getTimestamp();
        console.log(timestamp);

        // GET Password 
        const pre_pass = `${process.env.BusinessShortCode}${process.env.MPESA_PASSKEY} ${timestamp}`;
        const password = Buffer.from(pre_pass, 'utf8').toString('base64');
        console.log('Password:', password); 




        const body = {
            "BusinessShortCode": process.env.BusinessShortCode,    
            "Password": password,    
            "Timestamp": timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": "1",    
            "PartyA": phoneNumber,  
            "PartyB": process.env.BusinessShortCode,    
            "PhoneNumber": phoneNumber,   
            "CallBackURL": "https://mydomain.com/pat",    
            "AccountReference":"SurePact",    
            "TransactionDesc":"Make Money"
        }


        







    } catch (error) {

    }
});


export default router;
