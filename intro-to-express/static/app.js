let btn = document.getElementsByTagName("button")[0]

let render = data => {
    let h1 = document.createElement("h1");
    h1.textContent = `${data.message} and your credentials are`
    document.body.appendChild(h1);
}

btn.addEventListener("click", e => {
    e.preventDefault()
    let body = { 
        email: e.target.form[0].value,
        password: e.target.form[1].value
    }
    
    fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: new Headers({
            "Content-type": "application/json"
        }),
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => render(data))
})