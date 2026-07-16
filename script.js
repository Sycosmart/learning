document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile rail nav toggle ---------- */
  var toggle = document.getElementById('railToggle');
  var nav = document.getElementById('railNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Signature node diagram ---------- */
  var nodes = document.querySelectorAll('.flow-node');
  var lines = document.querySelectorAll('.flow-line');
  var detail = document.getElementById('diagramDetail');

  var captions = {
    '1': 'It starts with something you do by hand today: an intake form, an email, a client update.',
    '2': 'An AI tool reads it, understands what matters, and pulls out the useful parts.',
    '3': 'That information moves automatically into the tools you already use, no copy and paste.',
    '4': 'From here it just runs. You only step in when something needs your judgment.'
  };

  function setActive(nodeNum) {
    nodes.forEach(function (n) {
      n.classList.toggle('active', n.getAttribute('data-node') === nodeNum);
    });
    lines.forEach(function (l) {
      var lineNum = parseInt(l.getAttribute('data-line'), 10);
      l.classList.toggle('lit', lineNum < parseInt(nodeNum, 10));
    });
    if (detail && captions[nodeNum]) {
      detail.textContent = captions[nodeNum];
    }
  }

  nodes.forEach(function (node) {
    var num = node.getAttribute('data-node');
    node.addEventListener('mouseenter', function () { setActive(num); });
    node.addEventListener('focus', function () { setActive(num); });
    node.addEventListener('click', function () { setActive(num); });
  });

  /* ---------- Contact form (mailto handoff, no backend) ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('cf-name').value.trim();
      var program = document.getElementById('cf-program').value;
      var message = document.getElementById('cf-message').value.trim();

      if (!name || !message) {
        if (formNote) formNote.textContent = 'Please fill in your name and message.';
        return;
      }

      var subject = 'Interested in: ' + program;
      var body = 'Hi Eduardo,\n\nMy name is ' + name + '.\n\n' + message + '\n\nProgram of interest: ' + program;

      var mailto = 'mailto:eduardoshandeone123@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      if (formNote) {
        formNote.textContent = 'Opening your email app with this filled in. If nothing opens, email eduardoshandeone123@gmail.com directly.';
      }
    });
  }

});
