// #

import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { authToken } from './middlewares/authorization.js';

import { initNgrok } from './middlewares/ngrokURL.js';

import router from './routes/lipaNaMpesa.js'

import callback from './routes/callback.js';



dotenv.config();
const app = express();
const port = process.env.PORT || 5000; //8080;



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());



app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(initNgrok);
app.use(callback);
app.use(router);


// app.get("/", authToken, async(req, res) => {
app.get("/", async(req, res) => {
  const token = req.token
  //console.log(token)
  console.log(req.domain);
  res.render('payment');
  });

// app.get("/success", async(req, res) => {
//   res.render('success');
//   });
  
// app.get("/failed", async(req, res) => {
//   res.render('failed');
//   });  

app.get("/dashboard", async(req, res) => {
  res.render('dashboard');
  });  


app.listen(port,  () => {

  console.log(`Server running on port ${port}`);

  });
  
