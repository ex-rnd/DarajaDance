# 💳 M-Pesa Daraja STK Push Implementation with Node.js (Express)
A Node.js Express application that lets users initiate M-Pesa STK Push payments via Safaricom’s Daraja API, complete with live ngrok tunneling, EJS views, and polling for transaction status.

## ✳️ Visual Overview 



https://github.com/user-attachments/assets/b3c545d6-1e89-4acc-8584-f2342a66e28a




## 📹 Demo
First, see it in action:
- 1. Open a terminal.
- 2. - Start the server (with ngrok)
```
npm start
```
- 3. - Copy the ngrok URL from your console
- 4. - Open that URL in your browser
- 5. - Enter a valid phone number and click Pay Now
- 6. - Approve the STK Push on your device and watch the live status update
       
## 🔍 Project Overview

- 1. Problem
Enable end-users to make M-Pesa payments from a web form, handling Safaricom’s STK Push flow and callbacks.

- 2. Key Components
- Express.js server for routing and middleware
- EJS templating for payment, success, failed, and dashboard pages
- ngrok integration to expose localhost for callbacks
- Axios for HTTP requests to Daraja endpoints
- Custom authToken middleware to retrieve OAuth tokens
- STK Push polling logic to confirm transaction statu

## 🛠️ Getting Started
1. Clone the repo
```
git clone https://github.com/yourusername/tutorials.git
cd tutorials
```
2. - Install dependencies
```
npm install
```

3. Environment
- - Create a .env file in the project root with
```
BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_mpesa_passkey
CONSUMER_KEY=your_consumer_key
CONSUMER_SECRET=your_consumer_secret
PORT=5000
```

3. Data
- Place your .wav files in " data/audio/ " with filenames like " speakerID_emotion.wav ".
- Emotion labels must match EMOTIONS = ['angry','disgust','fear','happy','neutral','ps','sad'].

## ▶️ Usage
1. Start the application:
```
npm start
```
2. Visit the public ngrok URL shown in your console
3. Fill out the payment form at / and submit
4. Watch the STK Push prompt on your phone
5. See the success or failed page based on the transaction outcome


## 📓 Interactive Notebook
All EDA, feature engineering, model building, training and plotting live in the Jupyter notebook:
1. - Payment Form
<img width="571" height="455" alt="image" src="https://github.com/user-attachments/assets/3fc307d0-a9d1-48c9-82f2-10bc3f416bf7" />

2. - Server & ngrok Logs
<img width="597" height="372" alt="image" src="https://github.com/user-attachments/assets/96dc8084-06f0-4f58-839f-5f794b308682" />

3. - Callback Received


## 📐 Application Architecture
```
             ┌─────────────────────┐
             │  Client (Browser)   │
             └──────────┬──────────┘
                        │ GET /
                        ▼
             ┌─────────────────────┐
             │ initNgrok Middleware│
             └──────────┬──────────┘
                        │ sets req.domain
                        ▼
             ┌─────────────────────┐
             │ authToken Middleware│
             └──────────┬──────────┘
                        │ sets req.token
                        ▼
             ┌─────────────────────┐
             │ lipaNaMpesa Router  │
             └──────────┬──────────┘
                        │ Initiate STK Push
                        ▼
             ┌─────────────────────┐
             │ Polling Logic       │
             └──────────┬──────────┘
                        │ STK Push Query
                        ▼
             ┌─────────────────────┐
             │ EJS Views           │
             └─────────────────────┘
```

## 💾 Payload Construction
- Phone number formatting: replace leading 0 with 254
- Timestamp: custom getTimestamp() utility outputs YYYYMMDDHHmmss
- Password: Base64 of BusinessShortCode + Passkey + Timestamp
- HTTP headers:
- Authorization: Bearer <access_token>
- Content-Type: application/json

## 📊 Operation & Results
- Logs initial STK Push response code and CheckoutRequestID
- Polls the STK Push Query endpoint every 15 seconds until a final ResultCode
- Renders success or failed EJS view with transaction details
- Receives and logs Safaricom callback at /callback

## 🤝 Contributing
- Fork the repository
- Create branches using feature/xyz-description or fix/xyz-description
- (Optional) Install Husky for pre-commit hooks
```
npm install husky --save-dev
npx husky install
```
- Follow code style rules with ESLint and Prettier
- Submit pull requests with clear descriptions and linked issues

Thank you for exploring this implementation! Feel free to open issues or PRs for enhancements and bug fixes. 🎉


### Thank you for your contributions! 🎉



