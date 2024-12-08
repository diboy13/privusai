var iiii = setInterval(function () {
  try {
    if (
      ($(".navbar-nav").html() || $(".nav__login-wrapper").html()) &&
      getCookie &&
      setCookie
    ) {
      // jquery loaded
      let search_obj = {};

      if (location.search.includes("?")) {
        let cs = location.search.replace(/\?/, "").split("&");
        for (var i = 0; i < cs.length; i++) {
          search_obj[cs[i].split("=")[0]] = cs[i].split("=")[1];
        }
      }

      let has_search_obj =
        (search_obj["ref_id"] ? search_obj["ref_id"] : "").length == 8;
      let vs = has_search_obj ? search_obj["ref_id"] : false;
      let v2_design_login = false;

      if (getCookie("clore_token") && !vs) {
        if ($(".navbar-nav").html())
          $(".navbar-nav").html(`
            <li class="nav-item"><a class="nav-link link text-primary display-5" href="/marketplace">Marketplace <i class="fa-solid fa-store top-icon-pos"></i></a></li>
            <li class="nav-item"><a class="nav-link link text-primary display-5" href="/account">Account <i class="fa-regular fa-user top-icon-pos"></i></a></li>
            <li class="nav-item"><a class="nav-link link text-primary display-5" href="#" aria-expanded="false" onclick=\"logout(true)\">Log Out <i class="fa-solid fa-right-from-bracket top-icon-pos"></i></a></li>
          `);

        v2_design_login = true;
      } else if (vs) {
        setCookie("ref-id", vs, 60);

        location.href = location.href.split("?")[0];
      }

      if (v2_design_login && $(".nav__login-wrapper").html()) {
        $(".nav__login-wrapper").html(`
          <a class="info-user__main" href="/account">
            <img src="../../images/icon/icon-user.svg" alt="icon">
          </a>
          <a class="logaut-btn" onclick="logout(true)" href="#">
            <img src="../../images/icon/logaut.svg" alt="icon">
          </a>
          <button class="burger-btn">
            <img class="burger-btn__icon" src="../../images/burger-icon.svg" alt="icon">
          </button>`);

        listen_burger();

        $(`.nav__login-btn`).attr(
          "href",
          v2_design_login ? "/account" : "/login"
        );

        clearInterval(iiii);
      } else if ($(".nav__login-wrapper").html()) {
        $(".nav__login-wrapper").html(`
          <a class="nav__login-btn" href="/login">
            <img class="nav__login-wrapper-icon" src="../../images/login-icon.svg" alt="icon">
            Log in
          </a>
          <button class="burger-btn">
            <img class="burger-btn__icon" src="../../images/burger-icon.svg" alt="icon">
          </button>`);
        $(`.nav__login-btn`).attr(
          "href",
          v2_design_login ? "/account" : "/login"
        );
        $(`.nav__login-btn`).html(
          v2_design_login
            ? `<img class="nav__login-wrapper-icon" src="../../images/login-icon.svg" alt="icon"> Account`
            : `<img class="nav__login-wrapper-icon" src="../../images/login-icon.svg" alt="icon">Log in`
        );
        listen_burger();
      }
      //beautiful_alert("#ak-alert",`You have reached maximum key limit, user can have maximally 3 keys.`,"success")
      clearInterval(iiii);
    }
  } catch (e) {
    console.error(e);
  }
}, 10);

var last_burger_state = 0;

function listen_burger() {
  try {
    const burgerBtn = document.querySelectorAll(".burger-btn");
    const burgerMenu = document.querySelectorAll(".burger-menu");

    burgerBtn.forEach((item) => {
      item.addEventListener("click", () => {
        burgerMenu.forEach((menu) => {
          if (last_burger_state == 1) {
            menu.classList.remove("burger-menu-active");
          } else {
            console.log("A");
            menu.classList.add("burger-menu-active");
          }
        });
        last_burger_state++;
        if (last_burger_state > 1) last_burger_state = 0;
      });
    });
  } catch (e) {}
}

function beautiful_alert(obj, html, type, margin_bottom, close_mark = true) {
  $(obj).html(`<div ${
    margin_bottom
      ? margin_bottom < 0
        ? `style="margin-top:${Math.abs(margin_bottom)}px" `
        : `style="margin-bottom:${margin_bottom}px" `
      : ""
  }class="ba-fd${type == "success" ? ` ba-green` : ""}">
        <div class="ba-td">
            <span>${html}</span>
        </div>
        ${
          close_mark
            ? `<div class="ba-close">
            <i onclick="clear_beautiful_alert('${obj}')" class="fa-solid fa-xmark"></i>
        </div>`
            : ""
        }
    </div>`);
}

function clear_beautiful_alert(obj) {
  $(obj).html("");
}

/**
 * Creates an alert element and appends it to the given object.
 * @param {string} obj - A CSS selector for the element to append the alert to.
 * @param {string} txt - The text to display in the alert.
 * @param {string} type - The type of the alert. Can be either "danger" or "success".
 * @param {number} timeoutMs - The time in milliseconds to display the alert for.
 * @returns {void}
 */
