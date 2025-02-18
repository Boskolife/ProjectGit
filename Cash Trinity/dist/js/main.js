"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

initCurve();
initHeader();
initCustomSlider();
initChart();
initCircleBtn();
initBurgerMenu();
new WOW().init();
initPopUpApp();
initPopUpLogin();
destroySlidersOnResize(".lending_slider", 9999, {
  spaceBetween: 20,
  sliderPerView: 1,
  direction: "horizontal",
  mousewheel: {
    sensitivity: 1,
    releaseOnEdges: true
  },
  autoHeight: true,
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar"
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    768: {
      direction: "vertical",
      autoHeght: true
    }
  }
});

function initBurgerMenu() {
  var burger = document.querySelector(".burger_menu");
  var menuBody = document.querySelector(".nav");
  var linkClose = document.querySelectorAll(".link-close");

  if (burger) {
    burger.addEventListener("click", function (e) {
      document.body.classList.toggle("body_lock");
      burger.classList.toggle("burger_active");
      menuBody.classList.toggle("menu_active");
    });
  }

  if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
      linkClose[i].addEventListener("click", function (e) {
        document.body.classList.remove("body_lock");
        burger.classList.remove("burger_active");
        menuBody.classList.remove("menu_active");
      });
    }
  }
}

function destroySlidersOnResize(selector, width, obj, moreThan) {
  var init = _objectSpread({}, obj);

  var win = window;
  var sliderSelector = document.querySelector(selector);
  if (!sliderSelector) return;
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

function initCurve() {
  var curveTextWrap = document.querySelector(".curve-text-wrap");
  var simple_arc1 = document.getElementById("simple_arc1");
  var simple_arc2 = document.getElementById("simple_arc2");
  var simple_arc3 = document.getElementById("simple_arc3");
  if (!simple_arc1 || !simple_arc2 || !simple_arc3) return;
  new CircleType(simple_arc1).radius(120);
  new CircleType(simple_arc2).radius(120);
  new CircleType(simple_arc3).radius(120);
  simple_arc1.classList.add("curve-text");
  simple_arc2.classList.add("curve-text");
  simple_arc3.classList.add("curve-text");
  curveTextWrap.classList.add("active");
}

function initCustomSlider() {
  var form = document.querySelector("#investForm");
  if (!form) return;
  var sliderWrap = document.querySelector(".invest-range");
  var htmlRange = sliderWrap.querySelector('input[type="range"]');
  var slider = form.querySelector("#slider");
  var result = form.querySelector("#sliderResult");

  var formatNumber = function formatNumber(number) {
    return Number(number).toFixed();
  };

  noUiSlider.create(slider, {
    start: 5,
    connect: "lower",
    range: {
      min: 5,
      max: 2000
    },
    tooltips: {
      to: function to(num) {
        return "$ ".concat(formatNumber(num));
      }
    }
  });
  slider.noUiSlider.on("update", function (event) {
    var value = event[0];
    htmlRange.value = value;
    result.textContent = "$ ".concat(formatNumber(value));
  });
}

function initCircleBtn() {
  var circleBtn = document.querySelector(".circle_btn");
  var firstSection = document.querySelectorAll("section")[0];
  var formSection = document.querySelector(".form");
  var footer = document.querySelector("footer");
  if (!circleBtn || !firstSection) return;
  checkStickyBtn();
  document.addEventListener("scroll", checkStickyBtn);
  window.addEventListener("resize", checkStickyBtn);

  function checkStickyBtn() {
    var firstSecHeight = firstSection.offsetHeight;
    var currentScrollPosY = window.scrollY;
    var firstSectionBottomPadding = getComputedStyle(firstSection).paddingBottom.replace(/px/g, "");
    var currentScrollBottomPos = window.scrollY + window.innerHeight;
    currentScrollPosY > firstSecHeight - +firstSectionBottomPadding ? circleBtn.classList.add("sticky") : circleBtn.classList.remove("sticky");

    if (formSection) {
      var formSectionTopPos = formSection.offsetTop;
      currentScrollBottomPos >= formSectionTopPos ? circleBtn.classList.add("hidden") : circleBtn.classList.remove("hidden");
      return;
    }

    if (footer) {
      var footerTopPos = footer.offsetTop;
      var footerTopPadding = getComputedStyle(firstSection).paddingTop.replace(/px/g, "");
      currentScrollBottomPos >= footerTopPos + +footerTopPadding / 2 ? circleBtn.classList.add("hidden") : circleBtn.classList.remove("hidden");
    }
  }
}

function initHeader() {
  var header = document.querySelector("#header");

  var sections = _toConsumableArray(document.querySelectorAll(".transparent-header"));

  if (!header || !sections) return;
  checkHeaderOverlay();
  document.addEventListener("scroll", checkHeaderOverlay);
  window.addEventListener("resize", checkHeaderOverlay);

  function checkHeaderOverlay() {
    var sectionsPositions = sections.map(function (section) {
      var sectionStartPos = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionEnd = sectionStartPos + sectionHeight;
      return {
        start: sectionStartPos,
        end: sectionEnd
      };
    });
    var currentScrollPosY = window.scrollY;
    if (currentScrollPosY < 0) return;
    var isHeaderOverlaySection = sectionsPositions.find(function (pos) {
      return currentScrollPosY >= pos.start && currentScrollPosY <= pos.end - header.offsetHeight;
    });
    isHeaderOverlaySection ? header.classList.add("transparent") : header.classList.remove("transparent");
  }
}

function initChart() {
  var chartContainer = document.querySelector("#chart");
  if (!chartContainer) return;
  var onlyDigitsRgx = /^\d+$/;
  var MAX_YEARS = 50;
  var MIN_YEARS = 1;
  var investmentInput = document.querySelector("#investmentInput");
  investmentInput.value = "500$";
  var onceRadio = document.querySelector("#onceRadio");
  var weeklyRadio = document.querySelector("#weeklyRadio");
  var monthlyRadio = document.querySelector("#monthlyRadio");
  var annuallyRadio = document.querySelector("#annuallyRadio");
  var timeInvest = 1;
  var isOnceChecked = true;
  var isAnnually = false;
  var RATE = 0.13;
  var numberOfYearsInput = document.querySelector("#numberOfYearsInput");
  numberOfYearsInput.value = "15 years";
  var investedRes = document.querySelectorAll(".investedRes");
  var interestedRes = document.querySelectorAll(".interestedRes");
  var savingsRes = document.querySelectorAll(".savingsRes");
  var investmentInputValue = "500";
  var numberOfYearsInputValue = "15";

  var calcTotalInvested = function calcTotalInvested(originalInvest, timeInvest) {
    if (isOnceChecked) {
      return +originalInvest * +timeInvest;
    }

    if (!isAnnually) {
      return +originalInvest * (+timeInvest * +numberOfYearsInputValue);
    }

    return +originalInvest * +numberOfYearsInputValue;
  };

  investmentInput.addEventListener("input", function (event) {
    var value = event.target.value;

    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      investedRes.forEach(function (el) {
        return el.textContent = "$0";
      });
      return;
    }

    investmentInputValue = value;
    draw();
  });
  investmentInput.addEventListener("blur", function (event) {
    if (event.target.value.includes("$")) return;
    event.target.value = "".concat(event.target.value || 500, "$");
  });
  investmentInput.addEventListener("click", function () {
    investmentInput.select();
  });
  numberOfYearsInput.addEventListener("input", function (event) {
    var value = event.target.value;

    if (!onlyDigitsRgx.test(value)) {
      event.target.value = "";
      return;
    }
  });
  numberOfYearsInput.addEventListener("click", function () {
    numberOfYearsInput.select();
  });
  numberOfYearsInput.addEventListener("blur", function (event) {
    var value = event.target.value || "15";
    if (value.includes("year")) return;

    if (+value > MAX_YEARS) {
      event.target.value = MAX_YEARS;
      numberOfYearsInputValue = MAX_YEARS;
    }

    if (+value < MIN_YEARS) {
      event.target.value = MIN_YEARS;
      numberOfYearsInputValue = MIN_YEARS;
    }

    numberOfYearsInputValue = event.target.value || value;
    event.target.value = "".concat(numberOfYearsInputValue, " ").concat(+numberOfYearsInputValue > 1 ? "years" : "year");
    draw();
  });
  document.addEventListener("click", function (event) {
    switch (event.target) {
      case onceRadio:
        timeInvest = 1;
        isOnceChecked = true;
        isAnnually = false;
        draw();
        break;

      case weeklyRadio:
        timeInvest = 52;
        isOnceChecked = false;
        isAnnually = false;
        draw();
        break;

      case monthlyRadio:
        timeInvest = 12;
        isOnceChecked = false;
        isAnnually = false;
        draw();
        break;

      case annuallyRadio:
        timeInvest = 1;
        isOnceChecked = false;
        isAnnually = true;
        draw();
        break;

      default:
        break;
    }
  });
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0 // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)

  });

  var calculateFormula = function calculateFormula(originalInvest, rate, numberOfTimes, numberOfYears) {
    var onceFormula = +originalInvest * Math.pow(1 + rate / numberOfTimes, numberOfTimes * numberOfYears);
    var res = numberOfTimes === 1 && isOnceChecked ? onceFormula : onceFormula + +originalInvest * (Math.pow(1 + rate / numberOfTimes, numberOfTimes * numberOfYears) - 1) / (rate / numberOfTimes);
    return +res.toFixed();
  };

  draw();

  function draw() {
    var interest = new Array(+numberOfYearsInputValue + 1).fill(0).map(function (_, ind) {
      if (!ind) return +investmentInputValue;
      return calculateFormula(investmentInputValue, RATE, timeInvest, ind);
    });
    investmentInputValue ? investedRes.forEach(function (el) {
      return el.textContent = formatter.format(calcTotalInvested(investmentInputValue, timeInvest));
    }) : investedRes.forEach(function (el) {
      return el.textContent = "$0";
    });
    interest.length > 1 ? savingsRes.forEach(function (el) {
      return el.textContent = formatter.format(interest.at(-1));
    }) : savingsRes.forEach(function (el) {
      return el.textContent = "$0";
    });
    interest.length > 1 ? interestedRes.forEach(function (el) {
      var totalInvested = calcTotalInvested(investmentInputValue, timeInvest);
      var result = interest.at(-1) - +totalInvested;
      el.textContent = formatter.format(result);
    }) : interestedRes.forEach(function (el) {
      return el.textContent = "$0";
    });
    new Highcharts.Chart({
      chart: {
        renderTo: "chart",
        type: "column",
        height: 365,
        backgroundColor: "#F8F9FB",
        spacing: [20, 20, 15, 10]
      },
      colors: ["#3772FF", "#4C7DF8", "#0146F5", "#BDF0F4", "#42BFC7", "#1F1247"],
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      xAxis: {
        min: 1,
        title: {
          text: "Years",
          style: {
            color: "#777E90"
          }
        }
      },
      yAxis: {
        title: {
          text: "Balance",
          style: {
            color: "#777E90"
          }
        }
      },
      plotOptions: {
        column: {
          stacking: "normal",
          borderRadius: 4,
          dataLabels: {
            enabled: false
          }
        },
        series: {
          borderWidth: 0,
          shadow: false,
          groupPadding: 0.1,
          pointPadding: 0.05
        }
      },
      tooltip: {
        enabled: false
      },
      series: [{
        name: "Interest",
        data: interest,
        stack: "original",
        legendIndex: 3
      }]
    });
  }
} //Setting Active States on Sticky Navigations while Scrolling


