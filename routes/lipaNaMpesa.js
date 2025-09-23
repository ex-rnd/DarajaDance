
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

        const body = {
            "BusinessShortCode": process.env.BusinessShortCode,    
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
            "Timestamp": timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": "1",    
            "PartyA": phoneNumber,  
            "PartyB":"174379",    
            "PhoneNumber": phoneNumber,   
            "CallBackURL": "https://mydomain.com/pat",    
            "AccountReference":"Test",    
            "TransactionDesc":"Test"



        }







    } catch (error) {

    }
});


export default router;
