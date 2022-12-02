const contactForm = document.getElementById("contactForm");
const response = document.getElementById("contactFormResponse");
const submitButton = document.getElementById("submit");

const setThenClearMessage = (message) => {
    setTimeout(() => {response.innerText = message}, 4000);
}

const validateEmail = (email) => {
    const regExp = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return regExp.test(email);
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

    
    console.log(e)
    console.log({name, email, message})
    console.log("submit")
})