
import express from 'express';

const callback = express.Router();

callback.post("/callback", (req, res) => {
    
    const result = req.body;

    const data = JSON.stringify(result, null, 2);

    console.log("Safaricom Callback Received!");
    console.log("Txn Result: ", data);

    res.status(200).json({
        message: "Callback Received Successfully",
        success: true
    })

});

export default callback;

