import jsdom from "jsdom";

const { JSDOM } = jsdom;


export function htmlToElement( html ) {
    
    console.debug( "htmlToElement", html.substring( 0, 100 ) );

    let {window} = new JSDOM( html );

    const { document } = window;

    return document.body;
}
