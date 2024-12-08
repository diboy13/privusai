document.addEventListener('DOMContentLoaded', function () {
  for (const closeModalButton of document.getElementsByClassName('aero-modal-close')) {
    closeModalButton.onclick = function () {
      close_modals();
    };
  }
});

function close_modals() {
  const modals = document.getElementsByClassName('aero-modal');
  body_scroll_toggle();
  for (const modal of modals) {
    modal.classList.remove('opened');
  }
}

function body_scroll_toggle() {
  if (document.body.style.overflowY === 'hidden') {
    document.body.style.overflowY = 'auto';
  } else {
    document.body.style.overflowY = 'hidden';
  }
}

function modal_class_toggle(modal) {
  modal.classList.toggle('opened');
}

function open_menu_modal() {
  const id =
    location.hash === '#myservers'
      ? `mt-ms`
      : location.hash === '#myorders'
        ? `mt-mo`
        : location.hash.includes('#chat')
          ? `mt-ch`
          : location.hash === '#proof-of-holding'
            ? `mt-poh`
            : `mt-mt`;
  const modalMenuItem = document.querySelectorAll(`span[id^='${id} ']`)[0];

  if (modalMenuItem) modalMenuItem.classList.add('mt-selected');

  body_scroll_toggle();
  modal_class_toggle(document.getElementById('menu-modal'));
}

function open_filters_modal() {
  body_scroll_toggle();
  modal_class_toggle(document.getElementById('filters-modal'));
}
