import { authToken } from "./authorization";

const domain = null;

export async function initNgrok(req, res, next) {
    try {
        const domain = await NgrokClient.connect({
            addr: process.env.PORT || 5000,
            authToken: process.env.NGROK_AUTHTOKEN,
        })
        
        console.log(domain);

    } catch (error) {

    }
}



