import express from "express";
import cors from "cors";

import { handleCCF } from "./ccf-handler";
import { htmlToCleanElement, htmlToText } from "./utils";

const app = express();

app.use( express.text() );
app.use( cors({
    origin: true
}) );

app.post( "/", async ( req, res ) => {

    let html = htmlToCleanElement( req.body ).innerHTML; 

    console.log( "N=" + html.length, html.substring( 0, 100 ) + "..." );

    const ccf = await handleCCF( html );

    console.log( "ccf", ccf );
    
    let json = JSON.stringify( ccf );

    res.send( json ).status(200);
});

app.get( "/browser.js", function (req, res) {
    res.sendFile( __dirname + "/browser.js" );
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});