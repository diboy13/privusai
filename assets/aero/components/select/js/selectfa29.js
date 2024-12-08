class AeroSelect {
  /**
   * Constructs a new instance of the AeroSelect class.
   *
   * @param {HTMLElement} el - The HTML element representing the select component.
   * @param {Object} options - The options for the select component.
   * @param {Array} options.data - The data for the select component.
   * @param {string|null} options.defaultValue - The default value for the select component.
   * @param {Function|null} options.onChange - The callback function for when the select value changes.
   */
  constructor(el, options) {
    this.el = el;

    this.data = options.data || [];
    this.defaultValue = options.defaultValue || null;
    this.onChange = options.onChange || null;

    /**
     * The CSS class names for the select component elements.
     *
     * @type {Object}
     * @property {string} label - The CSS class name for the label element.
     * @property {string} icon - The CSS class name for the icon element.
     * @property {string} input - The CSS class name for the input element.
     * @property {string} selected - The CSS class name for the selected element.
     * @property {string} dropdown - The CSS class name for the dropdown element.
     * @property {string} dropdownButton - The CSS class name for the dropdown button element.
     */
    this.classes = {
      label: '.js-a-select-label',
      icon: '.js-a-select-icon',
      input: '.js-a-select-input',
      selected: '.js-a-select-selected',
      dropdown: '.js-a-select-dropdown',
      dropdownButton: '.js-a-select-dropdown-button',
    };

    /**
     * The elements of the select component.
     *
     * @type {Object}
     * @property {HTMLElement} body - The body element.
     * @property {HTMLElement} label - The label element.
     * @property {HTMLElement} icon - The icon element.
     * @property {HTMLInputElement} input - The input element.
     * @property {HTMLElement} selected - The selected element.
     * @property {HTMLElement} dropdown - The dropdown element.
     * @property {NodeList} dropdownButtons - The list of dropdown button elements.
     */
    this.elements = {
      body: document.querySelector('body'),
      label: this.el.querySelector(this.classes.label),
      icon: this.el.querySelector(this.classes.icon),
      input: this.el.querySelector(this.classes.input),
      selected: this.el.querySelector(this.classes.selected),
      dropdown: this.el.querySelector(this.classes.dropdown),
      dropdownButtons: this.el.querySelectorAll(this.classes.dropdownButton),
    };

    this.statuses = {
      open: 'is-open',
    };

    this.init();
  }

  init() {
    if (this.defaultValue) this.setDefaultValue(this.defaultValue);
    this.setListeners();
    this.initPerfectScrollbar();
  }

  /**
   * Initializes PerfectScrollbar on the dropdown element.
   *
   * @return {void} This function does not return a value.
   */
  initPerfectScrollbar() {
    const { dropdown } = this.elements;

    // @ts-ignore
    new PerfectScrollbar(dropdown, {
      suppressScrollX: true,
    });
  }

  /**
   * Sets up event listeners for the label, body, and dropdown buttons.
   *
   */
  setListeners() {
    const { label, body, dropdownButtons } = this.elements;

    label.addEventListener('click', () => this.toggle());

    if (this.data.length) {
      this.generateOptions();
    } else {
      dropdownButtons.forEach((item) => {
        item.addEventListener('click', () => this.handleButtonClick(item));
      });
    }

    if (body) {
      body.addEventListener('click', (event) => this.handleClickOutside(event));
    }
  }

  handleButtonClick(button) {
    const { selected, input } = this.elements;
    const value = button.dataset.value || button.getAttribute('data-value');
    const label = button.querySelector('span').innerHTML;

    selected.innerHTML = label;
    input.value = value;

    if (this.onChange) {
      this.onChange(value);
    }

    this.close();
  }

  handleClickOutside(event) {
    if (!this.el.contains(event.target)) this.close();
  }

  /**
   * Generates the dropdown options based on the data and appends them to the dropdown element.
   *
   */
  generateOptions() {
    const { dropdown } = this.elements;

    const options = this.data.map((item) => this.createOption(item));

    dropdown.innerHTML = '';
    options.forEach((option) => dropdown.appendChild(option));
  }

  /**
   * Creates an option element based on the provided data.
   *
   * @param {Object} data - The data object containing label, value, and selected properties.
   * @return {HTMLLIElement} The created list item element.
   */
  createOption(data) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');

    li.classList.add('a-select-dropdown-item');
    span.innerHTML = data.label;
    span.setAttribute('data-line-clamp', '');
    button.setAttribute('data-value', data.value);
    button.classList.add('a-select-dropdown-button', 'js-a-select-dropdown-button');
    button.addEventListener('click', () => this.handleButtonClick(button));

    if (data.selected) this.setDefaultValue(data.value);

    button.appendChild(span);
    li.appendChild(button);

    return li;
  }

  /**
   * Sets the default value for the select element.
   *
   * @param {string} defaultValue - The value to set as the default.
   * @return {void}
   */
  setDefaultValue(defaultValue) {
    const { selected, input, dropdownButtons } = this.elements;

    if (this.data.length === 0) {
      dropdownButtons.forEach((item) => {
        const value = item.dataset.value || item.getAttribute('data-value');
        const label = item.querySelector('span').innerHTML;

        if (value === defaultValue) {
          selected.innerHTML = label;
          input.value = value;
        }
      });
    } else {
      const option = this.data.find((item) => item.value === defaultValue);

      selected.innerHTML = option.label;
      input.value = option.value;
    }
  }

  /**
   * Toggles the open/close state of the dropdown.
   *
   * @return {void} No return value
   */
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Closes the dropdown and removes the open class from the dropdown and icon elements.
   *
   * @return {void}
   */
  close() {
    const { dropdown, icon } = this.elements;

    dropdown.classList.remove(this.statuses.open);
    icon.classList.remove(this.statuses.open);
  }

  /**
   * Adds the 'open' class to the dropdown and icon elements.
   *
   */
  open() {
    const { dropdown, icon } = this.elements;

    dropdown.classList.add(this.statuses.open);
    icon.classList.add(this.statuses.open);
  }

  /**
   * Check if the dropdown element contains the class for open status.
   *
   * @return {boolean} true if the dropdown is open, false otherwise
   */
  isOpen() {
    const { dropdown } = this.elements;

    return dropdown.classList.contains(this.statuses.open);
  }
}

