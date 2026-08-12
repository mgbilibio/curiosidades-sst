(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Contato: mostrar sucesso FormSubmit (?enviado=1)
  (function contactSuccess() {
    var params = new URLSearchParams(window.location.search || "");
    if (params.get("enviado") !== "1") return;
    var banner = document.getElementById("form-success");
    if (banner) {
      banner.hidden = false;
      banner.focus && banner.setAttribute("tabindex", "-1");
      try { banner.focus(); } catch (e) {}
    }
  })();

  // Curiosidades: abrir accordion do tema que contém o #anchor
  (function curiosidadesHashAccordion() {
    var groups = document.querySelectorAll(".theme-accordion");
    if (!groups.length) return;

    function openForHash(hash) {
      if (!hash || hash === "#") return;
      var id = hash.replace(/^#/, "");
      var target = document.getElementById(id);
      if (!target) return;

      var details = target.closest ? target.closest(".theme-accordion") : null;
      if (!details && target.classList.contains("theme-accordion")) {
        details = target;
      }
      if (details && details.tagName === "DETAILS") {
        details.open = true;
      }

      // Scroll after open (layout settle)
      window.requestAnimationFrame(function () {
        try {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (e) {
          target.scrollIntoView(true);
        }
      });
    }

    openForHash(window.location.hash);

    window.addEventListener("hashchange", function () {
      openForHash(window.location.hash);
    });

    // TOC links to theme ids should open that details
    document.querySelectorAll(".theme-toc a[href^='#tema-']").forEach(function (a) {
      a.addEventListener("click", function () {
        var href = a.getAttribute("href") || "";
        var el = document.getElementById(href.slice(1));
        if (el && el.tagName === "DETAILS") el.open = true;
      });
    });
  })();
})();
