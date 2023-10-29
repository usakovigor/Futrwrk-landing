'use strict';

// initialize form validation and submission;
const form = document.getElementById('form');
const pristine = new Pristine(form);
form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit(e);
});

// initialize select elements;
const signUpSelect = document.getElementById("a-select");
const compSizeSelect = document.getElementById("cs-select");
const helpSelect = document.getElementById("help-select");

// bind selects to nice select library;
const signUpNiceSelect = signUpSelect ? NiceSelect.bind(signUpSelect) : null;
const compSizeNiceSelect = compSizeSelect ? NiceSelect.bind(compSizeSelect) : null;
const helpNiceSelect = helpSelect ? NiceSelect.bind(helpSelect) : null;

const selectById = {
    'a-select': signUpNiceSelect,
    'cs-select': compSizeNiceSelect,
    'help-select': helpNiceSelect
}

// adding validation on value changed;
const filteredSelects = [signUpSelect, compSizeSelect, helpSelect].filter(val => !!val);
filteredSelects.forEach(select => {
    select.addEventListener("change", () => {
        this.validateSelect(select.getAttribute('id'));
    });
})

// adding validation on lose focus;
const filteredNiceSelects = [signUpNiceSelect, compSizeNiceSelect, helpNiceSelect].filter(val => !!val);
filteredNiceSelects.forEach(select => {
    select.dropdown.addEventListener('focusout', () => {
        this.validateSelect(select.el.getAttribute('id'));
    })
})

async function onFormSubmit(event) {
    event.preventDefault();
    const selectValid = signUpSelect ? validateSelect('a-select') : validateSelect(['cs-select', 'help-select']);

    if (!pristine.validate() || !selectValid) {
        return;
    }

    if (signUpSelect) {
        signUpRequest();
    } else {
        postToGoogleForm();
    }
}

function signUpRequest() {
    let dataObj = {
        email: document.getElementById('email').value,
        user_type: document.getElementById('a-select').value
    };

    if (Object.values(dataObj).some((val) => !!!val)) {
        console.error('email or user_type cannot be empty');
        return;
    }

    dataObj = {
        ...dataObj, first_name: 'dummy_name',
        last_name: 'dummy_name',
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
            gtag('event', 'conversion', {'send_to': 'AW-11064986267/zLLWCLu2pIoYEJuVmZwp'});
            showSuccess();
        } else {
            alert(`HTTP Error: ${res.statusText}`);
        }
    })
}

function postToGoogleForm() {
    const dataObj = {
        'Email': document.getElementById('email').value,
        'CompanySize': document.getElementById('cs-select').value,
        'HowCanWeHelp': document.getElementById('help-select').value,
        'Question': document.getElementById('text').value,
        'agree': document.getElementById('agree').value
    };

    const button = document.getElementById('submitBtn');
    const loadingClass = 'form-sec__btn--loading';
    if (Object.values(dataObj).some((val) => !!!val) || button.classList.contains(loadingClass)) {
        return;
    }

    button.classList.toggle(loadingClass);

    const ENDPOINT_URL = form.getAttribute('action');
    fetch(ENDPOINT_URL, {method: 'POST', body: new FormData(form)})
        .then(res => {
            if (res.ok) {
                clearForm();
                button.classList.toggle(loadingClass);
            } else {
                alert(`HTTP Error: ${res.statusText}`);
            }
        })
}

function clearForm() {
    form.reset();
    Object.entries(selectById).forEach(([id, niceSelect]) => {
        if (!niceSelect) {
            return;
        }

        niceSelect.clear();
        niceSelect.update();

        const error = document.getElementById(`${id}-error`);
        if (error) {
            error.innerText = '';
        }
    })
}

function validateSelect(selectId) {
    let selectIdsArr = selectId;
    if (!Array.isArray(selectId)) {
        selectIdsArr = [selectId];
    }

    const resultArr = [];
    selectIdsArr.forEach(value => {
        const formSelect = document.getElementById(`${value}-group`);
        const error = document.getElementById(`${value}-error`);

        if (selectById[value].options.some(option => option.element.classList.contains('selected'))) {
            formSelect.classList.remove('has-danger-custom');
            error.innerText = '';
            resultArr.push(true);
        } else {
            formSelect.classList.add('has-danger-custom');
            error.innerText = 'Please choose.';
            resultArr.push(false);
        }
    });

    return resultArr.every(arrItem => !!arrItem);
}

function showSuccess() {
    const formEle = document.getElementById('main-form');
    const successEle = document.getElementById('success');

    formEle.style.display = 'none';
    successEle.style.display = 'block';
}

