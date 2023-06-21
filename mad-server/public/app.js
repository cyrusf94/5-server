let form = document.getElementById('form');
let userInput = document.getElementById("input");
let btn = document.getElementById("btn")
let label = document.getElementById("label");


let wordCount = 1;

btn.addEventListener("click", evt => {
    evt.preventDefault();
    let body = {
        word: evt.target.form[0].value
    }

    fetch("http://localhost:4000/word", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json"
        }),
        
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => render(data));
    changeForm();
    userInput.value = "";
})

function render(words) {
    let story = `${words[0]} ${words[1]} the ${words[2]} ${words[3]} ${words[4]}`;
    let div = document.createElement("div")
    div.innerHTML = story;
    div.id = "story";
    document.body.appendChild(div)

    let reset = document.createElement("a");
    reset.innerHTML = "reset";
    reset.href = "http://127.0.0.1:5500/public/index.html";
    div.appendChild(reset);
}

function changeForm() {
    switch(wordCount <= 5) {
        case wordCount === 1 :
            label.innerHTML = "enter a verb";
            wordCount++;
            break;
        case wordCount === 2 :
            label.innerHTML = "enter a adjective";
            wordCount++;
            break;
        case wordCount === 3 :
            label.innerHTML = "enter a noun ";
            wordCount++;
            break;
        case wordCount === 4 :
            label.innerHTML = "enter a adverb";
            wordCount++
            break;
        case wordCount === 5 :
            document.body.removeChild(form)
            break;
    }

}