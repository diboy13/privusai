/**
 * AeroModalAlert is a class for creating and managing modal alert dialogs.
 * It is necessary to pass only the id of an empty container to add an alert there.
 * By default, an error alert with an "OK" button will be created.
 *
 * You can directly create and manage modals by instantiating this class, or use the helper function `aero_alert`
 * for simplified usage. The helper allows you to initialize and open a modal with one line of code.
 *
 * @example
 * // Using the class directly:
 * const alert = new AeroModalAlert('modal-container', {
 *   variant: 'success',
 *   text: 'Operation completed successfully!',
 *   buttonText: 'OK',
 * });
 * alert.openModal();
 *
 * @example
 * // Using the aero_modal_alert helper function (recommended for simple use cases):
 * aero_modal_alert('modal-container', {
 *   variant: 'success',
 *   text: 'Operation completed successfully!',
 *   buttonText: 'OK'
 * });
 */
class AeroModalAlert {

  /**
   * @param {string} modalID - The ID of the container for the modal element in the DOM.
   * @param {Object} [options={}] - Configuration options for the modal.
   * @param {('error'|'success')} [options.variant='error'] - The variant of the modal, can be 'error' or 'success'.
   * @param {string} [options.text=''] - The text content of the modal. If no text is provided and the variant is 'error', a default error message is used.
   * @param {string} [options.buttonText='OK'] - The text displayed on the modal's button.
   * @param {boolean} [options.isShowButton=true] - A flag to control whether the modal button is displayed.
   * @param {function} [options.closeCallback=null] - A callback function to be invoked when the modal is closed.
   */
  constructor (modalID, options= {}) {
    this.modalID = modalID;
    this.options = options;
    this.variant = options.variant ?? 'error';
    this.text = options.text ?? (this.variant === 'error' ? `Something went wrong.<br>Try again later` : '');
    this.buttonText = options.buttonText ?? 'OK';
    this.isShowButton = options.isShowButton ?? true;
    this.closeCallback = options.closeCallback ?? null;

    this.classes = {
      close: 'js-a-alert-close',
      backdrop: 'a-alert-backdrop',
      root: 'a-alert-wrapper',
      contentWrapper: 'a-alert-dialog',
      content: 'a-alert-content',
      header: 'a-alert-header',
      closeWrapper: 'a-alert-close',
      body: 'a-alert-body',
      title: 'a-alert-title',
      footer: 'a-alert-footer'
    };

    this.statuses = {
      open: 'a-alert-open',
      show: 'show',
    }

    this.modal = document.getElementById(this.modalID);
    this.modalEventHandler = this.modalEventHandler.bind(this);
    this.modal?.addEventListener('click', this.modalEventHandler);

    this.renderModalContent();

    this.modalCloseTriggers = this.modal?.querySelectorAll(`.${this.classes.close}`);
    this.modalCloseTriggersEventHandler = this.modalCloseTriggersEventHandler.bind(this);
    this.modalCloseTriggers?.forEach((item) => {
      item.addEventListener('click', this.modalCloseTriggersEventHandler);
    })
  }

