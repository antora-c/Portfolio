/* Antora Chattopadhyay, portfolio. No dependencies. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile nav */
  var burger = document.querySelector('.burger');
  var links = document.getElementById('nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* reveal on scroll */
  var rv = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* chapter menu: highlight the section in view */
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('on'); });
          var a = map[en.target.id]; if (a) a.classList.add('on');
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* annotated screens: pins and legend highlight each other */
  document.querySelectorAll('.annot').forEach(function (box) {
    var pins = box.querySelectorAll('.pin');
    var items = box.querySelectorAll('.legend li');
    function set(n, on) {
      pins.forEach(function (p) { if (p.dataset.n === n) p.classList.toggle('on', on); });
      items.forEach(function (li) { if (li.dataset.n === n) li.classList.toggle('on', on); });
    }
    function clear() { pins.forEach(function (p) { p.classList.remove('on'); }); items.forEach(function (li) { li.classList.remove('on'); }); }
    pins.forEach(function (p) {
      p.addEventListener('mouseenter', function () { set(p.dataset.n, true); });
      p.addEventListener('mouseleave', function () { set(p.dataset.n, false); });
      p.addEventListener('click', function (e) {
        e.stopPropagation(); clear(); set(p.dataset.n, true);
        var li = box.querySelector('.legend li[data-n="' + p.dataset.n + '"]');
        if (li && li.scrollIntoView) li.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
      });
    });
    items.forEach(function (li) {
      li.addEventListener('mouseenter', function () { clear(); set(li.dataset.n, true); });
      li.addEventListener('mouseleave', function () { set(li.dataset.n, false); });
    });
  });

  /* lightbox for screens */
  var lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Enlarged screen');
  lb.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  function close() { lb.classList.remove('open'); lbImg.removeAttribute('src'); }
  document.querySelectorAll('.zoom').forEach(function (img) {
    img.addEventListener('click', function () { lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lb.classList.add('open'); });
  });
  lb.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* bracket explorer */
  var seg = document.getElementById('bracket-seg');
  if (seg) {
    var notes = {
      B1: 'No service layer. Every charge, claim and verification is the biller\u2019s to execute, so the table is full of action buttons.',
      B2: 'Spry\u2019s RCM team runs claims, posting and denials, so those rows read \u201cSpry RCM\u201d. The biller still owns eligibility and prior auth.',
      B3: 'Full service stack. The biller mostly monitors. Status is everywhere, action buttons are not.',
      B7: 'No billing software at all. The workspace becomes SPRY Verify, eligibility and prior auth triage, and no charge surfaces exist anywhere.'
    };
    var cells = document.querySelectorAll('table.br [data-b]');
    var note = document.getElementById('bracket-note');
    function pick(b) {
      seg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.b === b ? 'true' : 'false'); });
      cells.forEach(function (c) { var m = c.dataset.b === b; c.classList.toggle('hi', m); c.classList.toggle('dim', !m); });
      note.textContent = notes[b];
    }
    seg.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) pick(b.dataset.b); });
    pick('B2');
  }

  /* stage A / stage B toggle */
  var stageSeg = document.getElementById('stage-seg');
  if (stageSeg) {
    var panels = document.querySelectorAll('.stagebox .panel');
    stageSeg.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      stageSeg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.dataset.stage !== b.dataset.stage; });
    });
  }
})();