var sections = $("section"),
    nav = $("nav"),
    nav_height = nav.outerHeight();
$(window).on("scroll", function () {
  var cur_pos = $(this).scrollTop();
  sections.each(function () {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find("a").removeClass("active");
      sections.removeClass("active");
      $(this).addClass("active");
      nav.find('a[href="index.html#' + $(this).attr("id") + '"]').addClass("active");
      $(this).addClass("active");
      nav.find('a[href="calculator.html#' + $(this).attr("id") + '"]').addClass("active");
    }
  });
});
nav.find("a").on("click", function () {
  var $el = $(this),
      id = $el.attr("href");
  $("html, body").animate({
    scrollTop: $(id).offset().top - nav_height
  }, 500);
  return false;
});

function initPopUpLogin() {
  var openPopUp = document.getElementById("open_popup");
  var closePopUp = document.getElementById("close_popup");
  var popUp = document.getElementById("popup");
  var linkClose = document.querySelectorAll(".link-close");

  if (openPopUp) {
    openPopUp.addEventListener("click", function (e) {
      document.body.classList.toggle("body_lock_app");
    });
  }

  if (closePopUp) {
    closePopUp.addEventListener("click", function (e) {
      document.body.classList.remove("body_lock_app");
    });
  }

  openPopUp.addEventListener("click", function (e) {
    e.preventDefault();
    popUp.classList.add("active_popup");
  });
  closePopUp.addEventListener("click", function () {
    popUp.classList.remove("active_popup");
  });

  if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
      linkClose[i].addEventListener("click", function (e) {
        document.body.classList.remove("body_lock_app");
        popUp.classList.remove("active_popup");
      });
    }
  }
}

