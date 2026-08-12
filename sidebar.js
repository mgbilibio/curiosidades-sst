/**
 * Sidebar de temas — Curiosidades SST (Margus Giuliano / SafeEng)
 * Injeta navegação lateral idêntica em todas as páginas principais.
 */
(function () {
  "use strict";

  var TOPICS = [
    {
      id: "introducao",
      label: "Introdução",
      items: [
        { href: "curiosidades.html#intro-sst", label: "O que é SST moderna" },
        { href: "curiosidades.html#perigo-risco", label: "Perigo versus risco" },
        { href: "curiosidades.html#percepcao-risco", label: "Percepção de risco" },
        { href: "curiosidades.html#gestor-riscos", label: "Do executor ao gestor" }
      ]
    },
    {
      id: "gestao-sst",
      label: "Gestão de SST",
      items: [
        { href: "curiosidades.html#iso-31010", label: "ISO 31010 no PGR" },
        { href: "curiosidades.html#anatomia-risco", label: "Anatomia do risco" },
        { href: "curiosidades.html#prob-freq", label: "Probabilidade vs frequência" },
        { href: "curiosidades.html#bow-tie", label: "Bow-Tie e barreiras" },
        { href: "curiosidades.html#pgr-matriz", label: "PGR e matrizes" },
        { href: "curiosidades.html#iso-45001", label: "ISO 45001" }
      ]
    },
    {
      id: "organizacao",
      label: "Organização do trabalho",
      items: [
        { href: "curiosidades.html#ergonomia", label: "Ergonomia e organização" },
        { href: "curiosidades.html#fadiga-turnos", label: "Turnos e fadiga" },
        { href: "curiosidades.html#participacao", label: "Participação dos trabalhadores" },
        { href: "curiosidades.html#resiliencia", label: "Cultura e resiliência" }
      ]
    },
    {
      id: "normas-tecnicas",
      label: "Normas técnicas",
      items: [
        { href: "curiosidades.html#iso-31010", label: "ISO 31000 / 31010" },
        { href: "curiosidades.html#iso-45001", label: "ISO 45001" },
        { href: "curiosidades.html#incerteza-higiene", label: "Incerteza em higiene" },
        { href: "curiosidades.html#analise-barreiras", label: "Análise de barreiras" }
      ]
    },
    {
      id: "nr",
      label: "NR",
      items: [
        { href: "curiosidades.html#nr1-pgr", label: "NR-1, GRO e PGR" },
        { href: "curiosidades.html#hazop-nr12", label: "NR-12 e HAZOP" },
        { href: "curiosidades.html#nr17", label: "NR-17 — ergonomia" },
        { href: "curiosidades.html#nr15-higiene", label: "NR-15 e higiene" }
      ]
    },
    {
      id: "curiosidades-gerais",
      label: "Curiosidades gerais",
      items: [
        { href: "curiosidades.html#resiliencia", label: "Resiliência versus reação" },
        { href: "curiosidades.html#pgr-matriz", label: "Fragilidade das matrizes" },
        { href: "curiosidades.html", label: "Todos os insights" },
        { href: "sobre.html", label: "Sobre o autor" }
      ]
    }
  ];

  function currentFile() {
    var path = window.location.pathname || "";
    var parts = path.split("/");
    var file = parts[parts.length - 1] || "index.html";
    if (!file || file.indexOf(".") === -1) return "index.html";
    return file;
  }

  function isActiveHref(href) {
    var file = currentFile();
    var hash = window.location.hash || "";
    if (href.indexOf("#") !== -1) {
      var parts = href.split("#");
      var targetFile = parts[0] || file;
      var targetHash = "#" + parts[1];
      if (targetFile === file || (targetFile === "curiosidades.html" && file === "curiosidades.html")) {
        return hash === targetHash;
      }
      return false;
    }
    return href === file || (href === "index.html" && file === "");
  }

  function buildSidebar() {
    var root = document.getElementById("site-sidebar");
    if (!root) return null;

    var nav = document.createElement("nav");
    nav.className = "sidebar-nav";
    nav.setAttribute("aria-label", "Temas de SST");

    var heading = document.createElement("p");
    heading.className = "sidebar-heading";
    heading.textContent = "Temas";
    nav.appendChild(heading);

    var list = document.createElement("ul");
    list.className = "sidebar-topics";

    TOPICS.forEach(function (topic, index) {
      var li = document.createElement("li");
      li.className = "sidebar-topic";

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sidebar-topic-btn";
      btn.setAttribute("aria-expanded", index === 0 ? "true" : "false");
      btn.setAttribute("aria-controls", "sidebar-panel-" + topic.id);
      btn.id = "sidebar-btn-" + topic.id;

      var label = document.createElement("span");
      label.textContent = topic.label;
      btn.appendChild(label);

      var chevron = document.createElement("span");
      chevron.className = "sidebar-chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = "▾";
      btn.appendChild(chevron);

      var panel = document.createElement("ul");
      panel.className = "sidebar-sub";
      panel.id = "sidebar-panel-" + topic.id;
      panel.hidden = index !== 0;

      topic.items.forEach(function (item) {
        var subLi = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        if (isActiveHref(item.href)) {
          a.setAttribute("aria-current", "true");
          btn.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
        subLi.appendChild(a);
        panel.appendChild(subLi);
      });

      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.hidden = open;
      });

      li.appendChild(btn);
      li.appendChild(panel);
      list.appendChild(li);
    });

    nav.appendChild(list);

    var foot = document.createElement("p");
    foot.className = "sidebar-foot";
    foot.innerHTML = "SafeEng · <strong>Margus Giuliano</strong>";
    nav.appendChild(foot);

    root.innerHTML = "";
    root.appendChild(nav);
    return root;
  }

  function setupDrawer() {
    var sidebar = document.getElementById("site-sidebar");
    var toggle = document.querySelector(".sidebar-toggle");
    var overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !toggle) return;

    function setOpen(open) {
      document.body.classList.toggle("sidebar-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar temas" : "Abrir temas");
      if (overlay) overlay.hidden = !open;
    }

    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("sidebar-open"));
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        setOpen(false);
      });
    }

    sidebar.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.tagName === "A" && window.matchMedia("(max-width: 900px)").matches) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function init() {
    buildSidebar();
    setupDrawer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
