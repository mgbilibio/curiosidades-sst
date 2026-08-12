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

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var nome = form.elements.namedItem("nome");
      var email = form.elements.namedItem("email");
      var assunto = form.elements.namedItem("assunto");
      var mensagem = form.elements.namedItem("mensagem");

      if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
        if (status) {
          status.className = "form-status error";
          status.textContent = "Por favor, preencha os campos obrigatórios.";
          status.hidden = false;
        }
        return;
      }

      var subject = encodeURIComponent(
        "[Curiosidades SST] " + (assunto.value || "Contato pelo site")
      );
      var body = encodeURIComponent(
        "Nome: " +
          nome.value.trim() +
          "\nE-mail: " +
          email.value.trim() +
          "\n\n" +
          mensagem.value.trim()
      );

      if (status) {
        status.className = "form-status success";
        status.textContent =
          "Obrigado! Seu aplicativo de e-mail deve abrir para enviar a mensagem. Se isso não acontecer, escreva para engenheirobill@gmail.com.";
        status.hidden = false;
      }

      window.location.href =
        "mailto:engenheirobill@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
})();
