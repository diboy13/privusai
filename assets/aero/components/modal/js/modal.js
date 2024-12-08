class AeroModal {
  constructor (modalID, options = {}) {
    this.options = options;
    this.modalID = modalID;

    this.closeCallback = options.closeCallback || null;

    this.classes = {
      close: '.js-a-modal-close',
      backdrop: 'a-modal-backdrop',
    };

    this.statuses = {
      open: 'a-modal-open',
      show: 'show',
    }

    this.modal = document.getElementById(this.modalID);
    this.modalEventHandler = this.modalEventHandler.bind(this);
    this.modal?.addEventListener('click', this.modalEventHandler);

    this.modalCloseTriggers = this.modal?.querySelectorAll(this.classes.close);
    this.modalCloseTriggersEventHandler = this.modalCloseTriggersEventHandler.bind(this);
    this.modalCloseTriggers?.forEach((item) => {
      item.addEventListener('click', this.modalCloseTriggersEventHandler);
    })
  }

  modalEventHandler(event) {
    if (event.target === this.modal) this.closeModal();
  }

  modalCloseTriggersEventHandler() {
    this.closeModal();
  }

  removeEventListeners() {
    this.modal?.removeEventListener('click', this.modalEventHandler);

    this.modalCloseTriggers?.forEach((item) => {
      item.removeEventListener('click', this.modalCloseTriggersEventHandler);
    });
  }

  openModal() {
    if (!this.modal) return;

    this.createBackdrop();
    this.setOpen();

    setTimeout(() => {
      this.setShow();
      this.openBackdrop();
    }, 100);
  }

  closeModal() {
    if (!this.modal) return;

    this.unsetShow();
    this.closeBackdrop();

    setTimeout(() => {
      this.unsetOpen();
      this.backdropDestroy();
      this.destroy();
    }, 100);

    if (this.closeCallback) {
      this.closeCallback();
    }
  }

  setOpen() {
    const { open } = this.statuses;

    if (this.modal) {
      document.body.classList.add(open);
      this.modal.classList.add(open);
    }
  }

  unsetOpen() {
    const { open } = this.statuses;

    if (this.modal) {
      document.body.classList.remove(open);
      this.modal.classList.remove(open);
    }
  }

  setShow() {
    const { show } = this.statuses;

    if (this.modal) {
      this.modal.classList.add(show);
    }
  }

  unsetShow() {
    const { show } = this.statuses;

    if (this.modal) {
      this.modal.classList.remove(show);
    }
  }

  createBackdrop() {
    const { backdrop } = this.classes;
    const backdropElement = document.createElement('div');

    backdropElement.classList.add(backdrop);

    document.body.appendChild(backdropElement);
  }

  backdropDestroy() {
    const backdropClass = `.${this.classes.backdrop}`;
    const modalBackdrop = document.body.querySelector(backdropClass);

    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }

  openBackdrop() {
    const { show } = this.statuses;
    const backdropClass = `.${this.classes.backdrop}`;
    const modalBackdrop = document.body.querySelector(backdropClass);

    if (modalBackdrop) {
      modalBackdrop.classList.add(show);
    }
  }

  closeBackdrop() {
    const { show } = this.statuses;
    const backdropClass = `.${this.classes.backdrop}`;
    const modalBackdrop = document.body.querySelector(backdropClass);

    if (modalBackdrop) {
      modalBackdrop.classList.remove(show);
    }
  }

  destroy() {
    this.removeEventListeners();
    this.modalID = null;
    this.modal = null;
    this.options = {};
  }
}
