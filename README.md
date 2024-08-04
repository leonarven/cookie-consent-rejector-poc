"Tää ois muuten asia jossa Tekoäly Auttaisi™. Evästeklikkailun automatisoivan selainlisäosan muodossa siis"

# WhatIf
What if there is a browser extension that could handle the cookie consent (rejection) for you?

# Build
```
npm run watch:server
```

# Server (express)
```
npm run server
```

# Client (browser)
```
let response = await fetch( "http://localhost:3000", {
    method: "POST",
    mode: "no-cors",
    body: document.body.innerHTML
});

let steps = await response.json();

// run( steps ); // Not Implemented
```
