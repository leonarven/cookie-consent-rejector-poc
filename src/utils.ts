import { CLAUDE_API_KEY } from "./.env";

export async function runClaude( prompt: string ) {

    const url = 'https://api.anthropic.com/v1/messages';

    const data = {
        "model": "claude-3-5-sonnet-20240620",
        "max_tokens": 1024,
        "messages": [
            { "role": "user", "content": prompt }
        ]
    };

    const headers = new Headers();
    
    headers.append( 'x-api-key', CLAUDE_API_KEY );
    headers.append( 'anthropic-version', '2023-06-01' );
    headers.append( 'Content-Type', 'application/json' );

    let response = await fetch( url, {
        method: 'POST',
        headers,
        body: JSON.stringify( data )
    });

    let result = await response.json();

    if (result.content?.[0]?.type == "text") {
        return result.content[0].text;
    }

    console.error( result );

    throw CLAUDE_INVALID_RESPONSE;
    
    /* let response = await fetch( `https://claude.ai/api/v1/complete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${CLAUDE_API_KEY}`,
        },
        body: JSON.stringify({
            prompt,
            max_tokens: 1000,
            temperature: 0.5,
            top_p: 1,
            n: 1,
            stream: false,
        }),
    });

    let json = await response.json();

    return json; */
}


export async function runAgent<T extends ILLMAgent>( agent: T, prompt: string ) {

    prompt = `# SYSTEM
    
${agent.instruction}
    
# INPUT
${prompt}`;

    console.log( agent, prompt   );
/*     
    console.log( agent.label );
    
    prompt = `${agent.label} kysyy`;

    let json = window.prompt( prompt ) ||  '{ "väärä": "vastaus" }'; 

 */    let json = await runClaude( prompt );
debugger;
console.log( json );
    try {
        return JSON.parse( json );
    } catch (e) {
        return (0,eval)( `(${ json })` );
    }
}

export function htmlToCleanElement( html ) {

    console.debug( "htmlToCleanElement", html );

    let element = htmlToElement( html );

    let removables = [
        ...element.querySelectorAll( "script" ),
        ...element.querySelectorAll( "img" ),
        ...element.querySelectorAll( "svg" )
    ];

    removables.forEach( script => script.remove() );

    return element;
}

export function htmlToText( html ) {
    return htmlToCleanElement( html ).textContent;
}

/* export function getElementBySelector( selector ) {
    return document.querySelector( selector );
} */

import { htmlToElement } from "./dom";
import { CLAUDE_INVALID_RESPONSE } from "./errors";
export { htmlToElement };

export function htmlFromHtmlBySelector( html, selector ) {
    let element = htmlToElement( html );
    element = element.querySelector( selector );
    return element.innerHTML;
}

/* export function triggerEvent( element, type ) {
    const evt = new Event( type, { bubbles: true });
    element.dispatchEvent( evt );
} */

/* export function completeStepClick({ selector }) {
    let element = document.querySelector( selector );
    console.log( element );
    triggerEvent( element, "click" );
} */