const data = (() => {
  // Create a Map to store binding names and associated elements.
  const bindedElementsMap = new Map();

  // Find all elements with the 'data-bind' attribute.
  const bindedElements = document.querySelectorAll('[data-bind]');

  // Function to get bind name from element.
  const getBindNameFromElement = (el) => el.getAttribute('data-bind');

  // Iterate through the found elements.
  bindedElements.forEach((el) => {
    const bindName = getBindNameFromElement(el);

    // Initialize an array for the bindName if it doesn't exist in the map.
    if (!bindedElementsMap.has(bindName)) {
      bindedElementsMap.set(bindName, []);
    }

    // Push the element into the array associated with the bindName.
    bindedElementsMap.get(bindName).push(el);

    // Add an event listener for 'keyup' on the element to update data properties.
    el.addEventListener('input', function () {
      data[bindName] = this.value;
    });
  });

  // Define the proxy handler.
  const bindHandler = {
    set: function (target, prop, value) {
      const bindedElements = bindedElementsMap.get(prop) ?? [];

      // Update the value of bound elements.
      bindedElements.forEach((el) => {
        const prop = el.tagName === 'INPUT' ? 'value' : 'textContent';
        if (el[prop] !== value) {
          el[prop] = value;
        }
      });

      // Reflect the change in the target object.
      return Reflect.set(...arguments);
    },
  };

  // Create a proxy object for data with the defined handler.
  return new Proxy({}, bindHandler);
})();

const clearUsername = () => {
  data.username = '';
};
