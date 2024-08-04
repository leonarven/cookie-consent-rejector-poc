"Tää ois muuten asia jossa Tekoäly Auttaisi™. Evästeklikkailun automatisoivan selainlisäosan muodossa siis"

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