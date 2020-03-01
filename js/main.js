$(document).ready(function() {
  new WOW().init();

  /* 
    Слайдер "Фотографии объектов"
  */
  var sliderPhotos = new Swiper(".slider-photos", {
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".gallerypag__next",
      prevEl: ".gallerypag__prev"
    }
  });

  /* 
    Слайдер "Объекты"
  */
  var sliderProjects = new Swiper(".slider-projects", {
    on: {
      init: function() {
        $(".works")
          .siblings(".slidernum")
          .find(".slidernum__total")
          .html(this.slides.length);
      },
      transitionEnd: function() {
        $(".works")
          .siblings(".slidernum")
          .find(".slidernum__current")
          .html(this.activeIndex + 1);
      }
    },
    navigation: {
      nextEl: $(".workspag__next"),
      prevEl: $(".workspag__prev")
    }
  });
  /* 
        Кнопка "Вверх"
    */
  (function() {
    function ifScrollUp() {
      if ($(this).scrollTop() > 250) {
        $(".scrollup").addClass("scrollup_show");
      } else {
        $(".scrollup").removeClass("scrollup_show");
      }
    }
    $(window).scroll(ifScrollUp);
    ifScrollUp();
    $(".scrollup").on("click", function(e) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: 0
        },
        1100
      );
    });
  })();

  /* 
    Маска для номера телефона
  */
  $(".phone-input").mask("+38 (000) 000 00 00", {
    placeholder: "+38 (___) ___ __ __"
  });

  /**
   * Модальные окна
   */
  (function() {
    function openModalWindow(id) {
      $("body, html").css("overflow", "hidden");
      var modal = $("#" + id);
      var win = $(modal).find(".modal__window");
      $(modal).fadeIn();
      setTimeout(function() {
        $(win).fadeIn(500);
      }, 300);
    }

    $(".modal__close").on("click", function() {
      var modal = $(this).closest(".modal");
      var win = $(modal).find(".modal__window");
      $(win).fadeOut(300);
      setTimeout(function() {
        $(modal).fadeOut();
        $("body, html").css("overflow", "auto");
      }, 400);
    });

    $("[data-modal]").on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("data-modal");
      openModalWindow(id);
    });
  })();

  /* 
    Обработка ошибок ввода
  */
  function showError(error, element) {
    if (
      $(element)
        .parent()
        .find(".valerror").length !== 0
    )
      return false;
    if ($(element).attr("name") == "name") {
      message = "Введите своё имя";
    } else if ($(element).attr("name") == "phone") {
      message = "Введите номер телефона";
    }
    $(element)
      .parent()
      .prepend("<div class='valerror'>" + message + "</div>");
    return true;
  }

  /* 
    Форма "Рассчитать стоимость"
  */
  $(".form-calc").each(function() {
    $(this)
      .submit(function(e) {
        e.preventDefault();
      })
      .validate({
        rules: {
          name: {
            required: {
              depends: function() {
                $(this).val($.trim($(this).val()));
                return true;
              }
            }
          },
          phone: {
            required: {
              depends: function() {
                $(this).val($.trim($(this).val()));
                return true;
              }
            },
            minlength: 10
          }
        },

        success: function(label, element) {
          $(element)
            .parent()
            .find(".valerror")
            .remove();
          return true;
        },
        errorPlacement: showError,
        submitHandler: function(form) {
          $.ajax({
            url: "send.php",
            type: "POST",
            data: {
              form: "calc",
              name: $(form)
                .find('input[name ="name"]')
                .val(),
              phone: $(form)
                .find('input[name ="phone"]')
                .val(),
              size: $(form)
                .find('input[name ="size"]')
                .val(),
              type: $(form)
                .find('select[name ="type"]')
                .val()
            },
            success: function() {
              $(form)
                .siblings(".formcomplete_ok")
                .fadeIn(500);
            },
            error: function() {
              $(form)
                .siblings(".formcomplete_error")
                .fadeIn(500);
            }
          });
          $(form)
            .find("input, textarea, select")
            .prop("disabled", true)
            .val("");
          $(form)
            .find(".button")
            .prop("disabled", true);
        }
      });
  });

  /* 
        Форма "Заказать звонок"
    */
  $(".form-call").each(function() {
    $(this)
      .submit(function(e) {
        e.preventDefault();
      })
      .validate({
        rules: {
          name: {
            required: {
              depends: function() {
                $(this).val($.trim($(this).val()));
                return true;
              }
            }
          },
          phone: {
            required: {
              depends: function() {
                $(this).val($.trim($(this).val()));
                return true;
              }
            },
            minlength: 10
          }
        },

        success: function(label, element) {
          $(element)
            .parent()
            .find(".valerror")
            .remove();
          return true;
        },
        errorPlacement: showError,
        submitHandler: function(form) {
          $.ajax({
            url: "send.php",
            type: "POST",
            data: {
              form: "call",
              name: $(form)
                .find('input[name ="name"]')
                .val(),
              phone: $(form)
                .find('input[name ="phone"]')
                .val()
            },
            success: function() {
              $(form)
                .siblings(".formcomplete_ok")
                .fadeIn(500);
            },
            error: function() {
              $(form)
                .siblings(".formcomplete_error")
                .fadeIn(500);
            }
          });
          $(form)
            .find("input, textarea, select")
            .prop("disabled", true)
            .val("");
          $(form)
            .find(".button")
            .prop("disabled", true);
        }
      });
  });


  /* 
        Форма "Замер"
    */
   $(".form-measure").each(function() {
    $(this)
      .submit(function(e) {
        e.preventDefault();
      })
      .validate({
        rules: {
          name: {
            required: {
              depends: function() {
                $(this).val($.trim($(this).val()));
                return true;
              }
            }
          },
          phone: {
            required: {
              depends: function() {
                $(this).val($.trim($(this).val()));
                return true;
              }
            },
            minlength: 10
          }
        },

        success: function(label, element) {
          $(element)
            .parent()
            .find(".valerror")
            .remove();
          return true;
        },
        errorPlacement: showError,
        submitHandler: function(form) {
          $.ajax({
            url: "send.php",
            type: "POST",
            data: {
              form: "measure",
              name: $(form)
                .find('input[name ="name"]')
                .val(),
              phone: $(form)
                .find('input[name ="phone"]')
                .val()
            },
            success: function() {
              $(form)
                .siblings(".formcomplete_ok")
                .fadeIn(500);
            },
            error: function() {
              $(form)
                .siblings(".formcomplete_error")
                .fadeIn(500);
            }
          });
          $(form)
            .find("input, textarea, select")
            .prop("disabled", true)
            .val("");
          $(form)
            .find(".button")
            .prop("disabled", true);
        }
      });
  });
});