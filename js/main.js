const elements = document.querySelectorAll("[bind]");
const bindData = {};

function setupBinding() {
    for (let el of elements) {
        if (el.type) {
            const bindKeyName = el.getAttribute("bind");
            createGetterSetter(bindData, bindKeyName);
            el.onkeyup = function () {
                bindData[bindKeyName] = this.value;
            };
        }
    }
}

function createGetterSetter(dataObj, key) {
    Object.defineProperty(dataObj, key, {
        get: function () {
            return bindData[key];
        },
        set: function (value) {
            for (let el of elements) {
                const bindKeyName = el.getAttribute("bind");
                if (bindKeyName === key) {
                    el.innerText = value;
                }
            }
        },
        enumerable: true // So that it doesn't appear in Object.keys
    });
}

function printEmailToConsole() {
    console.log(bindData.email);
}

function clearEmailInput() {
    bindData.email = "";
}

setupBinding();
