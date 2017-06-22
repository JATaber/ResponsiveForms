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

        if(status.typeMismatch){
            this.addError('Must be a valid email address');
        }

        if (!this.input.value.match(/[A-Z]/g)) {
            this.addError('Must contain at least one uppercase letter');
        }

        if (this.type == "password" && this.input.value == "password") {
            this.addError('Password cannot be "password"');
        }

        return this.errors;
    }

}



// Set up submit listener

submit.addEventListener("click", (event) => {
    event.preventDefault(); // this will stop the standard form submission.

let validatePassword = new CheckValidity(passField, "password");
let errorMessages = validatePassword.getMessages();
// console.log(errorMessages);
if (errorMessages.length > 0) {
    errorMessages.forEach( (err) => {
        passField.insertAdjacentHTML('afterend', '<p class="error">' + err + '</p>');
});
} else {
    document.getElementById('alert').classList.toggle("show");
}
});