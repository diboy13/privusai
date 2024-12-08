/**
 * Checks if the given value is valid based on the given minimum value.
 *
 * @param {string|number} value The value to check.
 * @param {string|number} min The minimum value to compare with.
 * @returns {boolean} `true` if the value is valid, `false` otherwise.
 */
function minIsValid(value, min) {
  return Number(value) >= Number(min);
}

/**
 * Checks if the given value is valid based on the given maximum value.
 *
 * @param {string|number} value The value to check.
 * @param {string|number} max The maximum value to compare with.
 * @returns {boolean} `true` if the value is valid, `false` otherwise.
 */
function maxIsValid(value, max) {
  return Number(value) <= Number(max);
}

/**
 * Checks if the given value is valid based on the given minimum length.
 *
 * @param {string} value The value to check.
 * @param {string|number} minLength The minimum length to compare with.
 * @returns {boolean} `true` if the value is valid, `false` otherwise.
 */
function minLengthIsValid(value, minLength) {
  return String(value).length >= Number(minLength);
}

/**
 * Checks if the given value is valid based on the given maximum length.
 *
 * @param {string} value The value to check.
 * @param {string|number} maxLength The maximum length to compare with.
 * @returns {boolean} `true` if the value is valid, `false` otherwise.
 */
function maxLengthIsValid(value, maxLength) {
  return String(value).length <= Number(maxLength);
}

/**
 * Checks if the given value is valid based on the given regular expression.
 *
 * @param {string} value The value to check.
 * @param {string} regexp The regular expression to compare with.
 * @returns {boolean} `true` if the value is valid, `false` otherwise.
 */
function regexpIsValid(value, regexp) {
  return new RegExp(regexp).test(value);
}

/**
 * Sets the given input element's validity status by adding or removing the
 * "is-error" class.
 *
 * @param {HTMLInputElement} input The input element to set the validity status for.
 * @param {boolean} isValid `true` if the input is valid, `false` otherwise.
 */
function setInputValidStatus(input, isValid) {
  if (isValid) input.classList.remove("is-error");
  if (!isValid) input.classList.add("is-error");
}

/**
 * Creates and inserts an error message element after the specified input
 * element. The error message is displayed as a span element with the "error-msg"
 * class and contains the provided message.
 *
 * @param {HTMLInputElement} input The input element after which the error message
 *                                 will be inserted.
 * @param {string} msg The error message to display.
 */
function setErrorMsg(input, msg) {
  const error = document.createElement("span");

  error.classList.add("error-msg");
  error.innerHTML = msg;

  input.insertAdjacentElement("afterend", error);
}

/**
 * Sets the input element to an error state and displays the specified error
 * message. The input element is marked as invalid by adding the "is-error" class,
 * and an error message is inserted after the input element. The error message is
 * logged to the console.
 *
 * @param {HTMLInputElement} input The input element to set the error status for.
 * @param {string} msg The error message to display and log.
 */
function setInputError(input, msg) {
  if (input instanceof HTMLInputElement) {
    const error = input.nextElementSibling;

    if (error instanceof HTMLSpanElement && error.classList.contains("error-msg")) {
      error.remove();
    }
  }

  setInputValidStatus(input, false);
  setErrorMsg(input, msg);

  console.error(msg);
}

/**
 * Clears the error state of the specified input element by removing the
 * associated error message and restoring the input's valid status.
 *
 * @param {string} id The ID or data-id attribute of the input element to clear
 *                    the error for.
 */
function clearInputError(id) {
  const input = document.getElementById(id) || document.querySelector(`[data-id="${id}"]`);

  if (input instanceof HTMLInputElement) {
    const error = input.nextElementSibling;

    if (error instanceof HTMLSpanElement && error.classList.contains("error-msg")) {
      error.remove();
    }

    setInputValidStatus(input, true);
  } else {
    console.error(`Input with id "${id}" not found`);
  }
}

/**
 * Validates the value of the input element with the specified ID using the
 * specified options. Checks if the value is valid against the input element's
 * min, max, minLength, maxLength, and pattern attributes, and calls the provided
 * callback if the value is valid.
 *
 * @param {string} id The ID or data-id attribute of the input element to validate.
 * @param {Object} options Optional options object with the following properties:
 *                          - name: The name of the input element. Defaults to the
 *                                  id attribute.
 *                          - min: The minimum value of the input element.
 *                          - max: The maximum value of the input element.
 *                          - minLength: The minimum length of the input element.
 *                          - maxLength: The maximum length of the input element.
 *                          - pattern: The pattern to match against the input
 *                                     element's value.
 *                          - callback: The callback to call if the value is valid.
 */
function inputValidation(id, options = {}) {
  const input = document.getElementById(id) || document.querySelector(`[data-id="${id}"]`);

  if (input instanceof HTMLInputElement) {
    const value = input.value;
    const name = input.name || options.name || id;
    const min = input.min || options.min;
    const max = input.max || options.max;
    const minLength = input.minLength || options.minLength;
    const maxLength = input.maxLength || options.maxLength;
    const regexp = input.pattern || options.pattern;
    const callback = options.callback;

    if (min && !minIsValid(value, min)) {
      const msg = `${name} ${value} is less than min ${min}`;

      setInputError(input, msg);
      return;
    }

    if (max && !maxIsValid(value, max)) {
      const msg = `${name} ${value} is greater than max ${max}`;

      setInputError(input, msg);
      return;
    }

    if (minLength !== -1 && !minLengthIsValid(value, minLength)) {
      const msg = `${name} ${value} is less than minLength ${minLength}`;

      setInputError(input, msg);
      return;
    }

    if (maxLength !== -1 && !maxLengthIsValid(value, maxLength)) {
      const msg = `${name} ${value} is greater than maxLength ${maxLength}`;

      setInputError(input, msg);
      return;
    }

    if (regexp && !regexpIsValid(value, regexp)) {
      const msg = `${name} ${value} does not match regexp ${regexp}`;

      setInputError(input, msg);
      return;
    }

    if (callback) callback();

    setInputValidStatus(input, true);
  } else {
    console.error(`Invalid input ID: ${id}`);
  }
}
