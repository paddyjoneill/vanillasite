const contactForm = document.getElementById("contactForm");
const response = document.getElementById("contactFormResponse");
const submitButton = document.getElementById("submit");
const darkModeButton = document.getElementById("dark-mode-toggle")
const root = document.querySelector(":root")

let dark = false

const colors = {
    "--text-color": { light: "#475569", dark: "#e2e8f0" },
    "--heading-color": {light: "#1e293b", dark: "#f1f5f9"},
    "--background-color": {light: "#f8fafc", dark: "#1e293b"},
    "--form-background": {light: "#e2e8f0", dark: "#475569"},
    "--picture-outline": {light: "#cdd5e1", dark: "#64748b"},
}

const setThenClearMessage = (message) => {
    setTimeout(() => {response.innerText = message}, 4000);
}

const validateEmail = (email) => {
    const regExp = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return regExp.test(email);
};

const generateKey = () => {
    const utc = new Date().getTime();
    return window.btoa(utc.toString());
};

contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if(name.length === 0){
        setThenClearMessage("Please Enter a Name");
        return;
    }
    if(!validateEmail(email)){
        setThenClearMessage("Please Enter a Valid Email");
        return;
    }
    if(message.length === 0){
        setThenClearMessage("Please Enter a Message");
        return;
    }

    const key = generateKey()

    const payload = {name, email, message, key}

    const functionAddress = "https://vanilla-dev-site.netlify.app/.netlify/functions/contact"

    const postSettings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    fetch(functionAddress, postSettings)

    
    console.log(e)
    console.log({name, email, message})
    console.log("submit")
})

darkModeButton.addEventListener("click", () => {
    console.log("dark button clicked")
    if(!dark){
        for(key of Object.keys(colors)){
            console.log(key, colors)
            root.style.setProperty(key, colors[key].dark)
        }
        dark = true;
    } else {
        for(key of Object.keys(colors)){
            console.log(key, colors)
            root.style.setProperty(key, colors[key].light)
        }
        dark = false;
    }
})