class AeroMultiSelect {
  /**
   * Constructs a new instance of the AeroSelect class.
   *
   * @param {HTMLElement} el - The HTML element representing the select component.
   * @param {Object} options - The options for the select component.
   * @param {Array} options.data - The data for the select component.
   * @param {Array} options.defaultValue - The default value for the select component.
   * @param {Function|null} options.onChange - The callback function for when the select value changes.
   */
  constructor(el, options) {
    this.el = el;

    this.data = options.data || [];
    this.defaultValue = options.defaultValue || [];
    this.onChange = options.onChange || null;

    /**
     * The CSS class names for the select component elements.
     *
     * @type {Object}
     * @property {string} label - The CSS class name for the label element.
     * @property {string} icon - The CSS class name for the icon element.
     * @property {string} input - The CSS class name for the input element.
     * @property {string} selected - The CSS class name for the selected element.
     * @property {string} dropdown - The CSS class name for the dropdown element.
     * @property {string} dropdownButton - The CSS class name for the dropdown button element.
     */
    this.classes = {
      label: '.js-a-select-label',
      icon: '.js-a-select-icon',
      input: '.js-a-select-input',
      selected: '.js-a-select-selected',
      dropdown: '.js-a-select-dropdown',
      dropdownButton: '.js-a-select-dropdown-button',
    };

    /**
     * The elements of the select component.
     *
     * @type {Object}
     * @property {HTMLElement} body - The body element.
     * @property {HTMLElement} label - The label element.
     * @property {HTMLElement} icon - The icon element.
     * @property {HTMLInputElement} input - The input element.
     * @property {HTMLElement} selected - The selected element.
     * @property {HTMLElement} dropdown - The dropdown element.
     * @property {NodeList} dropdownButtons - The list of dropdown button elements.
     */
    this.elements = {
      body: document.querySelector('body'),
      label: this.el.querySelector(this.classes.label),
      icon: this.el.querySelector(this.classes.icon),
      input: this.el.querySelector(this.classes.input),
      selected: this.el.querySelector(this.classes.selected),
      dropdown: this.el.querySelector(this.classes.dropdown),
      dropdownButtons: this.el.querySelectorAll(this.classes.dropdownButton),
    };

    this.statuses = {
      open: 'is-open',
    };

    this.selectedValues = new Set(this.defaultValue);

    this.init();
  }

