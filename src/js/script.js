'use strict';

const domSelect = document.getElementById("a-select");
const form = document.getElementById('form');
// Initialize custom select;
const select = NiceSelect.bind(domSelect);
// initialize form validator
const pristine = new Pristine(form);


domSelect.addEventListener("change", () => {
    this.validateSelect();
});

select.dropdown.addEventListener('focusout', () => {
    this.validateSelect();
})

form.addEventListener('submit', e => onFormSubmit(e));

async function onFormSubmit(event) {
    event.preventDefault();
    const selectValid = validateSelect();

    if (pristine.validate() && selectValid) {
        const dataObj = {
            first_name: document.getElementById('name').value,
            last_name: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            user_type: document.getElementById('a-select').value
        };

        if (Object.values(dataObj).some((val) => !!!val)) {
            return;
        }

        const ENDPOINT_URL = ' https://landing.133t.com/api/early-adopter/';
        fetch(ENDPOINT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj),
        }).then((res) => {
            if (res.ok) {
                clearForm();
                successModalAction(true);
            } else {
                alert(`HTTP Error: ${res.statusText}`);
            }
        })

    }
}

function clearForm() {
    form.reset();
    select.clear();
    select.update();
    const error = document.getElementById('form-select-error');
    error.innerText = '';
}

function validateSelect() {
    const formSelect = document.getElementById('form-select');
    const error = document.getElementById('form-select-error');

    if (select.options.some(option => option.element.classList.contains('selected'))) {
        formSelect.classList.remove('has-danger-custom');
        error.innerText = '';
        return true;
    } else {
        formSelect.classList.add('has-danger-custom');
        error.innerText = 'Please choose.';
        return false;
    }
}

function successModalAction(show) {
    const modalElement = document.querySelector('.success-modal');
    modalElement.style.display = show ? 'flex' : 'none';
    const hideModalListenerCallbackFn = () => successModalAction(false);
    if (show) {
        modalElement.addEventListener('click', hideModalListenerCallbackFn)
    } else {
        modalElement.removeEventListener('click', hideModalListenerCallbackFn);
    }
}

