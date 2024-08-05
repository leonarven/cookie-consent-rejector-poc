(() => {
  // src/browser/utils.ts
  function getElementBySelector(selector) {
    return document.querySelector(selector);
  }
  function triggerEvent(element, type) {
    const evt = new Event(type, { bubbles: true });
    element.dispatchEvent(evt);
  }

  // src/browser/index.ts
  async function completeSteps(steps) {
    for (let step of steps) {
      await new Promise((fn) => setTimeout(fn, 1e3));
      await completeStep(step);
    }
  }
  function completeStep(step) {
    let { action } = step;
    switch (action) {
      case "setCheckboxValue":
        setCheckboxValue(step);
        break;
      case "setInputValue":
        setInputValue(step);
        break;
      case "click":
        completeStepClick(step);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }
  function completeStepClick({ selector }) {
    let element = document.querySelector(selector);
    console.log(element);
    triggerEvent(element, "click");
  }
  function setCheckboxValue({ selector, value }) {
    let element = getElementBySelector(selector);
    if (value) {
      element.checked = true;
    } else {
      element.checked = false;
    }
    triggerEvent(element, "change");
  }
  function setInputValue({ selector, value }) {
    let element = getElementBySelector(selector);
    element.value = value;
    triggerEvent(element, "input");
  }
  (async (html) => {
    let response = await fetch("http://localhost:3000", {
      method: "POST",
      body: html
    });
    let steps = await response.json();
    await completeSteps(steps);
    debugger;
  })(document.body.innerHTML);
})();
