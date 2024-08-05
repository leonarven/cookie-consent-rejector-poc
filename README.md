"Tää ois muuten asia jossa Tekoäly Auttaisi™. Evästeklikkailun automatisoivan selainlisäosan muodossa siis"

## WhatIf
What if there is a browser extension that could handle the cookie consent (rejection) for you?

## Progress
0. Is running needed?
1. Readed HTML, cleaned it from extra weight (<script>,<svg>,<img>,...)
2. Cheap fast model checks is there textual content that hints about cookie consent interface (CCI)
3. If there is, better cheap model (with large input prompt length) analyses the HTML and builds a selector for CCI.
3.1. The validity of selector is checked by running textual content of the element throught 1. AI.
4. HTML of CCI goes to final good AI that builds action steps for rejecting everything.
5. Steps is run by Runner (todo)
6. ???
7. Profit!

# Build
```
npm run watch:server
```
# Run
Currently separated to client and server (because of CORS+custom auth headers for LLM)

## Server (express)
Requires env variables:
- CLAUDE_API_KEY

```
npm run server
```

## Client (browser)
```
let response = await fetch( "http://localhost:3000", {
    method: "POST",
    mode: "no-cors",
    body: document.body.innerHTML
});

let steps = await response.json();

// run( steps ); // Not Implemented
```
