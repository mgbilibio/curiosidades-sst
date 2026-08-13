/**
 * Sidebar de temas — Curiosidades SST (Margus Giuliano / SafeEng)
 * Injeta navegação lateral idêntica em todas as páginas principais.
 */
(function () {
  "use strict";

  var NR_OFFICIAL_LINKS = [
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-01-atualizada-2025-i-3.pdf", label: "NR-1 — Disposições gerais", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-2-nr-2", label: "NR-2 — Revogada", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2019/portaria_seprt_1068_-aprova_nova_nr_03.pdf", label: "NR-3 — Embargo", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-04-atualizada-2023.pdf", label: "NR-4 — SESMT", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-05-atualizada-2022.pdf", label: "NR-5 — CIPA", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-06-atualizada-2025-ii.pdf", label: "NR-6 — EPI", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-07-atualizada-2022-1.pdf", label: "NR-7 — PCMSO", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-08-atualizada-2022.pdf", label: "NR-8 — Edificações", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-09-atualizada-2026.pdf", label: "NR-9 — Agentes", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-10-atualizada-2026-1.pdf", label: "NR-10 — Eletricidade", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-11-atualizada-2016.pdf", label: "NR-11 — Transporte", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-12-atualizada-2025.pdf", label: "NR-12 — Máquinas", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-13-atualizada-2023-b.pdf", label: "NR-13 — Caldeiras", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-14-atualizada-2022.pdf", label: "NR-14 — Fornos", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-15-atualizada-2025.pdf", label: "NR-15 — Insalubridade", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-16-atualizada-2025-ii.pdf", label: "NR-16 — Periculosidade", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-17-atualizada-2023.pdf", label: "NR-17 — Ergonomia", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-18-atualizada-2020.pdf", label: "NR-18 — Construção", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-19-atualizada-2023.pdf", label: "NR-19 — Explosivos", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-20-atualizada-2025.pdf", label: "NR-20 — Inflamáveis", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-21.pdf", label: "NR-21 — Céu aberto", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-22-atualizada-2026.pdf", label: "NR-22 — Mineração", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-23-atualizada-2022.pdf", label: "NR-23 — Incêndios", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-24-atualizada-2022.pdf", label: "NR-24 — Sanitárias", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-25-atualizada-2022-1.pdf", label: "NR-25 — Resíduos", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-26-atualizada-2022.pdf", label: "NR-26 — Sinalização", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-27-nr-27", label: "NR-27 — Revogada", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-28-atualizada-2026.pdf", label: "NR-28 — Fiscalização", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-29-atualizada-2023.pdf", label: "NR-29 — Portuário", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-30-atualizada-2023.pdf", label: "NR-30 — Aquaviário", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-31-atualizada-2024-2.pdf", label: "NR-31 — Agropecuária", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-32-atualizada-2023-1.pdf", label: "NR-32 — Saúde", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-33-atualizada-2022-_retificada.pdf", label: "NR-33 — Confinados", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-34-atualizada-2023-2.pdf", label: "NR-34 — Naval", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-35-atualizada-2025-1.pdf", label: "NR-35 — Altura", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-36-atualizada-2024-1.pdf", label: "NR-36 — Abate/carnes", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-37-atualizada-2022-1.pdf", label: "NR-37 — Petróleo", external: true },
    { href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-38-nr-38", label: "NR-38 — Limpeza urbana", external: true }
  ];

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
        { href: "curiosidades.html#iso-31010", label: "IEC 31010:2019 no PGR" },
        { href: "curiosidades.html#anatomia-risco", label: "Anatomia do risco" },
        { href: "curiosidades.html#prob-freq", label: "Probabilidade vs frequência" },
        { href: "curiosidades.html#bow-tie", label: "Bow-Tie e barreiras" },
        { href: "curiosidades.html#pgr-matriz", label: "PGR e matrizes" },
        { href: "curiosidades.html#iso-45001", label: "ISO 45001" }
      ]
    },
    {
      id: "artigos",
      label: "Artigos",
      items: [
        { href: "artigos/index.html", label: "Série SafeEng", className: "sidebar-nr-hub" },
        { href: "curiosidades.html#tema-em-alta", label: "Em alta 2026 (teasers)" },
        { href: "curiosidades.html#tema-integracao-tecnica", label: "Integração técnica (teasers)" },
        { href: "curiosidades.html#tema-classicos-2026", label: "Clássicos 2026 (teasers)" },
        { href: "curiosidades.html#tema-tendencias-safeeng", label: "Tendências SafeEng (teasers)" },
        { href: "curiosidades.html#tema-barragens-estruturas", label: "Barragens e estruturas críticas" },
        { href: "artigos/seguranca-barragens-legislacao-casos.html", label: "EXTRA · Segurança de barragens" },
        { href: "artigos/riscos-psicossociais-inventario-pgr.html", label: "#1 Psicossocial no PGR" },
        { href: "artigos/metodologia-pgr-evidencias.html", label: "#2 Metodologia no PGR" },
        { href: "artigos/pgr-pcmso-saude-mental.html", label: "#3 PGR × PCMSO saúde mental" },
        { href: "artigos/adpf-1316-sancao-vs-obrigacao.html", label: "#4 ADPF 1316 sanção vs obrigação" },
        { href: "artigos/guia-mte-psicossociais-leitura-critica.html", label: "#5 Guia MTE leitura crítica" },
        { href: "artigos/lideranca-metas-jornada-perigo-gro.html", label: "#6 Liderança, metas e jornada" },
        { href: "artigos/canal-denuncia-assedio-barreira.html", label: "#7 Canal denúncia e assédio" },
        { href: "artigos/mei-me-epp-aep-dispensas.html", label: "#8 MEI/ME/EPP · AEP e dispensas" },
        { href: "artigos/integracao-nr1-nr17-aep-aet.html", label: "#9 Integração NR-1 × NR-17 · AEP/AET" },
        { href: "artigos/nr9-gro-maduro-agentes-classicos.html", label: "#10 NR-9 · agentes clássicos no GRO" },
        { href: "artigos/terceirizadas-interacao-riscos.html", label: "#11 Terceirizadas · interação de riscos" },
        { href: "artigos/perigo-externo-risco-evidente.html", label: "#12 Perigo externo · risco evidente" },
        { href: "artigos/esocial-sst-pgr-inconsistencia.html", label: "#13 eSocial SST × PGR inconsistência" },
        { href: "artigos/manual-nr1-pdca-gro.html", label: "#14 Manual NR-1 · PDCA do GRO" },
        { href: "artigos/nr12-seguranca-funcional-hazop.html", label: "#15 NR-12 · segurança funcional · HAZOP" },
        { href: "artigos/nr35-ancoragem-falha-barreira.html", label: "#16 NR-35 · ancoragem · falha de barreira" },
        { href: "artigos/nr10-energia-residual-bowtie.html", label: "#17 NR-10 · energia residual · Bow-Tie" },
        { href: "artigos/nr18-oit-construcao.html", label: "#18 NR-18 · OIT construção · CoP" },
        { href: "artigos/nr33-espaco-confinado-analise-risco.html", label: "#19 NR-33 · espaço confinado · falha antes do gás" },
        { href: "artigos/nr23-incendio-vs-bombeiros.html", label: "#20 NR-23 · incêndio vs IT Bombeiros" },
        { href: "artigos/ia-checklist-digital-risco.html", label: "#21 IA · checklist digital · risco" },
        { href: "artigos/sensores-iot-sst-decisao.html", label: "#22 Sensores / IoT · decisão de engenharia" },
        { href: "artigos/treinamento-imersivo-vr-sst.html", label: "#23 Treinamento imersivo (VR) · valor vs marketing" },
        { href: "artigos/esg-ehs-safety-by-design.html", label: "#24 ESG / EHS · Safety by Design (FINAL)" }
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
        { href: "normas-tecnicas.html", label: "Visão geral", className: "sidebar-nr-hub" },
        { href: "normas-gratuitas.html", label: "Gratuitas" },
        { href: "normas-internacionais.html", label: "Internacionais" },
        { href: "normas-por-nr.html", label: "Por NR" },
        {
          type: "group",
          id: "orgaos-setoriais",
          label: "Órgãos setoriais",
          open: false,
          items: [
            { href: "orgaos-setoriais.html", label: "Visão geral", className: "sidebar-nr-hub" },
            { href: "orgaos-setoriais.html#orgao-anm", label: "ANM" },
            { href: "orgaos-setoriais.html#orgao-marinha", label: "Marinha / DPC" },
            { href: "orgaos-setoriais.html#orgao-anp", label: "ANP" },
            { href: "orgaos-setoriais.html#orgao-dfpc", label: "Exército / DFPC" },
            { href: "orgaos-setoriais.html#orgao-anvisa", label: "Anvisa" },
            { href: "orgaos-setoriais.html#orgao-mapa", label: "MAPA" },
            { href: "orgaos-setoriais.html#orgao-bombeiros", label: "Bombeiros" },
            { href: "orgaos-setoriais.html#orgao-aneel", label: "ANEEL" },
            { href: "orgaos-setoriais.html#orgao-inflamaveis", label: "ANP / IBAMA" },
            { href: "orgaos-setoriais.html#orgao-ibama", label: "CONAMA / IBAMA" }
          ]
        }
      ]
    },
    {
      id: "nr",
      label: "NR",
      items: [
        {
          href: "nrs.html#acesso-nrs",
          label: "Acesso às NR atualizadas",
          className: "sidebar-nr-hub"
        },
        {
          type: "group",
          id: "nr-acesso",
          label: "PDFs oficiais (NR-1 a 38)",
          open: false,
          items: NR_OFFICIAL_LINKS
        },
        { href: "curiosidades.html#nr1-pgr", label: "Insight: NR-1 GRO" },
        { href: "curiosidades.html#hazop-nr12", label: "Insight: NR-12 HAZOP" },
        { href: "curiosidades.html#nr35-ancoragem-falha-barreira", label: "Insight: NR-35 ancoragem" },
        { href: "curiosidades.html#nr10-energia-residual-bowtie", label: "Insight: NR-10 energia residual" },
        { href: "curiosidades.html#nr18-oit-construcao", label: "Insight: NR-18 · OIT construção" },
        { href: "curiosidades.html#nr33-espaco-confinado-analise-risco", label: "Insight: NR-33 espaço confinado" },
        { href: "curiosidades.html#nr23-incendio-vs-bombeiros", label: "Insight: NR-23 incêndio vs IT Bombeiros" },
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
        { href: "sobre.html", label: "Quem sou" }
      ]
    }
  ];

  function currentPathname() {
    return window.location.pathname || "";
  }

  function currentFile() {
    var path = currentPathname();
    var parts = path.split("/");
    var file = parts[parts.length - 1] || "index.html";
    if (!file || file.indexOf(".") === -1) return "index.html";
    return file;
  }

  /** Site-relative path of current page (e.g. artigos/foo.html or curiosidades.html). */
  function currentSitePath() {
    var path = currentPathname();
    var marker = "/curiosidades-sst/";
    var idx = path.indexOf(marker);
    if (idx !== -1) {
      var rest = path.slice(idx + marker.length);
      if (!rest || rest.charAt(rest.length - 1) === "/") rest += "index.html";
      return rest;
    }
    // Local file / other hosts: use last segments after stripping leading empties
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return "index.html";
    if (parts[parts.length - 1].indexOf(".") === -1) parts.push("index.html");
    // Prefer trailing artigos/... when present
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

  function resolveHref(href) {
    if (!href || /^https?:\/\//i.test(href) || href.charAt(0) === "#" || href.charAt(0) === "/") {
      return href;
    }
    return basePrefix() + href;
  }

  function isActiveHref(href) {
    if (/^https?:\/\//i.test(href)) return false;
    var sitePath = currentSitePath();
    var file = currentFile();
    var hash = window.location.hash || "";
    var parts = href.split("#");
    var targetPath = parts[0];
    var targetHash = parts[1] ? "#" + parts[1] : "";

    var pathMatches = false;
    if (!targetPath) {
      pathMatches = true;
    } else if (targetPath === sitePath || targetPath === file) {
      pathMatches = true;
    } else if (sitePath === targetPath.replace(/^\.\.\//, "")) {
      pathMatches = true;
    } else if (sitePath.endsWith("/" + targetPath) || sitePath.endsWith(targetPath)) {
      pathMatches = true;
    }

    if (!pathMatches) return false;

    if (targetHash) {
      var targetFile = targetPath || file;
      var targetFileName = targetFile.split("/").pop();
      if (!hash && targetFileName === "nrs.html" && targetHash === "#acesso-nrs") {
        return true;
      }
      if (!hash && targetFileName === "normas-tecnicas.html" && targetHash === "#gratuitos") {
        return true;
      }
      return hash === targetHash;
    }
    return true;
  }

  function topicShouldExpand(topic) {
    // Introdução and NR always open on every page
    if (topic.id === "introducao" || topic.id === "nr") return true;
    if (topic.id === "artigos" && inArtigosSection()) return true;
    var file = currentFile();
    var normasFiles = {
      "normas-tecnicas.html": true,
      "normas-gratuitas.html": true,
      "normas-internacionais.html": true,
      "normas-por-nr.html": true,
      "orgaos-setoriais.html": true
    };
    if (topic.id === "normas-tecnicas" && normasFiles[file]) return true;
    return false;
  }

  function groupShouldExpand(group) {
    if (group.open) return true;
    if (group.id === "nr-acesso" && currentFile() === "nrs.html") return true;
    if (group.id === "orgaos-setoriais" && currentFile() === "orgaos-setoriais.html") return true;
    return false;
  }

  function applyLinkAttrs(a, item) {
    a.href = resolveHref(item.href);
    a.textContent = item.label;
    var classes = [];
    if (item.className) classes.push(item.className);
    if (item.external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      classes.push("sidebar-external");
      a.setAttribute("title", "Abre site oficial (gov.br) em nova aba");
      var cue = document.createElement("span");
      cue.className = "external-cue";
      cue.setAttribute("aria-hidden", "true");
      cue.textContent = " ↗";
      a.appendChild(cue);
    }
    if (classes.length) a.className = classes.join(" ");
    return a;
  }

  function appendLinkItem(parentUl, item, onActive) {
    var subLi = document.createElement("li");
    var a = document.createElement("a");
    applyLinkAttrs(a, item);
    if (isActiveHref(item.href)) {
      a.setAttribute("aria-current", "true");
      if (onActive) onActive();
    }
    subLi.appendChild(a);
    parentUl.appendChild(subLi);
  }

  function appendGroupItem(parentUl, group, onActive) {
    var groupLi = document.createElement("li");
    groupLi.className = "sidebar-group";

    var startOpen = groupShouldExpand(group);
    // If any child is active, force open
    var childActive = (group.items || []).some(function (it) {
      return it.href && isActiveHref(it.href);
    });
    if (childActive) startOpen = true;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sidebar-group-btn";
    btn.setAttribute("aria-expanded", startOpen ? "true" : "false");
    btn.setAttribute("aria-controls", "sidebar-group-" + group.id);
    btn.id = "sidebar-group-btn-" + group.id;

    var label = document.createElement("span");
    label.textContent = group.label;
    btn.appendChild(label);

    var chevron = document.createElement("span");
    chevron.className = "sidebar-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▾";
    btn.appendChild(chevron);

    var panel = document.createElement("ul");
    panel.className = "sidebar-group-items";
    panel.id = "sidebar-group-" + group.id;
    panel.hidden = !startOpen;

    if (group.id === "nr-acesso") {
      var filterWrap = document.createElement("li");
      filterWrap.className = "sidebar-nr-filter-wrap";
      var filter = document.createElement("input");
      filter.type = "search";
      filter.className = "sidebar-nr-filter";
      filter.placeholder = "Filtrar NR…";
      filter.setAttribute("aria-label", "Filtrar PDFs oficiais por número ou nome");
      filter.autocomplete = "off";
      filterWrap.appendChild(filter);
      panel.appendChild(filterWrap);

      filter.addEventListener("input", function () {
        var q = (filter.value || "").trim().toLowerCase();
        panel.querySelectorAll("li").forEach(function (li) {
          if (li.classList.contains("sidebar-nr-filter-wrap")) return;
          var a = li.querySelector("a");
          var text = a ? (a.textContent || "").toLowerCase() : "";
          li.hidden = q !== "" && text.indexOf(q) === -1;
        });
      });

      filter.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      filter.addEventListener("keydown", function (e) {
        e.stopPropagation();
      });
    }

    (group.items || []).forEach(function (item) {
      appendLinkItem(panel, item, function () {
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        if (onActive) onActive();
      });
    });

    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
    });

    groupLi.appendChild(btn);
    groupLi.appendChild(panel);
    parentUl.appendChild(groupLi);

    if (startOpen && onActive && childActive) onActive();
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

    TOPICS.forEach(function (topic) {
      var li = document.createElement("li");
      li.className = "sidebar-topic";

      var startOpen = topicShouldExpand(topic);

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

      function forceTopicOpen() {
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }

      (topic.items || []).forEach(function (item) {
        if (item && item.type === "group") {
          appendGroupItem(panel, item, forceTopicOpen);
        } else {
          appendLinkItem(panel, item, forceTopicOpen);
        }
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
    foot.innerHTML = "<strong>Margus Giuliano</strong> · SafeEng";
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

    function ensureNrOpen() {
      var nrBtn = document.getElementById("sidebar-btn-nr");
      var nrPanel = document.getElementById("sidebar-panel-nr");
      if (nrBtn && nrPanel) {
        nrBtn.setAttribute("aria-expanded", "true");
        nrPanel.hidden = false;
      }
      var introBtn = document.getElementById("sidebar-btn-introducao");
      var introPanel = document.getElementById("sidebar-panel-introducao");
      if (introBtn && introPanel) {
        introBtn.setAttribute("aria-expanded", "true");
        introPanel.hidden = false;
      }
      // PDFs oficiais permanecem fechados por padrão (mobile incluso)
    }

    function setOpen(open) {
      document.body.classList.toggle("sidebar-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar temas" : "Abrir temas");
      if (overlay) overlay.hidden = !open;
      if (open) ensureNrOpen();
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
