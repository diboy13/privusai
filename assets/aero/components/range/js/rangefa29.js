class AeroRange {
  /**
   * Constructs a new instance of the AeroRange class.
   *
   * @constructor
   * @param {Element} el - The range element.
   * @param {Object} options - The options for the range.
   * @param {boolean} [options.isSingle=false] - If the range is single.
   * @param {number} [options.min=0] - The minimum value.
   * @param {number} [options.max=100] - The maximum value.
   * @param {number} [options.step=1] - The step value.
   * @param {number} [options.minValue=0] - The minimum value.
   * @param {number} [options.maxValue=100] - The maximum value.
   * @param {Function} [options.thumbMinHandler=null] - The handler for the minimum thumb.
   * @param {Function} [options.thumbMaxHandler=null] - The handler for the maximum thumb.
   * @param {Function} [options.onChange=null] - The handler for the onChange event.
   */
  constructor(el, options) {
    this.el = el;

    this.isSingle = Boolean(options.isSingle) || false;
    this.min = Number(options.min) || 0;
    this.max = Number(options.max) || 100;
    this.step = Number(options.step) || 1;
    this.minValue = Number(options.minValue) || 0;
    this.maxValue = Number(options.maxValue) || 100;
    this.thumbMinHandler = options.thumbMinHandler || null;
    this.thumbMaxHandler = options.thumbMaxHandler || null;
    this.onChange = options.onChange || null;

    /**
     * The class names for the range elements.
     *
     * @type {Object}
     * @property {string} inputMin - The class name for the minimum input range element.
     * @property {string} inputMax - The class name for the maximum input range element.
     * @property {string} bar - The class name for the range bar element.
     * @property {string} inverseBarLeft - The class name for the left inverse bar element.
     * @property {string} inverseBarRight - The class name for the right inverse bar element.
     * @property {string} thumbMin - The class name for the minimum thumb element.
     * @property {string} thumbMax - The class name for the maximum thumb element.
     * @property {string} valueMin - The class name for the minimum value element.
     * @property {string} valueMax - The class name for the maximum value element.
     */
    this.classes = {
      inputMin: '.js-a-range-input-min',
      inputMax: '.js-a-range-input-max',
      bar: '.js-a-range-bar',
      inverseBarLeft: '.js-a-range-inverse-bar-left',
      inverseBarRight: '.js-a-range-inverse-bar-right',
      thumbMin: '.js-a-range-thumb-min',
      thumbMax: '.js-a-range-thumb-max',
      valueMin: '.js-a-range-value-min',
      valueMax: '.js-a-range-value-max',
    };

    /**
     * Initializes and stores all the range elements.
     *
     * @type {Object}
     * @property {HTMLInputElement} inputMin - The minimum input range element.
     * @property {HTMLInputElement} inputMax - The maximum input range element.
     * @property {HTMLElement} bar - The range bar element.
     * @property {HTMLElement} inverseBarLeft - The left inverse bar element.
     * @property {HTMLElement} inverseBarRight - The right inverse bar element.
     * @property {HTMLElement} thumbMin - The minimum thumb element.
     * @property {HTMLElement} thumbMax - The maximum thumb element.
     * @property {HTMLElement} valueMin - The minimum value element.
     * @property {HTMLElement} valueMax - The maximum value element.
     */
    this.elements = {
      inputMin: this.el.querySelector(this.classes.inputMin),
      inputMax: this.el.querySelector(this.classes.inputMax),
      bar: this.el.querySelector(this.classes.bar),
      inverseBarLeft: this.el.querySelector(this.classes.inverseBarLeft),
      inverseBarRight: this.el.querySelector(this.classes.inverseBarRight),
      thumbMin: this.el.querySelector(this.classes.thumbMin),
      thumbMax: this.el.querySelector(this.classes.thumbMax),
      valueMin: this.el.querySelector(this.classes.valueMin),
      valueMax: this.el.querySelector(this.classes.valueMax),
    };

    if (!AeroRange.isValidElements(this.elements, this.isSingle)) return;

    this.init();
  }

  init() {
    if (!this.isSingle) this.initMinRange();
    this.initMaxRange();
    this.setListeners();
  }

  /**
   * Initializes the minimum range by setting the minimum, maximum, step, and value of the inputMin element.
   * If the inputMin element exists, it also calls the setMinThumb function.
   *
   * @return {void}
   */
  initMinRange() {
    if (this.elements.inputMin) {
      this.elements.inputMin.min = this.min;
      this.elements.inputMin.max = this.max;
      this.elements.inputMin.step = this.step;
      this.elements.inputMin.value = this.minValue;

      this.setMinThumb();
    }
  }

  /**
   * Initializes the maximum range by setting the minimum, maximum, step, and value of the inputMax element.
   * If the inputMax element exists, it also calls the setMaxThumb function.
   *
   * @return {void}
   */
  initMaxRange() {
    if (this.elements.inputMax) {
      this.elements.inputMax.min = this.min;
      this.elements.inputMax.max = this.max;
      this.elements.inputMax.step = this.step;
      this.elements.inputMax.value = this.maxValue;

      this.setMaxThumb();
    }
  }

  /**
   * Sets event listeners for the input elements. If the range is not single,
   * it listens for 'input' event on the minimum input element and calls
   * inputMinHandler when triggered. It also listens for 'input' event on the
   * maximum input element and calls inputMaxHandler when triggered.
   *
   * @return {void}
   */
  setListeners() {
    const { inputMin, inputMax } = this.elements;

    if (!this.isSingle) {
      inputMin.addEventListener('input', () => this.inputMinHandler());
    }
    inputMax.addEventListener('input', () => this.inputMaxHandler());
  }

  /**
   * Handles the input minimum value, calculates the new value based on the inputMax value,
   * updates the inputMin value, sets the minimum thumb position, and triggers the onChange event if provided.
   *
   * @return {void}
   */
  inputMinHandler() {
    const { inputMin, inputMax } = this.elements;
    let minValue = Number(inputMin.value);
    let maxValue = Number(inputMax.value);

    if (minValue > maxValue) {
      [minValue, maxValue] = [maxValue, minValue];
      inputMin.value = minValue;
      inputMax.value = maxValue;
    }

    this.setMinThumb();
    this.setMaxThumb();

    if (this.onChange) {
      this.onChange(inputMin.value, inputMax.value);
    }
  }

  /**
   * Handles the input maximum value, calculates the new value based on the single or range mode,
   * updates the inputMax value, sets the maximum thumb position, and triggers the onChange event if provided.
   *
   * @return {void}
   */
  inputMaxHandler() {
    const { inputMax, inputMin } = this.elements;

    let maxValue = Number(inputMax.value);

    if (this.isSingle) {
      let value = Math.max(inputMax.value, this.min);
      inputMax.value = value;
    } else {
      let minValue = Number(inputMin.value);

      if (maxValue < minValue) {
        [minValue, maxValue] = [maxValue, minValue];
        inputMin.value = minValue;
        inputMax.value = maxValue;
      }
      this.setMinThumb();
    }

    this.setMaxThumb();

    if (this.onChange) {
      this.onChange(this.isSingle ? this.min : inputMin.value, inputMax.value);
    }
  }

  /**
   * Sets the minimum thumb position and updates the associated elements.
   *
   * @return {void}
   */
  setMinThumb() {
    const { inputMin, inverseBarLeft, bar, thumbMin, valueMin } = this.elements;
    const percentValue = AeroRange.getPercentValue(inputMin);
    const width = percentValue > 3 ? `calc(${percentValue}% - 6px)` : `${percentValue}%`;

    inverseBarLeft.style.width = width;
    bar.style.left = width;
    thumbMin.style.left = width;

    if (this.thumbMinHandler) {
      valueMin.innerHTML = this.thumbMinHandler(inputMin.value);
    } else {
      valueMin.innerHTML = inputMin.value;
    }
  }

  /**
   * Set the maximum thumb position and update associated elements.
   *
   * @return {void}
   */
  setMaxThumb() {
    const { inputMax, inverseBarRight, bar, thumbMax, valueMax } = this.elements;
    const percentValue = AeroRange.getPercentValue(inputMax);
    const percent = 100 - percentValue;

    const width = percent > 3 ? `calc(${percent}% - 6px)` : `${percent}%`;

    inverseBarRight.style.width = width;
    bar.style.right = width;
    thumbMax.style.right = width;

    if (this.thumbMaxHandler) {
      valueMax.innerHTML = this.thumbMaxHandler(inputMax.value);
    } else {
      valueMax.innerHTML = inputMax.value;
    }
  }

  /**
   * Calculates the percentage value of the given element based on its min and max values.
   *
   * @param {HTMLInputElement} el - The HTML input element to calculate the percentage value for.
   * @return {number} The calculated percentage value.
   */
  static getPercentValue(el) {
    const value =
      (100 / (parseInt(el.max) - parseInt(el.min))) * parseInt(el.value) -
      (100 / (parseInt(el.max) - parseInt(el.min))) * parseInt(el.min);

    return Math.round(value);
  }

  /**
   * Checks if the given elements object contains all the expected keys based on the isSingle flag.
   *
   * @param {Object} elements - The object containing the elements to be checked.
   * @param {boolean} isSingle - A flag indicating if the elements object should contain single or dual keys.
   * @return {boolean} Returns true if all the expected keys are present, otherwise logs an error and returns false.
   */
  static isValidElements(elements, isSingle) {
    for (const key in elements) {
      const expectedKeys = isSingle ? ['inputMin', 'inverseBarLeft', 'thumbMin', 'valueMin'] : [];

      if (!elements[key] && !expectedKeys.includes(key)) {
        console.error(`AeroRange error: ${key} not found`);
      }
    }

    return true;
  }
}
