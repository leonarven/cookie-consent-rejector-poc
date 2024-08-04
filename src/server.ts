import express from "express";

import { handleCCF } from "./index";
import { htmlToCleanElement, htmlToText } from "./utils";

const app = express();

app.use( express.text());

app.post( "/", async (req, res) => {

    let html = htmlToCleanElement( req.body ).innerHTML; 

    console.log( "N=" + html.length, html.substring( 0, 100 ) + "..." );

    const ccf = await handleCCF( html );

    console.log( "ccf", ccf );

    res.setHeader("Content-Type", "application/json");
    res.json({ hello: "world" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});