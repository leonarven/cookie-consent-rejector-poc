import { CLAUDE_INVALID_RESPONSE } from "./errors";
import env from "./env";

const { CLAUDE_API_KEY } = env;

export async function runClaude( prompt: string, options = {} ) {

    const url = 'https://api.anthropic.com/v1/messages';

    const data = {
        //"model": "claude-3-5-sonnet-20240620",
        "model": "claude-3-haiku-20240307",
        "max_tokens": 1024,
        ...options,
        "messages": [
            { "role": "user", "content": prompt }
        ]
    };

    const headers = {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
    };

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
}
