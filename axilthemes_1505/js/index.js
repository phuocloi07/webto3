$(".list-post-slider").slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  adaptiveHeight: true,
  accessibility: true,
  prevArrow: '<div class="prev slick_arrow"></div>',
  nextArrow: '<div class="next slick_arrow"></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
});

$(".list-topic").slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 6,
  adaptiveHeight: true,
  accessibility: true,
  prevArrow: '<div class="prev slick_arrow"></div>',
  nextArrow: '<div class="next slick_arrow"></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
});

// Kiểm tra kích thước cửa sổ trình duyệt
function isMobileViewport() {
  return window.innerWidth < 1024;
}

// Khởi chạy Slick chỉ trên thiết bị di động
if (isMobileViewport()) {
}

// menu
(function ($) {
  $.fn.menumaker = function (options) {
    var mainmn = $(this),
      settings = $.extend(
        {
          format: "dropdown",
          sticky: false,
        },
        options
      );
    return this.each(function () {
      $(this)
        .find(".button")
        .on("click", function () {
          $(this).toggleClass("menu-opened");
          var mainmenu = $(this).next("ul");
          if (mainmenu.hasClass("open")) {
            mainmenu.slideToggle().removeClass("open");
          } else {
            mainmenu.slideToggle().addClass("open");
            if (settings.format === "dropdown") {
              mainmenu.find("ul").show();
            }
          }
        });
      mainmn.find("li ul").parent().addClass("has-sub");
      multiTg = function () {
        mainmn.find(".has-sub").prepend('<span class="submenu-button"></span>');
        mainmn.find(".submenu-button").on("click", function () {
          $(this).toggleClass("submenu-opened");
          if ($(this).siblings("ul").hasClass("open")) {
            $(this).siblings("ul").removeClass("open").slideToggle();
          } else {
            $(this).siblings("ul").addClass("open").slideToggle();
          }
        });
      };
      if (settings.format === "multitoggle") multiTg();
      else mainmn.addClass("dropdown");
      if (settings.sticky === true) mainmn.css("position", "fixed");
      resizeFix = function () {
        var mediasize = 1000;
        if ($(window).width() > mediasize) {
          mainmn.find("ul").show();
        }
        if ($(window).width() <= mediasize) {
          mainmn.find("ul").hide().removeClass("open");
        }
      };
      resizeFix();
      return $(window).on("resize", resizeFix);
    });
  };
})(jQuery);
(function ($) {
  $(document).ready(function () {
    $("#main-menu").menumaker({
      format: "multitoggle",
    });
  });
})(jQuery);

jQuery.noConflict();
jQuery(document).ready(function ($) {
  $(".menu-cas-toggler").click(function () {
    $("body").toggleClass("no_scroll");
  });
});
jQuery.noConflict();
jQuery(document).ready(function ($) {
  $(function () {
    initDropDowns($("#menu-cas"));
  });
  function initDropDowns(allMenus) {
    allMenus.children(".menu-cas-toggler").on("click", function () {
      var thisTrigger = jQuery(this),
        thisMenu = thisTrigger.parent(),
        thisPanel = thisTrigger.next();
      if (thisMenu.hasClass("open")) {
        thisMenu.removeClass("open");
        jQuery(document).off("click");
        thisPanel.off("click");
      } else {
        allMenus.removeClass("open");
        thisMenu.addClass("open");
        jQuery(document).on("click", function () {
          allMenus.removeClass("open");
        });
        thisPanel.on("click", function (e) {
          e.stopPropagation();
        });
      }
      return false;
    });
  }
});
jQuery.noConflict();
jQuery(document).ready(function ($) {
  $(document).ready(function () {
    $(".nav li a").each(function () {
      if ($(this).next().length > 0) {
        $(this).addClass("parent");
      }
    });
  });
  $(function () {
    $(".nav li").unbind("mouseenter mouseleave");
    $(".nav li a.parent")
      .unbind("click")
      .bind("click", function (e) {
        e.preventDefault();
        $(this).parent("li").toggleClass("hover");
      });
  });
});
//   backtotop
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function (event) {
    var vitri = window.pageYOffset || document.documentElement.scrollTop;
    var backtotop = document.querySelector(".backtotop");

    if (vitri < 400) {
      backtotop.classList.remove("show-backtotop1");
    } else if (vitri < 600) {
      backtotop.classList.add("show-backtotop1");
      backtotop.classList.remove("show-backtotop2");
    } else if (vitri < 1100) {
      backtotop.classList.add("show-backtotop2");
      backtotop.classList.remove("show-backtotop3");
    } else if (vitri < 1800) {
      backtotop.classList.add("show-backtotop3");
      backtotop.classList.remove("show-backtotop4");
    } else if (vitri < 2500) {
      backtotop.classList.add("show-backtotop4");
      backtotop.classList.remove("show-backtotop");
    } else {
      backtotop.classList.add("show-backtotop");
    }
  });

  var backtotop = document.querySelector(".backtotop");
  backtotop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// tab
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");

    // check targetTab có chứa Slick Slider không
    const slickSlider = target.querySelector(".list-post-slider");
    if (slickSlider) {
      // update Slick Slider sau khi chuyển đổi tab
      slickSlider.slick.setPosition();
      slickSlider.slick.refresh();
    }
  });
});

// mega menu
let megaMenu = document.querySelector(".mega-menu");
let subMega = document.querySelector(".sub-mega");
let displayDiv = document.querySelector(".sub-mega-inner");

megaMenu.addEventListener("mouseover", function () {
  displayDiv.style.display = "block";
});

subMega.addEventListener("mouseleave", function () {
  displayDiv.style.display = "none";
});

// Lấy danh sách các li trong nav-item
const navItems = document.querySelectorAll('.nav-item li');
const navConts = document.querySelectorAll('.nav-cont ul');

navConts[0].classList.add('active');

let isMouseOverNav = false;
let activeNavCont = navConts[0]; // Lưu trữ nav-cont đang được active

navItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    navConts.forEach((cont) => {
      cont.classList.remove('active');
    });

    const target = item.querySelector('a').getAttribute('data-tab-target');

    const targetCont = document.querySelector(target);
    if (targetCont) {
      targetCont.classList.add('active');
      activeNavCont = targetCont; // Lưu trữ nav-cont đang được active
    }
  });

  item.addEventListener('mouseleave', () => {
    isMouseOverNav = true;
    setTimeout(() => {
      if (!isMouseOverNav) {
        activeNavCont.classList.add('active'); // Hiển thị lại nav-cont đang được active
      }
    }, 200);
  });
});

document.querySelector('.nav-item').addEventListener('mouseenter', () => {
  isMouseOverNav = true;
});

document.querySelector('.nav-item').addEventListener('mouseleave', () => {
  isMouseOverNav = false;
});

// comt

jQuery(document).ready(function ($) {
  $(document).ready(function () {
    $('.btn-c-open').click(function (event) {
      event.preventDefault();
      var $feedback = $(this).closest('li').find('.feedback');
      $feedback.addClass('active');
    });

    $('.btn-c-close').click(function (event) {
      event.preventDefault();
      var $feedback = $(this).closest('.feedback');
      $feedback.removeClass('active');
    });
  });

  // modal
  // Get the modal
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

$(document).ready(function () {
  $('.btn-c-open').click(function (event) {
    event.preventDefault();
    var $feedback = $(this).closest('li').find('.feedback');
    $feedback.addClass('active');
  });

  $('.btn-c-close').click(function (event) {
    event.preventDefault();
    var $feedback = $(this).closest('.feedback');
    $feedback.removeClass('active');
  });
});
