"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Swiper:
function destroySlidersOnResize(selector, width, obj, moreThan) {
  var init = _objectSpread({}, obj);

  var win = window;
  var sliderSelector = document.querySelector(selector);
  var swiper = new Swiper(selector, init);

  var toggleInit = function toggleInit() {
    var neededWidth = moreThan ? win.innerWidth >= width : win.innerWidth <= width;

    if (neededWidth) {
      if (!sliderSelector.classList.contains("swiper-initialized")) {
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach(function (evt) {
    return win.addEventListener(evt, toggleInit, false);
  });
}

destroySlidersOnResize(".me-slider", 99999, {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  speed: 1000
});
destroySlidersOnResize(".awards-slider", 99999, {
  spaceBetween: 10,
  slidesPerView: 4,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  speed: 1000,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    550: {
      slidesPerView: 2
    },
    760: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  }
});
destroySlidersOnResize(".team-slider", 99999, {
  spaceBetween: 40,
  wotchOverflow: true,
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    500: {
      slidesPerView: 2
    },
    850: {
      slidesPerView: 3
    }
  }
});
destroySlidersOnResize(".board-slider", 99999, {
  spaceBetween: 40,
  wotchOverflow: true,
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    500: {
      slidesPerView: 2
    },
    850: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }
});
var textBoolets = document.querySelectorAll('[data-name]');
destroySlidersOnResize(".contact-slider", 99999, {
  spaceBetween: 40,
  autoHeight: true,
  allowTouchMove: false,
  speed: 1000,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function renderBullet(index, className) {
      return '<span class="' + className + '">' + textBoolets[index].getAttribute('data-name') + '</span>';
    }
  }
});
/* header */

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    var targetElement = e.target;

    if (window.innerWidth < 1024) {
      if (targetElement.classList.contains('arrow')) {
        targetElement.closest('.menu-item').classList.toggle('menu-item_active');
      }
    }
  }
};

var burger = document.querySelector(".burger");

if (burger) {
  burgerOutsideClick();
  burger.addEventListener("click", openMenu);
}

;

function openMenu(e) {
  document.body.classList.toggle("body_lock");
  document.body.classList.toggle("active");
  menuBody.classList.toggle("menu_active");
}

function closeMenu(e) {
  document.body.classList.remove("body_lock");
  document.body.classList.remove("active");
  menuBody.classList.remove("menu_active");
}

function burgerOutsideClick() {
  var backdrop = document.querySelector('.backdrop');
  backdrop.addEventListener('click', closeMenu);
}
/* about popup */


var reviewsBlock = document.querySelectorAll(".cart-wrap");
reviewsBlock.forEach(function (review) {
  var btnOpen = review.querySelector('.rev-open');
  var btnClose = review.querySelector('.rev-close');
  var backdropPopUp = review.querySelector('.backdrop-pop-up');

  if (btnOpen) {
    btnOpen.addEventListener('click', function () {
      review.classList.add("active_review");
      document.body.classList.add("body_lock");
    });
    btnClose.addEventListener('click', function () {
      review.classList.remove("active_review");
      document.body.classList.remove("body_lock");
    });
    backdropPopUp.addEventListener('click', function () {
      review.classList.remove("active_review");
      document.body.classList.remove("body_lock");
    });
  }
});
var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");

  if (!expanded) {
    checkboxes.classList.add("active");
    expanded = true;
  } else {
    checkboxes.classList.remove("active");
    expanded = false;
  }
}
//# sourceMappingURL=main.js.map
