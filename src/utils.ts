import { runClaude } from "./llm"; 
import { htmlToElement } from "./dom";
export { htmlToElement };

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

export function htmlFromHtmlBySelector( html, selector ) {
    let element = htmlToElement( html );
    element = element.querySelector( selector );
    return element.innerHTML;
}