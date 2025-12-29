/**
 * CUSTOM ENHANCEMENTS FOR JOSIE LAWCASTLE
 * Modern interactions and smooth animations
 */

(function ($) {
  "use strict";

  // Wait for DOM to be ready
  $(document).ready(function () {
    // ========== SMOOTH SCROLL FOR NAVIGATION ==========
    $(".nav-link, .btn-learn").on("click", function (e) {
      const href = $(this).attr("href");

      // Check if it's an anchor link
      if (href && href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const target = $(href);

        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 80,
            },
            800,
            "easeInOutExpo"
          );

          // Close mobile menu if open
          if ($(".navbar-collapse").hasClass("show")) {
            $(".navbar-toggler").click();
          }
        }
      }
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    let lastScrollTop = 0;
    const navbar = $(".ftco-nav");

    $(window).scroll(function () {
      const scrollTop = $(this).scrollTop();

      // Add shadow on scroll
      if (scrollTop > 50) {
        navbar.addClass("scrolled");
      } else {
        navbar.removeClass("scrolled");
      }

      lastScrollTop = scrollTop;
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    $(window).scroll(function () {
      const scrollPos = $(document).scrollTop() + 100;

      $(".nav-link").each(function () {
        const currLink = $(this);
        const refElement = $(currLink.attr("href"));

        if (
          refElement.length &&
          refElement.position().top <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          $(".nav-item").removeClass("active");
          currLink.parent().addClass("active");
        }
      });
    });

    // ========== ENHANCED READ MORE MODAL ==========
    $(".read-more").on("click", function (e) {
      e.preventDefault();
      const bio = $(this).attr("data-bio");
      const name = $(this).attr("data-name");

      if (bio) {
        // Create modal if it doesn't exist
        if ($("#customBioModal").length === 0) {
          $("body").append(`
            <div class="modal fade" id="customBioModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 shadow-lg">
                  <div class="modal-header border-0 bg-primary text-white">
                    <h5 class="modal-title fw-bold" id="modalTitle"></h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body p-4">
                    <div id="modalContent"></div>
                  </div>
                </div>
              </div>
            </div>
          `);
        }

        $("#modalTitle").text(name || "Information");
        $("#modalContent").html(bio);

        const modal = new bootstrap.Modal(
          document.getElementById("customBioModal")
        );
        modal.show();
      }
    });

    // ========== FORM VALIDATION & ENHANCEMENT ==========
    const contactForm = $("#contactForm");

    if (contactForm.length) {
      contactForm.on("submit", function (e) {
        e.preventDefault();

        // Basic validation
        let isValid = true;
        const requiredFields = $(this).find("[required]");

        requiredFields.each(function () {
          if (!$(this).val()) {
            isValid = false;
            $(this).addClass("is-invalid");
          } else {
            $(this).removeClass("is-invalid");
          }
        });

        if (isValid) {
          // Show success message (customize based on your backend)
          showNotification(
            "Thank you! We will get back to you soon.",
            "success"
          );
          contactForm[0].reset();
        } else {
          showNotification("Please fill in all required fields.", "error");
        }
      });

      // Remove invalid class on input
      contactForm.find("input, textarea").on("input", function () {
        $(this).removeClass("is-invalid");
      });
    }

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type) {
      const bgColor = type === "success" ? "#28a745" : "#dc3545";

      // Remove existing notifications
      $(".custom-notification").remove();

      const notification = $(`
        <div class="custom-notification" style="
          position: fixed;
          top: 100px;
          right: 20px;
          background: ${bgColor};
          color: white;
          padding: 15px 25px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          z-index: 9999;
          animation: slideInRight 0.3s ease;
        ">
          ${message}
        </div>
      `);

      $("body").append(notification);

      setTimeout(function () {
        notification.fadeOut(300, function () {
          $(this).remove();
        });
      }, 3000);
    }

    // ========== LAZY LOADING IMAGES ==========
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add("loaded");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img").forEach(function (img) {
        imageObserver.observe(img);
      });
    }

    // ========== ANIMATE ON SCROLL ENHANCEMENT ==========
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
      });
    }

    // ========== MOBILE MENU CLOSE ON OUTSIDE CLICK ==========
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".navbar").length) {
        if ($(".navbar-collapse").hasClass("show")) {
          $(".navbar-toggler").click();
        }
      }
    });

    // ========== LOADING ANIMATION ==========
    $(window).on("load", function () {
      $(".ftco-loader").fadeOut("slow", function () {
        $(this).remove();
      });
    });

    // ========== TESTIMONIAL/REVIEW SLIDER ENHANCEMENT ==========
    if ($(".owl-carousel").length) {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
    }

    // ========== SCROLL TO TOP BUTTON ==========
    // Create scroll to top button
    if ($(".scroll-to-top").length === 0) {
      $("body").append(`
        <button class="scroll-to-top" style="
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #4e73df, #224abe);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 5px 20px rgba(78, 115, 223, 0.4);
          z-index: 999;
          transition: all 0.3s ease;
        ">
          <i class="icon-arrow-up"></i>
          ↑
        </button>
      `);
    }

    // Show/hide scroll to top button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $(".scroll-to-top").fadeIn().css("display", "flex");
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });

    // Scroll to top on click
    $(".scroll-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 800, "easeInOutExpo");
    });

    // ========== COUNTER ANIMATION ==========
    if ($(".counter").length) {
      $(".counter").each(function () {
        const $this = $(this);
        const countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 2000,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }

    // ========== PARALLAX EFFECT ==========
    $(window).scroll(function () {
      const scrolled = $(window).scrollTop();
      $(".parallax").css("transform", "translateY(" + scrolled * 0.5 + "px)");
    });

    // ========== HOVER EFFECTS ==========
    $(".services-wrap, .team-member").hover(
      function () {
        $(this).find("img").css("transform", "scale(1.05)");
      },
      function () {
        $(this).find("img").css("transform", "scale(1)");
      }
    );

    // ========== PRELOAD CRITICAL IMAGES ==========
    const criticalImages = [
      "images/hero_4.jpg",
      "images/gavel.jpg",
      "images/hr2.jpg",
    ];

    criticalImages.forEach(function (src) {
      const img = new Image();
      img.src = src;
    });
  }); // End of document ready

  // ========== EASING FUNCTION ==========
  $.extend($.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  });
})(jQuery);
