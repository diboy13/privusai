class AeroTags {
  constructor(el) {
    this.el = el;

    this.classes = {
      btn: '.js-a-tags-btn',
      list: '.js-a-tags-list',
      item: '.js-a-tags-item',
      open: 'a-tags--open',
      visible: 'a-tags__btn--visible',
    }

    this.elements = {
      btns: this.el.querySelectorAll(this.classes.btn),
      list: this.el.querySelector(this.classes.list),
      items: this.el.querySelectorAll(this.classes.item),
    }

    this.options = {
      fixedCount: this.el.getAttribute('data-fixed-count'),
    }

    this.init();
  }

  init() {
    this.setListeners();
    this.initButtons();
  }

  initButtons() {
    const count = this.options.fixedCount;
    const itemsCount = this.elements.items.length;

    if (itemsCount > count) {
      this.elements.btns.forEach((btn) => {
        btn.classList.add(this.classes.visible);
      });
    }
  }

  setListeners() {
    this.elements.btns.forEach((btn) => {
      btn.addEventListener('click', () => this.toggle());
    });
  }

  toggle() {
    this.el.classList.toggle(this.classes.open);
  }
}