function aero_alert(obj, txt, type, timeoutMs = 3000) {
  const iconDanger =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7h.009M12 17v-6h-1m10 1a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>';
  const iconSuccess =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m8 12 3 3 5-6m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>';
  const container = document.querySelector(obj);
  const alert = document.createElement("div");
  const icon = document.createElement("div");
  const text = document.createElement("div");

  alert.classList.add("a-alert");
  icon.classList.add("a-alert-icon");
  text.classList.add("a-alert-text");

  if (container) {
    if (type == "danger") {
      icon.innerHTML = iconDanger;
      alert.classList.add("a-alert-danger");
    }

    if (type == "success") {
      icon.innerHTML = iconSuccess;
      alert.classList.add("a-alert-success");
    }

    text.innerHTML = txt;

    alert.appendChild(icon);
    alert.appendChild(text);

    container.innerHTML = "";
    container.appendChild(alert);

    setTimeout(() => {
      container.removeChild(alert);
    }, timeoutMs);
  }
}

function hide_show_field(obj) {
  let btn_obj = $(`${obj} .sh-btn-parent`),
    input_obj = $(`${obj} #docker-password`);
  let hide = btn_obj.html().includes("-slash");
  btn_obj.html(
    hide
      ? btn_obj.html().replace(/fa-eye-slash/g, `fa-eye`)
      : btn_obj.html().replace(/fa-eye/g, "fa-eye-slash")
  );
  input_obj.attr("type", hide ? "text" : "password");
}

function hide_show_field_v2(obj) {
  let btn_obj = $(`.v2-eye-btn-parent`),
    input_obj = $(`#docker-password`);
  let hide = btn_obj.html().includes("-slash");
  btn_obj.html(
    hide
      ? btn_obj.html().replace(/fa-eye-slash/g, `fa-eye`)
      : btn_obj.html().replace(/fa-eye/g, "fa-eye-slash")
  );
  input_obj.attr("type", hide ? "text" : "password");
}

function hide_show_password(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const eye_button = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    eye_button?.classList.add("open");
  } else {
    input.type = "password";
    eye_button?.classList.remove("open");
  }
}

function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall;

    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
}

/**
 * Creates a new HTML element with the given tag name and class names.
 *
 * @param {string} tag The tag name for the element.
 * @param {string|string[]} classList The class name(s) to add to the element.
 * @returns {Element} The newly created element.
 */
function createElement(tag, classList) {
  const element = document.createElement(tag);

  element.classList.add(...classList);

  return element;
}

/**
 * Copy value to clipboard and change the button style for 2 seconds (optional).
 *
 * @param {string} value to copy.
 * @param {string|undefined} icon_selector by button to change style.
 * @param new_icon_class {string|undefined} new_icon_class for change button's style.
 */
function copyText(value, icon_selector = "", new_icon_class = "") {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  if (navigator.userAgent.match(/ipad|iphone/i)) {
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }

  try {
    navigator.clipboard.writeText(value);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);

  if (icon_selector && new_icon_class) {
    const svgIcon = $(`${icon_selector}`);
    svgIcon.addClass(`${new_icon_class}`);

    setTimeout(() => {
      svgIcon.removeClass(`${new_icon_class}`);
    }, 2000);
  }
}

/**
 * Fix number to 2 fraction (optional). Don't fix integers.
 *
 * @param {number} value to fixed.
 * @param {number|undefined} fractionDigits how long to fix.
 * @returns {number} fixed number.
 */
function toFixed(value, fractionDigits = 2) {
  return value % 1 === 0 ? value : value.toFixed(fractionDigits);
}

function reloadPage() {
  window.location.reload();
}

/**
 * Helper function to initialize and open an AeroModalAlert.
 * This function creates an instance of AeroModalAlert and immediately opens the modal.
 * It allows for customizable alert dialogs, with options.
 *
 * By default, if no options are provided, an error modal with an "OK" button will be displayed.
 *
 * @param {string} id - The ID of the container for the modal element in the DOM.
 * @param {Object} [options={}] - Configuration options for the modal.
 * @param {('error'|'success')} [options.variant='error'] - The variant of the modal, can be either 'error' or 'success'.
 * @param {string} [options.text=''] - The text content of the modal. If no text is provided and the variant is 'error', a default error message is used.
 * @param {string} [options.buttonText='OK'] - The text displayed on the modal's button.
 * @param {boolean} [options.isShowButton=true] - A flag to control whether the modal button is displayed.
 * @param {function} [options.closeCallback=null] - A callback function that will be invoked when the modal is closed.
 *
 * @example
 * // Default error modal with an "OK" button
 * aero_modal_alert('modal-container');
 *
 * @example
 * // Success modal with custom text and button
 * aero_modal_alert('modal-container', {
 *   variant: 'success',
 *   text: 'Action completed successfully!',
 *   buttonText: 'Continue'
 * });
 */
function aero_modal_alert(id, options = {}) {
  const alert = new AeroModalAlert(id, options);
  alert.openModal();
}

function onPressEnter(event, options = {}) {
  const { callback } = options;

  if (event.key === "Enter" || event.key === "13") {
    event.preventDefault();

    if (callback) callback();
  }
}
