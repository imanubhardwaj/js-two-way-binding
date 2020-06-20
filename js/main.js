const elements = document.querySelectorAll("[bind]");
const bindData = {};

function setupBinding() {
    for (let el of elements) {
        if (el.type) {
            const bindKeyName = el.getAttribute("bind");
            el.onkeyup = function () {
                bindData[bindKeyName] = this.value;
            };
        }
    }
}

function printEmailToConsole() {
    console.log(bindData.email);
}

function clearEmailInput() {
    bindData.email = "";
}

setupBinding();
