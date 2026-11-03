/* Prerequisite and postrequisite graph of each definition and result.
   Reads dependency-graph.json (tools/build_dependency_graph.py): an edge [A, B]
   means A uses B, so B is a prerequisite of A.  No library: plain SVG.
   Three graphs, all reading top to bottom (prerequisites above, what uses them below),
   with arrows pointing from what is used to what uses it:
   - under every #def-/#thm-/#lem-/#prp-/#cor- div, a foldable block (folded by default)
     holds one labeled graph focused on that div, DEPTH levels each way;
   - an element with id "dependency-graph-page" gets a folded labeled graph of every div on its page;
   - an element with id "dependency-graph-site" gets one tree of every div on the site, and an
     element with id "dependency-graph-all" and a data-json attribute (comma-separated URLs of
     several sites' dependency-graph.json) gets one tree of all those sites together.
     These have hundreds of nodes, so their boxes carry no text: the kind and title show as hovertext. */
(function () {
  "use strict";
  var DEPTH = 2, NS = "http://www.w3.org/2000/svg";
  /* A per-div graph is small, so each box carries its clipped title.  A site-wide or cross-site
     tree has hundreds of nodes, so its boxes carry no text, which keeps the structure compact. */
  var LABELED = { W: 200, H: 34, GX: 16, GY: 36, PER_ROW: 4 };
  var COMPACT = { W: 16, H: 16, GX: 4, GY: 22, PER_ROW: 80 };
  /* The div colors of the notes (custom-callout in _quarto-website.yml); a theorem shares a lemma's blue. */
  var COLOR = { def: "#1B5E20", thm: "#1565C0", lem: "#1565C0", cor: "#00838F", prp: "#827717" };
  var NAME = { def: "Definition", thm: "Theorem", lem: "Lemma", cor: "Corollary", prp: "Proposition" };
  var script = document.currentScript;
  var base = script ? script.src.replace(/[^/]*$/, "") : "";
  var page = location.pathname.split("/").pop().replace(/\.html$/, "") || "index";

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function href(n, g) {
    if (n.url) return n.url;
    if (n.site !== g.site && g.bases && g.bases[n.site]) return g.bases[n.site] + n.page + ".html#" + n.div;
    return (n.page === page ? "" : n.page + ".html") + "#" + n.div;
  }
  function clip(s) { return s.length > 30 ? s.slice(0, 29) + "…" : s; }
  function tip(n, g) {
    return (NAME[n.kind] || n.kind) + ": " + n.title +
      (n.site !== g.site ? " (" + n.site + ")" : n.external ? " (another site)" : "");
  }

  /* Draw `levels` (top to bottom; arrays of nodes) with `edges` ([prereq, dependent] key pairs).
     A level wider than PER_ROW wraps onto further rows.  `compact` draws unlabeled boxes. */
  function draw(levels, edges, focus, g, compact) {
    var D = compact ? COMPACT : LABELED, W = D.W, H = D.H, GX = D.GX, GY = D.GY, PER_ROW = D.PER_ROW;
    var rows = [];
    levels.forEach(function (l) {
      for (var i = 0; i < l.length; i += PER_ROW) rows.push(l.slice(i, i + PER_ROW));
    });
    var cols = Math.max.apply(null, rows.map(function (r) { return r.length; }));
    var w = cols * (W + GX) - GX, h = rows.length * (H + GY) - GY;
    var uid = "dg-arrow-" + (draw.n = (draw.n || 0) + 1);
    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, width: w, role: "img",
      "aria-label": "Prerequisites above, postrequisites below" }), pos = {};
    var defs = el("defs", {}, svg);
    var mk = el("marker", { id: uid, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: compact ? 4 : 6,
      markerHeight: compact ? 4 : 6, orient: "auto-start-reverse" }, defs);
    el("path", { d: "M0 0L10 5L0 10z", fill: "#888" }, mk);
    rows.forEach(function (r, i) {
      var off = (w - (r.length * (W + GX) - GX)) / 2;
      r.forEach(function (n, j) { pos[n.id] = { x: off + j * (W + GX), y: i * (H + GY) }; });
    });
    edges.forEach(function (e) {
      var a = pos[e[0]], b = pos[e[1]];
      if (!a || !b) return;
      var x1 = a.x + W / 2, y1 = a.y + H, x2 = b.x + W / 2, y2 = b.y, my = (y1 + y2) / 2;
      el("path", { d: "M" + x1 + " " + y1 + "C" + x1 + " " + my + " " + x2 + " " + my + " " + x2 + " " + y2,
        fill: "none", stroke: "#888", "stroke-width": compact ? 0.6 : 1.2, "stroke-opacity": compact ? 0.5 : 1,
        "marker-end": "url(#" + uid + ")" }, svg);
    });
    rows.forEach(function (r) {
      r.forEach(function (n) {
        var p = pos[n.id];
        var a = el("a", { href: href(n, g) }, svg);
        var attrs = { x: p.x, y: p.y, width: W, height: H, rx: compact ? 3 : 6, fill: COLOR[n.kind] || "#555",
          stroke: n.id === focus ? "#000" : "#fff", "stroke-width": n.id === focus ? 3 : 1 };
        if (n.external) attrs["stroke-dasharray"] = "4 2";
        el("rect", attrs, a);
        var label = tip(n, g);
        el("title", {}, a).textContent = label;
        a.setAttribute("aria-label", label);
        if (!compact) {
          var t = el("text", { x: p.x + 8, y: p.y + H / 2 + 4, "font-size": 12, fill: "#fff" }, a);
          t.textContent = clip(n.title);
        }
      });
    });
    return svg;
  }

  function legend(kinds, compact) {
    var p = document.createElement("p");
    p.style.cssText = "font-size:0.85em;margin:0.4em 0";
    Object.keys(NAME).filter(function (c) { return kinds[c]; }).forEach(function (c) {
      var sw = document.createElement("span");
      sw.style.cssText = "display:inline-block;width:0.9em;height:0.9em;border-radius:3px;margin:0 0.3em 0 0.9em;" +
        "vertical-align:-0.1em;background:" + COLOR[c];
      p.appendChild(sw);
      p.appendChild(document.createTextNode(NAME[c]));
    });
    var note = document.createElement("span");
    note.style.cssText = "display:block;margin-top:0.2em";
    note.textContent = (compact ? "Hover a box for its name; click it to open the page. " : "") +
      "Arrows point from what is used to what uses it. A dashed box is on another site.";
    p.appendChild(note);
    return p;
  }

  function neighbors(adj, start, depth) {
    var dist = {}, queue = [start];
    dist[start] = 0;
    while (queue.length) {
      var v = queue.shift();
      if (dist[v] >= depth) continue;
      (adj[v] || []).forEach(function (w) { if (!(w in dist)) { dist[w] = dist[v] + 1; queue.push(w); } });
    }
    return dist;
  }

  function perDiv(g, nodes, uses, usedBy) {
    Object.keys(nodes).forEach(function (k) {
      var n = nodes[k];
      if (n.site !== g.site || n.page !== page) return;
      var host = document.getElementById(n.div);
      if (!host || (!(uses[k] || []).length && !(usedBy[k] || []).length)) return;
      var pre = neighbors(uses, k, DEPTH), post = neighbors(usedBy, k, DEPTH);
      var levels = [], d;
      for (d = DEPTH; d >= 1; d--) levels.push(Object.keys(pre).filter(function (x) { return pre[x] === d; }));
      levels.push([k]);
      for (d = 1; d <= DEPTH; d++) levels.push(Object.keys(post).filter(function (x) { return post[x] === d; }));
      levels = levels.filter(function (l) { return l.length; }).map(function (l) { return l.map(function (x) { return nodes[x]; }); });
      var ids = {};
      levels.forEach(function (l) { l.forEach(function (x) { ids[x.id] = 1; }); });
      var edges = g.edges.filter(function (e) { return ids[e[0]] && ids[e[1]]; }).map(function (e) { return [e[1], e[0]]; });
      var det = document.createElement("details");
      det.className = "dependency-graph";
      var sum = document.createElement("summary");
      sum.textContent = "Dependencies (" + (Object.keys(pre).length - 1) + " prerequisites, " +
        (Object.keys(post).length - 1) + " postrequisites, up to " + DEPTH + " levels)";
      det.appendChild(sum);
      var kinds = {};
      levels.forEach(function (l) { l.forEach(function (x) { kinds[x.kind] = 1; }); });
      det.appendChild(legend(kinds, false));
      var drawn = false;
      det.addEventListener("toggle", function () {
        if (det.open && !drawn) { drawn = true; var s = document.createElement("div"); s.style.overflowX = "auto";
          s.appendChild(draw(levels, edges, k, g, false)); det.appendChild(s); }
      });
      host.appendChild(det);
    });
  }

  /* Rows of a graph over `keys`: a div sits one row below the lowest div it uses.
     `uses` maps a key to the keys it uses; a cycle is cut where it is first entered. */
  function layers(keys, nodes, uses) {
    var inSet = {}, level = {};
    keys.forEach(function (k) { inSet[k] = 1; });
    function lv(k, seen) {
      if (k in level) return level[k];
      if (seen[k]) return 0;
      seen[k] = 1;
      var m = 0;
      (uses[k] || []).forEach(function (p) { if (inSet[p]) m = Math.max(m, lv(p, seen) + 1); });
      return (level[k] = m);
    }
    keys.forEach(function (k) { lv(k, {}); });
    var levels = [];
    keys.slice().sort().forEach(function (k) { (levels[level[k]] = levels[level[k]] || []).push(nodes[k]); });
    return levels.filter(Boolean);
  }

  function foldedGraph(host, summary, levels, edges, g, compact) {
    var kinds = {};
    levels.forEach(function (l) { l.forEach(function (x) { kinds[x.kind] = 1; }); });
    var det = document.createElement("details");
    det.className = "dependency-graph";
    var sum = document.createElement("summary");
    sum.textContent = summary;
    det.appendChild(sum);
    if (compact) det.appendChild(legend(kinds, true));
    var drawn = false;
    det.addEventListener("toggle", function () {
      if (det.open && !drawn) { drawn = true; var s = document.createElement("div"); s.style.overflowX = "auto";
        s.appendChild(draw(levels, edges, null, g, compact)); det.appendChild(s); }
    });
    host.appendChild(det);
    return det;
  }

  /* Optional: an element with id "dependency-graph-page" gets a folded graph of every
     div on the page, prerequisites at the top. */
  function wholePage(g, nodes, uses) {
    var host = document.getElementById("dependency-graph-page");
    if (!host) return;
    var mine = Object.keys(nodes).filter(function (k) { return nodes[k].site === g.site && nodes[k].page === page; });
    if (!mine.length) return;
    var ids = {};
    mine.forEach(function (k) { ids[k] = 1; });
    var edges = g.edges.filter(function (e) { return ids[e[0]] && ids[e[1]]; }).map(function (e) { return [e[1], e[0]]; });
    foldedGraph(host, "Dependencies of every definition and result on this page (" + mine.length + ")",
      layers(mine, nodes, uses), edges, g, false);
  }

  /* Draw the whole of `g` (a merged graph) into `host`, unlabeled and unfolded. */
  function tree(host, g, nodes, uses, keys) {
    var ids = {};
    keys.forEach(function (k) { ids[k] = 1; });
    var edges = g.edges.filter(function (e) { return ids[e[0]] && ids[e[1]]; }).map(function (e) { return [e[1], e[0]]; });
    var levels = layers(keys, nodes, uses), kinds = {};
    keys.forEach(function (k) { kinds[nodes[k].kind] = 1; });
    var p = document.createElement("p");
    p.textContent = keys.length + " definitions and results, " + edges.length + " dependencies, " + levels.length + " levels.";
    host.appendChild(p);
    host.appendChild(legend(kinds, true));
    var s = document.createElement("div");
    s.style.overflowX = "auto";
    s.appendChild(draw(levels, edges, null, g, true));
    host.appendChild(s);
  }

  /* An element with id "dependency-graph-site" gets a tree of every div on this site. */
  function wholeSite(g, nodes, uses) {
    var host = document.getElementById("dependency-graph-site");
    if (!host) return;
    var mine = Object.keys(nodes).filter(function (k) { return nodes[k].site === g.site && !nodes[k].external; });
    tree(host, g, nodes, uses, mine);
  }

  /* An element with id "dependency-graph-all" and a data-json list of several sites' graphs
     gets one tree of all of them: a node a site only links to (external) is replaced by the
     real node from the site that defines it. */
  function allSites(host) {
    var urls = (host.getAttribute("data-json") || "").split(",").map(function (u) { return u.trim(); }).filter(Boolean);
    Promise.all(urls.map(function (u) {
      return fetch(u).then(function (r) { return r.json(); }).catch(function () { return null; });
    })).then(function (all) {
      var nodes = {}, seen = {}, edges = [], bases = {}, uses = {};
      all.filter(Boolean).forEach(function (j) {
        bases[j.site] = j.base;
        j.nodes.forEach(function (n) { if (!nodes[n.id] || (nodes[n.id].external && !n.external)) nodes[n.id] = n; });
        j.edges.forEach(function (e) { var key = e[0] + " " + e[1]; if (!seen[key]) { seen[key] = 1; edges.push(e); } });
      });
      var keys = Object.keys(nodes);
      if (!keys.length) return;
      edges.forEach(function (e) { (uses[e[0]] = uses[e[0]] || []).push(e[1]); });
      keys.forEach(function (k) { delete nodes[k].url; });
      tree(host, { site: "", edges: edges, bases: bases }, nodes, uses, keys.filter(function (k) { return nodes[k]; }));
    });
  }

  var all = document.getElementById("dependency-graph-all");
  if (all) allSites(all);
  fetch(base + "dependency-graph.json").then(function (r) { return r.json(); }).then(function (g) {
    var nodes = {}, uses = {}, usedBy = {};
    g.nodes.forEach(function (n) { nodes[n.id] = n; });
    g.edges.forEach(function (e) {
      (uses[e[0]] = uses[e[0]] || []).push(e[1]);
      (usedBy[e[1]] = usedBy[e[1]] || []).push(e[0]);
    });
    g.bases = {};
    perDiv(g, nodes, uses, usedBy);
    wholePage(g, nodes, uses);
    wholeSite(g, nodes, uses);
  }).catch(function () { /* the graph is an extra; a missing file leaves the page as it was */ });
})();
