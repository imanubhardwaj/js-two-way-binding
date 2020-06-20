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
    let latestValue;
    Object.defineProperty(dataObj, key, {
        get: function () {
            return latestValue;
        },
        set: function (value) {
            latestValue = value;
            for (let el of elements) {
                const bindKeyName = el.getAttribute("bind");
                if (bindKeyName === key) {
                    if (el.type) {
                        el.value = value;
                    } else {
                        el.innerText = value;
                    }
                }
            }
        },
        enumerable: true // So that it doesn't appear in Object.keys
    });
}

function printEmailToConsole(key) {
    console.log(bindData[key]);
}

function clearEmailInput(key) {
    bindData[key] = "";
}

setupBinding();