function initPopUpApp() {
  var openPopUp_app = document.getElementById("open_popup_app");
  var closePopUp_app = document.getElementById("close_popup_app");
  var popUp_app = document.getElementById("popup_app");
  var linkClose = document.querySelectorAll(".link-close");
  if (!openPopUp_app) return;

  if (openPopUp_app) {
    openPopUp_app.addEventListener("click", function (e) {
      document.body.classList.toggle("body_lock_app");
    });
  }

  if (closePopUp_app) {
    closePopUp_app.addEventListener("click", function (e) {
      document.body.classList.remove("body_lock_app");
    });
  }

  openPopUp_app === null || openPopUp_app === void 0 ? void 0 : openPopUp_app.addEventListener("click", function (e) {
    e.preventDefault();
    popUp_app.classList.add("active_popup_app");
  });
  closePopUp_app === null || closePopUp_app === void 0 ? void 0 : closePopUp_app.addEventListener("click", function () {
    popUp_app.classList.remove("active_popup_app");
  });

  if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
      linkClose[i].addEventListener("click", function (e) {
        document.body.classList.remove("body_lock_app");
        popUp_app.classList.remove("active_popup");
      });
    }
  }
}

var Confettiful = function Confettiful(el) {
  this.el = el;
  this.containerEl = null;
  this.confettiFrequency = 3;
  this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
  this.confettiAnimations = ['slow', 'medium', 'fast'];

  this._setupElements();

  this._renderConfetti();
};

Confettiful.prototype._setupElements = function () {
  var containerEl = document.createElement('div');
  var elPosition = this.el.style.position;

  if (elPosition !== 'relative' || elPosition !== 'absolute') {
    this.el.style.position = 'relative';
  }

  containerEl.classList.add('confetti-container');
  this.el.appendChild(containerEl);
  this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function () {
  var _this = this;

  this.confettiInterval = setInterval(function () {
    var confettiEl = document.createElement('div');
    var confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';

    var confettiBackground = _this.confettiColors[Math.floor(Math.random() * _this.confettiColors.length)];

    var confettiLeft = Math.floor(Math.random() * _this.el.offsetWidth) + 'px';

    var confettiAnimation = _this.confettiAnimations[Math.floor(Math.random() * _this.confettiAnimations.length)];

    confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;
    confettiEl.removeTimeout = setTimeout(function () {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 5000);

    _this.containerEl.appendChild(confettiEl);
  }, 3);
};

window.confettiful = new Confettiful(document.querySelector('.accept'));
setTimeout(function () {
  clearInterval(window.confettiful.confettiInterval);
}, 3500);
//# sourceMappingURL=main.js.map