  init() {
    this.updateSelectedDisplay();
    this.setListeners();
    this.initPerfectScrollbar();
  }

  /**
   * Initializes PerfectScrollbar on the dropdown element.
   *
   * @return {void} This function does not return a value.
   */
  initPerfectScrollbar() {
    const { dropdown } = this.elements;

    // @ts-ignore
    new PerfectScrollbar(dropdown, {
      suppressScrollX: true,
    });
  }

  /**
   * Sets up event listeners for the label, body, and dropdown buttons.
   *
   */
  setListeners() {
    const { label, body, dropdownButtons } = this.elements;

    label.addEventListener('click', () => this.toggle());

    if (this.data.length) {
      this.generateOptions();
    } else {
      dropdownButtons.forEach((item) => {
        item.addEventListener('click', () => this.handleButtonClick(item));
      });
    }

    if (body) {
      body.addEventListener('click', (event) => this.handleClickOutside(event));
    }
  }

  handleButtonClick(button) {
    const value = button.dataset.value || button.getAttribute('data-value');
    const isAnyOption = value === 'any';

    if (isAnyOption) {
      this.selectedValues.clear();
      this.selectedValues.add(value);
    } else {
      if (this.selectedValues.has('any')) {
        this.selectedValues.delete('any');
      }

      if (this.selectedValues.has(value)) {
        this.selectedValues.delete(value);
      } else {
        this.selectedValues.add(value);
      }
    }

    // If no values are selected, set 'any' as the selected value
    if (this.selectedValues.size === 0) {
      this.selectedValues.add('any');
    }

    this.updateSelectedDisplay();

    if (this.onChange) {
      this.onChange(Array.from(this.selectedValues));
    }
  }

  handleClickOutside(event) {
    if (!this.el.contains(event.target)) this.close();
  }

  /**
   * Generates the dropdown options based on the data and appends them to the dropdown element.
   *
   */
  generateOptions() {
    const { dropdown } = this.elements;

    const options = this.data.map((item) => this.createOption(item));

    dropdown.innerHTML = '';
    options.forEach((option) => dropdown.appendChild(option));
  }

  /**
   * Creates an option element based on the provided data.
   *
   * @param {Object} data - The data object containing label, value, and selected properties.
   * @return {HTMLLIElement} The created list item element.
   */
  createOption(data) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');

    li.classList.add('a-select-dropdown-item');
    span.innerHTML = data.label;
    span.setAttribute('data-line-clamp', '');
    button.setAttribute('data-value', data.value);
    button.classList.add('a-select-dropdown-button', 'js-a-select-dropdown-button');
    button.addEventListener('click', () => this.handleButtonClick(button));

    if (this.selectedValues.has(data.value)) {
      button.classList.add('selected');
    }

    button.appendChild(span);
    li.appendChild(button);

    return li;
  }

  updateSelectedDisplay() {
    const { selected, input } = this.elements;

    const selectedLabels = Array.from(this.selectedValues)
      .map(value => {
        const item = this.data.find((item) => item.value === value);
        return item ? item.label : '';
      })
      .filter(Boolean);

    selected.innerHTML = selectedLabels.join(', ');
    input.value = Array.from(this.selectedValues).join(',');
  }

  /**
   * Toggles the open/close state of the dropdown.
   *
   * @return {void} No return value
   */
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Closes the dropdown and removes the open class from the dropdown and icon elements.
   *
   * @return {void}
   */
  close() {
    const { dropdown, icon } = this.elements;

    dropdown.classList.remove(this.statuses.open);
    icon.classList.remove(this.statuses.open);
  }

  /**
   * Adds the 'open' class to the dropdown and icon elements.
   *
   */
  open() {
    const { dropdown, icon } = this.elements;

    dropdown.classList.add(this.statuses.open);
    icon.classList.add(this.statuses.open);
  }

  /**
   * Check if the dropdown element contains the class for open status.
   *
   * @return {boolean} true if the dropdown is open, false otherwise
   */
  isOpen() {
    const { dropdown } = this.elements;

    return dropdown.classList.contains(this.statuses.open);
  }
}
