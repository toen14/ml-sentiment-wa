import { Client } from "whatsapp-web.js";
import  { Browser } from "puppeteer";
import qrcode from "qrcode-terminal";
import fs from "fs";

import { browser } from "./browser";
import { secret, environment, allowUnregiterPhoneNumbers } from "./config/env"
import { validData } from "./config/valid-data";

// Path where the session data will be stored
const SESSION_FILE_PATH = __dirname + "/../session.json";

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

export const client = new Client({
    puppeteer: {
        headless: (environment == "development" ? false : true)
    },
    session: sessionData
})

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    // reuse current browser
    browser(client.pupBrowser as Browser)
});

client.on('message', async msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    } else if (
        process.env.PHONE_NUMBERS?.split(",").includes(msg.from) || allowUnregiterPhoneNumbers
        ) {
        const page = await browser().newPage();
        await page.goto(
            process.env.BASE_URL + `/data?secret=${secret}&text=${msg.body}`, 
            {
                waitUntil: 'domcontentloaded'
            }
        );

        page.on("console", async (data)=> {
            if (validData.includes(data.text())) {
                // console.log(data.text());
                msg.reply(data.text());

                await page.close();
            }
        })
    }
    // console.log(msg.from)
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});