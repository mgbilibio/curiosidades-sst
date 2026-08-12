/**
 * Sidebar de temas — Curiosidades SST (Margus Giuliano / SafeEng)
 * Injeta navegação lateral idêntica em todas as páginas principais.
 */
(function () {
  "use strict";

  var NR_BASE =
    "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/";

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
        { href: "nrs.html#acesso-nrs", label: "Acesso às NR atualizadas" },
        { href: NR_BASE + "nr-1", label: "NR-1 — Disposições gerais", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-2-nr-2", label: "NR-2 — Revogada", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-3-nr-3", label: "NR-3 — Embargo", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-4-nr-4", label: "NR-4 — SESMT", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-5-nr-5", label: "NR-5 — CIPA", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-6-nr-6", label: "NR-6 — EPI", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-7-nr-7", label: "NR-7 — PCMSO", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-8-nr-8", label: "NR-8 — Edificações", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-9-nr-9", label: "NR-9 — Agentes", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-10-nr-10", label: "NR-10 — Eletricidade", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-11-nr-11", label: "NR-11 — Transporte", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-12-nr-12", label: "NR-12 — Máquinas", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-13-nr-13", label: "NR-13 — Caldeiras", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-14-nr-14", label: "NR-14 — Fornos", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-15-nr-15", label: "NR-15 — Insalubridade", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-16-nr-16", label: "NR-16 — Periculosidade", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-17-nr-17", label: "NR-17 — Ergonomia", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-18-nr-18", label: "NR-18 — Construção", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-19-nr-19", label: "NR-19 — Explosivos", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-20-nr-20", label: "NR-20 — Inflamáveis", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-21-nr-21", label: "NR-21 — Céu aberto", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-22-nr-22", label: "NR-22 — Mineração", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-23-nr-23", label: "NR-23 — Incêndios", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-24-nr-24", label: "NR-24 — Sanitárias", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-25-nr-25", label: "NR-25 — Resíduos", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-26-nr-26", label: "NR-26 — Sinalização", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-27-nr-27", label: "NR-27 — Revogada", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-28-nr-28", label: "NR-28 — Fiscalização", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-29-nr-29", label: "NR-29 — Portuário", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-30-nr-30", label: "NR-30 — Aquaviário", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-31-nr-31", label: "NR-31 — Agropecuária", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-32-nr-32", label: "NR-32 — Saúde", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-33-nr-33", label: "NR-33 — Confinados", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-34-nr-34", label: "NR-34 — Naval", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-35-nr-35", label: "NR-35 — Altura", external: true },
        { href: NR_BASE + "norma-regulamentadora-no-36-nr-36", label: "NR-36 — Abate/carnes", external: true },
        {
          href: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-37-nr-37",
          label: "NR-37 — Petróleo",
          external: true
        },
        { href: NR_BASE + "norma-regulamentadora-no-38-nr-38", label: "NR-38 — Limpeza urbana", external: true },
        { href: "curiosidades.html#nr1-pgr", label: "Insight: NR-1 GRO" },
        { href: "curiosidades.html#hazop-nr12", label: "Insight: NR-12 HAZOP" },
        { href: "curiosidades.html#nr17", label: "Insight: NR-17" },
        { href: "curiosidades.html#nr15-higiene", label: "Insight: NR-15" }
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
    if (/^https?:\/\//i.test(href)) return false;
    var file = currentFile();
    var hash = window.location.hash || "";
    if (href.indexOf("#") !== -1) {
      var parts = href.split("#");
      var targetFile = parts[0] || file;
      var targetHash = "#" + parts[1];
      if (targetFile === file) {
        if (!hash && targetFile === "nrs.html" && targetHash === "#acesso-nrs") {
          return true;
        }
        return hash === targetHash;
      }
      return false;
    }
    return href === file || (href === "index.html" && file === "");
  }

  function topicShouldExpand(topic) {
    if (topic.id === "nr" && currentFile() === "nrs.html") return true;
    return false;
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

      var forceOpen = topicShouldExpand(topic);
      var startOpen = forceOpen || index === 0;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sidebar-topic-btn";
      btn.setAttribute("aria-expanded", startOpen ? "true" : "false");
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
      panel.hidden = !startOpen;

      topic.items.forEach(function (item) {
        var subLi = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        if (item.external) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "sidebar-external";
          a.setAttribute("title", "Abre site oficial (gov.br) em nova aba");
          var cue = document.createElement("span");
          cue.className = "external-cue";
          cue.setAttribute("aria-hidden", "true");
          cue.textContent = " ↗";
          a.appendChild(cue);
        }
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
      if (t && t.closest && t.closest("a") && window.matchMedia("(max-width: 900px)").matches) {
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