  renderModalContent() {
    const {root, contentWrapper, content, header, close, closeWrapper, body, title, footer} = this.classes;
    if (!this.modal) return;
    this.modal.innerHTML = '';

    this.modal.className = root;
    this.modal.tabIndex = -1;
    this.modal.role = "dialog";
    const wrapper = document.createElement('div');
    wrapper.className = contentWrapper;
    wrapper.role = "document";

    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="1.333"
                                      d="m4.459 4.957 7.543 7.542m0 0 7.542 7.543M12 12.499l7.543-7.542M12 12.499 4.46 20.043" />
                              </svg>`
    const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                                <path
                                  d="M43 8.34973C46.7707 10.5269 49.9074 13.651 52.0995 17.413C54.2917 21.1749 55.4634 25.4442 55.4986 29.7981C55.5337 34.152 54.4312 38.4396 52.3 42.2365C50.1689 46.0333 47.0831 49.2078 43.3481 51.4455C39.6131 53.6833 35.3584 54.9068 31.0052 54.9949C26.6521 55.083 22.3514 54.0327 18.5289 51.9478C14.7064 49.863 11.4947 46.816 9.21167 43.1085C6.92866 39.401 5.65352 35.1615 5.5125 30.8097L5.5 29.9997L5.5125 29.1897C5.65251 24.8722 6.90887 20.6646 9.1591 16.9772C11.4093 13.2898 14.5766 10.2484 18.3522 8.14944C22.1278 6.05051 26.3829 4.96572 30.7025 5.00083C35.0222 5.03593 39.259 6.18973 43 8.34973ZM26.7775 22.8497C26.2537 22.5379 25.634 22.4282 25.035 22.5413C24.436 22.6544 23.899 22.9824 23.5249 23.4637C23.1508 23.945 22.9654 24.5464 23.0037 25.1547C23.0419 25.7631 23.3011 26.3366 23.7325 26.7672L26.9625 29.9997L23.7325 33.2322L23.525 33.4672C23.1365 33.9697 22.9538 34.6012 23.014 35.2335C23.0742 35.8659 23.3729 36.4515 23.8493 36.8716C24.3257 37.2917 24.9442 37.5147 25.579 37.4953C26.2139 37.4759 26.8176 37.2156 27.2675 36.7672L30.5 33.5372L33.7325 36.7672L33.9675 36.9747C34.47 37.3633 35.1015 37.546 35.7338 37.4857C36.3661 37.4255 36.9518 37.1268 37.3719 36.6504C37.792 36.174 38.015 35.5556 37.9956 34.9207C37.9762 34.2858 37.7159 33.6821 37.2675 33.2322L34.0375 29.9997L37.2675 26.7672L37.475 26.5322C37.8635 26.0298 38.0462 25.3982 37.986 24.7659C37.9258 24.1336 37.6271 23.5479 37.1507 23.1279C36.6743 22.7078 36.0558 22.4848 35.421 22.5042C34.7861 22.5235 34.1824 22.7839 33.7325 23.2322L30.5 26.4622L27.2675 23.2322L27.0325 23.0247L26.7775 22.8497Z"
                                  fill="#FF2323" />
                              </svg>`
    const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                                  <path
                                    d="M43 8.34973C46.7707 10.5269 49.9074 13.651 52.0995 17.413C54.2917 21.1749 55.4634 25.4442 55.4986 29.7981C55.5337 34.152 54.4312 38.4396 52.3 42.2365C50.1689 46.0333 47.0831 49.2078 43.3481 51.4455C39.6131 53.6833 35.3584 54.9068 31.0052 54.9949C26.6521 55.083 22.3514 54.0326 18.5289 51.9478C14.7064 49.863 11.4947 46.816 9.21167 43.1085C6.92866 39.401 5.65352 35.1615 5.5125 30.8097L5.5 29.9997L5.5125 29.1897C5.65251 24.8722 6.90887 20.6646 9.1591 16.9772C11.4093 13.2898 14.5766 10.2484 18.3522 8.14944C22.1278 6.05051 26.3829 4.96572 30.7025 5.00083C35.0222 5.03593 39.259 6.18973 43 8.34973ZM39.7675 23.2322C39.337 22.8018 38.7643 22.5432 38.1567 22.505C37.5491 22.4668 36.9485 22.6516 36.4675 23.0247L36.2325 23.2322L28 31.4622L24.7675 28.2322L24.5325 28.0247C24.0515 27.6519 23.4509 27.4673 22.8435 27.5056C22.2361 27.5439 21.6635 27.8025 21.2332 28.2329C20.8028 28.6632 20.5442 29.2358 20.5059 29.8432C20.4676 30.4507 20.6521 31.0512 21.025 31.5322L21.2325 31.7672L26.2325 36.7672L26.4675 36.9747C26.9059 37.3149 27.4451 37.4995 28 37.4995C28.5549 37.4995 29.0941 37.3149 29.5325 36.9747L29.7675 36.7672L39.7675 26.7672L39.975 26.5322C40.3481 26.0512 40.5329 25.4506 40.4947 24.843C40.4565 24.2355 40.1979 23.6627 39.7675 23.2322Z"
                                    fill="#46CA93" />
                                </svg>`

    wrapper.innerHTML = `
        <div class=${content}>
          <div class=${header}>
            <button type="button" class="${close} ${closeWrapper}" aria-label="Close">
                        <span aria-hidden="true">
                            ${closeIcon}
                        </span>
              </button>
          </div>
          <div class=${body}>
            ${this.variant === 'error' ? errorIcon : successIcon}
            <h3 class=${title}>
             ${this.variant === 'error' ? 'Uh oh...' : 'Successful'}
            </h3>
            ${this.text.length ? `<p>${this.text}</p>` : ''}
          </div>
          ${this.isShowButton ? `<div class="${footer} ${close}">
            <button class="aero-btn-primary">${this.buttonText}</button>
          </div>` : ''}
        </div>
    `;
    this.modal.appendChild(wrapper);
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
