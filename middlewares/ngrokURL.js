//#

import ngrok from "ngrok";

let domain = null;
let starting = false;

export async function initNgrok(req, res, next) {
try {
if (domain) {
    req.domain = domain;
    return next();
}
if (starting) {
    // wait for the other starter to finish
    await new Promise((resolve) => {
    const t = setInterval(() => {
        if (domain) {
        clearInterval(t);
        resolve();
        }
    }, 50);
    });
    req.domain = domain;
    return next();
}

starting = true;
const port = Number(process.env.PORT || 5000);

// minimal safe options (no 'name' or 'subdomain')
const opts = {
    addr: port,
    authtoken: process.env.NGROK_AUTHTOKEN || 5000,
    //.bind_tls: true
};


domain = await ngrok.connect(opts);
console.log("Ngrok URL:", domain);


req.domain = domain;
return next();
} catch (err) {
// log full daemon response so you can see which field is invalid
console.error("Ngrok error:", err?.message || err);
if (err?.rawBody) console.error("daemon rawBody:", err.rawBody.toString());
req.domain = null;
return next();
} finally {
starting = false;
}
}

// import ngrok from 'ngrok';

// let domain = null;

// export async function initNgrok(req, res, next) {
//     try {

//         if (domain) {
//             req.domain = domain;
//             return next();
//         }

//         domain = await ngrok.connect({
//             addr: Number(process.env.PORT || 5000),
//             authtoken: process.env.NGROK_AUTHTOKEN,
//             bind_tls: true
//         })

//         console.log(domain);

//         next();

//     } catch (error) {
//         console.error("Ngrok error: ", error)
//     }
// }
