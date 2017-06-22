// cache our inputs
const submit = document.querySelector('button');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const passField = document.querySelector('#password');


// Create a validity class

class CheckValidity {
    constructor(input, type) {
        this.input = input;
        this.type = type;
        this.errors = [];
    }

    addError(message) {
        this.errors.push(message);
    }

    getMessages() {
        const status = this.input.validity;

        if (status.typeMismatch) {
            this.addError('Entry does not match the field type');
        }

        if (status.tooLong) {
            this.addError('Entry is too long');
        }

        if (status.tooShort) {
            this.addError('Entry is too short');
        }

        if (status.valueMissing){
            this.addError('Must not be left blank');
        }

        if (!this.input.value.match(/[A-Z]/g)) {
            this.addError('Must contain at least one uppercase letter');
        }

        if (this.type == "password" && this.input.value == "password") {
            this.addError('Password cannot be "password"');
        }

        return this.errors;
    }

    getNameMessages(){
        const status = this.input.validity;

        if(status.valueMissing){
            this.addError('Must not be left blank');
        }

        return this.errors;
    }

    getEmailMessages(){
        const status = this.input.validity;

        if(status.valueMissing){
            this.addError('Must not be left blank');
        }

        if(status.typeMismatch){
            this.addError('Please enter a valid email address');
        }

        return this.errors;
    }

}



// Set up submit listener

submit.addEventListener("click", (event) => {
    event.preventDefault(); // this will stop the standard form submission.
    let validatePassword = new CheckValidity(passField, "password");
    let validateName = new CheckValidity(nameField);
    let validateEmail = new CheckValidity(emailField);
    let pswdErrorMessages = validatePassword.getMessages();
    let nameError = validateName.getNameMessages();
    let emailError = validateEmail.getEmailMessages();
    let removeElem = elms => Array.from(elms).forEach(el => el.remove);

    removeElem(document.querySelectorAll("error"));

    if (pswdErrorMessages.length > 0) {
        pswdErrorMessages.forEach((err) => {
            passField.insertAdjacentHTML('afterend', '<p class="error">' + err + '</p>');
        });
    }else if(nameError.length > 0){
        nameError.forEach((err) => {
            nameField.insertAdjacentHTML('afterend', '<p class="error">'+ err + '</p>');
        });
    } else if(emailError.length > 0){
    emailError.forEach((err) => {
        emailField.insertAdjacentHTML('afterend', '<p class="error">'+ err + '</p>');
        });
    }else {
    document.getElementById('alert').classList.toggle("show");
    }
});