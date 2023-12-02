//input validators -- validity state shape {valid: bool, message?: ""}
function requiredValidator(val) {
  if (!val) return { valid: false, message: "This field is required!" };

  return { valid: true };
}

function emailValidator(val) {
  const regExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (!val) return { valid: false, message: "This field is required!" };

  if (!val.match(regExp)) return { valid: false, message: "Please enter a valid email" };

  return { valid: true };
}

//encapsulates a form field and validation function
class FormField {
  constructor(inputSelector, validatorFn) {
    this.validatorFn = validatorFn;
    this.inputElement = document.querySelector(inputSelector);

    if (!this.inputElement) throw new Error("Sorry, that input element could not be found!");

    this.fieldElement = this.inputElement.parentElement;
    this.errorElement = this.fieldElement.querySelector(".form__error");
  }

  validate() {
    const validity = this.validatorFn(this.inputElement.value);

    if (!validity.valid) {
      this.showError(validity.message);
      return false;
    } else {
      this.clearError();
      return true;
    }
  }

  showError(message) {
    this.fieldElement.classList.add("form__field--invalid");
    this.errorElement.innerText = message;
  }

  clearError() {
    this.fieldElement.classList.remove("form__field--invalid");
    this.errorElement.innerText = "";
  }
}

//encapsulates entire form and validates all constintuent fields
class Form {
  constructor(formSelector, fields) {
    this.formElement = document.querySelector(formSelector);
    this.fields = fields;

    if (!this.formElement) throw new Error("Sorry, that form could not be found!");

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.isValid()) this.markComplete();
    });
  }

  isValid() {
    return this.fields.every((field) => {
      return field.validate();
    });
  }

  markComplete() {
    this.formElement.classList.add("form--submitted");
  }
}

const form = new Form(".form", [
  new FormField("#name", requiredValidator),
  new FormField("#email", emailValidator),
  new FormField("#company", requiredValidator),
  new FormField("#title", requiredValidator),
  new FormField("#message", requiredValidator),
]);
