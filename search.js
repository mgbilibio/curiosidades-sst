/**
 * Busca site-wide — Curiosidades SST (Margus Giuliano / SafeEng)
 * Injeta widget em .header-actions; carrega search-index.js sob demanda.
 */
(function () {
  "use strict";

  var MAX_RESULTS = 10;
  var DEBOUNCE_MS = 150;
  var index = null;
  var indexPromise = null;
  var debounceTimer = null;
  var rootEl = null;
  var inputEl = null;
  var panelEl = null;
  var toggleEl = null;
  var activeIndex = -1;
  var contentPromise = null;

  function currentPathname() {
    return window.location.pathname || "";
  }

  function currentSitePath() {
    var path = currentPathname();
    var marker = "/curiosidades-sst/";
    var idx = path.indexOf(marker);
    if (idx !== -1) {
      var rest = path.slice(idx + marker.length);
      if (!rest || rest.charAt(rest.length - 1) === "/") rest += "index.html";
      return rest;
    }
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return "index.html";
    if (parts[parts.length - 1].indexOf(".") === -1) parts.push("index.html");
    var art = parts.indexOf("artigos");
    if (art !== -1) return parts.slice(art).join("/");
    return parts[parts.length - 1];
  }

  function inArtigosSection() {
    return currentSitePath().indexOf("artigos/") === 0 || currentPathname().indexOf("/artigos/") !== -1;
  }

  function basePrefix() {
    return inArtigosSection() ? "../" : "";
  }

  function scriptBase() {
    var scripts = document.getElementsByTagName("script");
    var i;
    for (i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (/search\.js(\?|$)/.test(src)) {
        return src.replace(/search\.js(\?.*)?$/, "");
      }
    }
    return basePrefix();
  }

  function resolveUrl(url) {
    if (!url || /^https?:\/\//i.test(url) || url.charAt(0) === "/") return url;
    return basePrefix() + url;
  }

  /**
   * Normaliza texto: minúsculas, remove acentos, colapsa espaços,
   * unifica NR-12 / NR 12 / nr12 → nr12 (também mantém forma com hífen).
   */
  function normalize(text) {
    if (!text) return "";
    var s = String(text).toLowerCase();
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Unificar menções a NR: "nr-12", "nr 12", "nr12" → tokens com limites
    s = s.replace(/\bnr[\s.\-]*(\d+)\b/g, " nr$1 nr-$1 ");
    // Pontuação → espaço (mantém hífen útil)
    s = s.replace(/[^\w\s\-]/g, " ");
    s = s.replace(/[_\u2013\u2014]/g, " ");
    s = s.replace(/\s+/g, " ").trim();
    return s;
  }

  function unique(arr) {
    var seen = Object.create(null);
    var out = [];
    var i;
    for (i = 0; i < arr.length; i++) {
      if (!arr[i] || seen[arr[i]]) continue;
      seen[arr[i]] = 1;
      out.push(arr[i]);
    }
    return out;
  }

  /** Variantes simples pt-BR (plural/singular) para melhorar recall. */
  function expandToken(t) {
    if (!t || t.length < 3) return [t];
    var out = [t];
    if (/ais$/.test(t) && t.length > 4) out.push(t.replace(/ais$/, "al"));
    if (/eis$/.test(t) && t.length > 4) out.push(t.replace(/eis$/, "el"));
    if (/ois$/.test(t) && t.length > 4) out.push(t.replace(/ois$/, "ol"));
    if (/oes$/.test(t) && t.length > 4) out.push(t.replace(/oes$/, "ao"));
    if (/aes$/.test(t) && t.length > 4) out.push(t.replace(/aes$/, "ao"));
    if (/al$/.test(t) && t.length > 4) out.push(t.replace(/al$/, "ais"));
    if (/el$/.test(t) && t.length > 4) out.push(t.replace(/el$/, "eis"));
    if (/ao$/.test(t) && t.length > 3) {
      out.push(t.replace(/ao$/, "oes"));
      out.push(t.replace(/ao$/, "aes"));
    }
    // Não pluralizar códigos curtos (nr1, pgr, gro, aep…)
    if (!/^nr-?\d+$/.test(t) && !/^[a-z]{2,4}$/.test(t)) {
      if (/[^ue]s$/.test(t) && t.length > 4) out.push(t.slice(0, -1));
      else if (!/s$/.test(t) && t.length > 3) out.push(t + "s");
    }
    return unique(out);
  }

  function tokenize(query) {
    var n = normalize(query);
    if (!n) return [];
    return n.split(" ").filter(function (t) {
      return t.length > 0;
    });
  }

  function hayContainsToken(hay, token) {
    var i;
    function hasWholeToken(value, candidate) {
      var padded = " " + value + " ";
      return padded.indexOf(" " + candidate + " ") !== -1;
    }

    // NR: match por token inteiro (nr1 ≠ nr12)
    if (/^nr-?\d+$/.test(token)) {
      var num = token.replace(/^nr-?/, "");
      var forms = unique(["nr" + num, "nr-" + num]);
      for (i = 0; i < forms.length; i++) {
        if (hasWholeToken(hay, forms[i])) return true;
      }
      return false;
    }
    var variants = expandToken(token);
    for (i = 0; i < variants.length; i++) {
      if (hasWholeToken(hay, variants[i])) return true;
    }
    // Prefixo generoso para tokens longos (ex.: psicossocia…)
    if (token.length >= 6) {
      var words = hay.split(" ");
      for (i = 0; i < words.length; i++) {
        var w = words[i];
        if (w.length >= 6 && (w.indexOf(token) === 0 || token.indexOf(w) === 0)) {
          var shorter = Math.min(w.length, token.length);
          var longer = Math.max(w.length, token.length);
          if (shorter / longer >= 0.75) return true;
        }
      }
    }
    return false;
  }

  function haystackFor(item) {
    var parts = [item.title, item.summary, item.type, item.content];
    if (item.tags && item.tags.length) parts = parts.concat(item.tags);
    return normalize(parts.join(" "));
  }

  function scoreItem(item, tokens) {
    var hay = item._hay || (item._hay = haystackFor(item));
    var titleN = item._titleN || (item._titleN = normalize(item.title));
    var tagsN = item._tagsN || (item._tagsN = normalize((item.tags || []).join(" ")));
    var score = 0;
    var i;
    for (i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (!hayContainsToken(hay, t)) return -1;
      if (hayContainsToken(titleN, t)) score += 8;
      else if (hayContainsToken(tagsN, t)) score += 5;
      else score += 2;
      if (titleN.indexOf(t) === 0 || titleN.indexOf(" " + t) !== -1) score += 2;
    }
    if (item.type === "artigo") score += 1;
    return score;
  }

  function search(query) {
    var tokens = tokenize(query);
    if (!tokens.length || !index) return [];
    var results = [];
    var i;
    for (i = 0; i < index.length; i++) {
      var item = index[i];
      var sc = scoreItem(item, tokens);
      if (sc >= 0) results.push({ item: item, score: sc });
    }
    results.sort(function (a, b) {
      return b.score - a.score;
    });
    return results.slice(0, MAX_RESULTS);
  }

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (window.SST_SEARCH_INDEX) {
      index = window.SST_SEARCH_INDEX;
      return Promise.resolve(index);
    }
    if (indexPromise) return indexPromise;
    indexPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = scriptBase() + "search-index.js";
      s.async = true;
      s.onload = function () {
        index = window.SST_SEARCH_INDEX || [];
        resolve(index);
      };
      s.onerror = function () {
        reject(new Error("Falha ao carregar índice de busca"));
      };
      document.head.appendChild(s);
    });
    return indexPromise;
  }

  function loadFullContent() {
    if (contentPromise) return contentPromise;
    contentPromise = loadIndex().then(function (items) {
      if (!window.fetch || !window.DOMParser) return items;
      return Promise.all(
        items.map(function (item) {
          return window
            .fetch(resolveUrl(item.url), { credentials: "same-origin", cache: "force-cache" })
            .then(function (response) {
              if (!response.ok) throw new Error("Falha ao buscar " + item.url);
              return response.text();
            })
            .then(function (html) {
              var doc = new DOMParser().parseFromString(html, "text/html");
              var main = doc.querySelector("main") || doc.body;
              item.content = normalize(main ? main.textContent : "");
              item._hay = null;
              return item;
            })
            .catch(function () {
              return item;
            });
        })
      );
    });
    return contentPromise;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function snippetFor(item, query) {
    if (item.summary) return item.summary;
    if (item.content) {
      var firstToken = tokenize(query || "")[0];
      var start = firstToken ? item.content.indexOf(firstToken) : -1;
      if (start !== -1) {
        var from = Math.max(0, start - 70);
        var excerpt = item.content.slice(from, from + 180);
        return (from > 0 ? "…" : "") + excerpt + (from + 180 < item.content.length ? "…" : "");
      }
    }
    if (item.tags && item.tags.length) return item.tags.slice(0, 5).join(" · ");
    return "";
  }

  function renderResults(results, query) {
    if (!panelEl) return;
    activeIndex = -1;
    if (!query || !String(query).trim()) {
      panelEl.hidden = true;
      panelEl.innerHTML = "";
      panelEl.removeAttribute("role");
      panelEl.removeAttribute("aria-busy");
      if (inputEl) inputEl.setAttribute("aria-expanded", "false");
      return;
    }
    panelEl.hidden = false;
    panelEl.setAttribute("role", "listbox");
    panelEl.setAttribute("aria-label", "Resultados da busca");
    panelEl.removeAttribute("aria-busy");
    if (inputEl) inputEl.setAttribute("aria-expanded", "true");

    if (!results.length) {
      panelEl.innerHTML =
        '<div class="site-search-empty" role="option" aria-disabled="true">Nenhum resultado</div>';
      return;
    }

    var html = results
      .map(function (r, i) {
        var item = r.item;
        var typeClass = item.type === "artigo" ? "is-artigo" : "is-pagina";
        var tags =
          item.tags && item.tags.length
            ? '<span class="site-search-tags">' +
              escapeHtml(item.tags.slice(0, 4).join(" · ")) +
              "</span>"
            : "";
        return (
          '<a class="site-search-item" role="option" id="site-search-opt-' +
          i +
          '" href="' +
          escapeHtml(resolveUrl(item.url)) +
          '" data-index="' +
          i +
          '">' +
          '<span class="site-search-item-top">' +
          '<span class="site-search-item-title">' +
          escapeHtml(item.title) +
          "</span>" +
          '<span class="site-search-badge ' +
          typeClass +
          '">' +
          escapeHtml(item.type) +
          "</span>" +
          "</span>" +
          '<span class="site-search-snippet">' +
          escapeHtml(snippetFor(item, query)) +
          "</span>" +
          tags +
          "</a>"
        );
      })
      .join("");
    panelEl.innerHTML = html;
  }

  function setActive(idx) {
    var items = panelEl ? panelEl.querySelectorAll(".site-search-item") : [];
    if (!items.length) {
      activeIndex = -1;
      return;
    }
    if (idx < 0) idx = items.length - 1;
    if (idx >= items.length) idx = 0;
    activeIndex = idx;
    var i;
    for (i = 0; i < items.length; i++) {
      items[i].classList.toggle("is-active", i === activeIndex);
    }
    items[activeIndex].scrollIntoView({ block: "nearest" });
    if (inputEl) inputEl.setAttribute("aria-activedescendant", items[activeIndex].id);
  }

  function closePanel() {
    if (panelEl) {
      panelEl.hidden = true;
      panelEl.innerHTML = "";
    }
    activeIndex = -1;
    if (inputEl) {
      inputEl.removeAttribute("aria-activedescendant");
      inputEl.setAttribute("aria-expanded", "false");
    }
    if (panelEl) panelEl.removeAttribute("aria-busy");
  }

  function collapseMobile() {
    if (!rootEl) return;
    rootEl.classList.remove("is-open");
    if (toggleEl) toggleEl.setAttribute("aria-expanded", "false");
    closePanel();
  }

  function expandMobile() {
    if (!rootEl) return;
    rootEl.classList.add("is-open");
    if (toggleEl) toggleEl.setAttribute("aria-expanded", "true");
    loadIndex();
    if (inputEl) {
      window.setTimeout(function () {
        inputEl.focus();
      }, 10);
    }
  }

  function onInput() {
    var q = inputEl.value;
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(function () {
      loadIndex()
        .then(function () {
          renderResults(search(q), q);
          if (panelEl) panelEl.setAttribute("aria-busy", "true");
          return loadFullContent();
        })
        .then(function () {
          if (inputEl && inputEl.value === q) renderResults(search(q), q);
        })
        .catch(function () {
          panelEl.hidden = false;
          panelEl.innerHTML =
            '<div class="site-search-empty">Não foi possível carregar a busca</div>';
        });
    }, DEBOUNCE_MS);
  }

  function buildWidget() {
    var actions = document.querySelector(".header-actions");
    if (!actions || document.getElementById("site-search")) return;

    rootEl = document.createElement("div");
    rootEl.className = "site-search";
    rootEl.id = "site-search";

    toggleEl = document.createElement("button");
    toggleEl.type = "button";
    toggleEl.className = "site-search-toggle";
    toggleEl.setAttribute("aria-label", "Buscar");
    toggleEl.setAttribute("aria-expanded", "false");
    toggleEl.setAttribute("aria-controls", "site-search-panel");
    toggleEl.innerHTML =
      '<svg class="site-search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
      '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      "</svg>" +
      '<span class="site-search-toggle-label">Buscar</span>';

    var wrap = document.createElement("div");
    wrap.className = "site-search-field";

    var label = document.createElement("label");
    label.className = "visually-hidden";
    label.htmlFor = "site-search-input";
    label.textContent = "Buscar";

    inputEl = document.createElement("input");
    inputEl.type = "search";
    inputEl.id = "site-search-input";
    inputEl.className = "site-search-input";
    inputEl.placeholder = "Buscar por palavra ou tag…";
    inputEl.setAttribute("aria-label", "Buscar por palavra ou tag");
    inputEl.setAttribute("autocomplete", "off");
    inputEl.setAttribute("autocapitalize", "off");
    inputEl.setAttribute("spellcheck", "false");
    inputEl.setAttribute("role", "combobox");
    inputEl.setAttribute("aria-autocomplete", "list");
    inputEl.setAttribute("aria-controls", "site-search-panel");
    inputEl.setAttribute("aria-expanded", "false");

    panelEl = document.createElement("div");
    panelEl.id = "site-search-panel";
    panelEl.className = "site-search-panel";
    panelEl.hidden = true;

    wrap.appendChild(label);
    wrap.appendChild(inputEl);
    wrap.appendChild(panelEl);

    rootEl.appendChild(toggleEl);
    rootEl.appendChild(wrap);

    // Inserir antes do botão Temas / menu, para ficar à esquerda dos toggles
    // mas no canto superior direito do header (header-actions já é à direita no mobile).
    // Preferência: primeiro filho de header-actions (antes de Temas).
    if (actions.firstChild) {
      actions.insertBefore(rootEl, actions.firstChild);
    } else {
      actions.appendChild(rootEl);
    }

    toggleEl.addEventListener("click", function (e) {
      e.preventDefault();
      if (rootEl.classList.contains("is-open")) {
        collapseMobile();
      } else {
        expandMobile();
      }
    });

    inputEl.addEventListener("input", onInput);
    inputEl.addEventListener("focus", function () {
      loadIndex();
      rootEl.classList.add("is-open");
      if (toggleEl) toggleEl.setAttribute("aria-expanded", "true");
      if (inputEl.value.trim()) onInput();
    });

    inputEl.addEventListener("keydown", function (e) {
      var items = panelEl.querySelectorAll(".site-search-item");
      if (e.key === "Escape") {
        e.preventDefault();
        if (inputEl.value) {
          inputEl.value = "";
          closePanel();
        } else {
          inputEl.blur();
          collapseMobile();
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (panelEl.hidden || !items.length) {
          if (inputEl.value.trim()) onInput();
          return;
        }
        setActive(activeIndex + 1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(activeIndex - 1);
        return;
      }
      if (e.key === "Enter" && activeIndex >= 0 && items[activeIndex]) {
        e.preventDefault();
        window.location.href = items[activeIndex].href;
      }
    });

    document.addEventListener("click", function (e) {
      if (!rootEl.contains(e.target)) {
        closePanel();
        // Em mobile, fechar o campo expandido se clicar fora
        if (window.matchMedia && window.matchMedia("(max-width: 700px)").matches) {
          collapseMobile();
        }
      }
    });

    // Pré-carregar índice em idle
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(function () {
        loadIndex();
      });
    } else {
      window.setTimeout(loadIndex, 800);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
