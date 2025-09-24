
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { authToken } from '../middlewares/authorization.js';

import { getTimestamp } from '../utils/timestamp.js';

import { initNgrok } from '../middlewares/ngrokURL.js';


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
        const pre_pass = `${process.env.BusinessShortCode}${process.env.MPESA_PASSKEY}${timestamp}`;
        const password = Buffer.from(pre_pass, 'utf8').toString('base64');
        console.log('Password:', password); 

        // GET Callback URL - domain 
        const domain = req.domain;

        // POST URL 
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

        // Access Token 
        const token = req.token;



        // Payload 

        const body = {
            "BusinessShortCode": process.env.BusinessShortCode,    
            "Password": password,    
            "Timestamp": timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": "1",    
            "PartyA": phoneNumber,  
            "PartyB": process.env.BusinessShortCode,    
            "PhoneNumber": phoneNumber,   
            "CallBackURL": `${domain}/callback`,    
            "AccountReference":"SurePact",    
            "TransactionDesc":"Make Money"
        }

        const result = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        // console.log(result.data);

        const stkResponse = result.data;

        // Checking the status of our transaction 

        if (stkResponse.ResponseCode === '0') {


            // Querying endpoint 
            const queryURL = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';

            // Querying payload

            const queryPayload = {  
                    "BusinessShortCode": process.env.BusinessShortCode,    
                    "Password": password,    
                    "Timestamp": timestamp,    
                    "CheckoutRequestID": stkResponse.CheckoutRequestID,    
            };


            // Querying timer 
            const timer = setInterval(async () => {
                try {

                    // Querying request
                    const transStatus = await axios.post(queryURL, queryPayload, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    console.log("Transaction Status: ", transStatus.data);

                    const resultCode = transStatus.data.ResultCode;
                    const resultDesc = transStatus.data.resultDesc;

                    console.log("Query Response: ", resultCode, resultDesc);

                    // Querying stopper
                    if (resultCode === '0') {

                        

                        res.render('success', {
                                type: "Successful",
                                heading: "Payment Request Successful",
                            });
                            clearInterval(timer);

                        } else {

                            res.render('failed', {
                                type: "failed",
                                heading: "Payment Failed",
                                desc: `${resultDesc}. Please Try Again`
                            });

                            clearInterval(timer);

                        }

                } catch (error) {
                    console.error("Error in STK Query: ", error)
                }

            }, 15000);


        }

    } catch (error) {
        console.log("STK Push Error: ", error)
    }
});


export default router;
