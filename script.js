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
    '1': 'Empieza con algo que hoy haces a mano: un formulario de ingreso, un correo, una actualización para un cliente.',
    '2': 'Una herramienta de IA lo lee, entiende qué es lo importante y saca las partes útiles.',
    '3': 'Esa información pasa sola a las herramientas que ya usas, sin copiar y pegar.',
    '4': 'Desde aquí solo funciona. Tú intervienes únicamente cuando algo necesita tu criterio.'
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

  /* ---------- Contact form (sends via WhatsApp, no backend needed) ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  var WHATSAPP_NUMBER = '59173115185';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('cf-name').value.trim();
      var program = document.getElementById('cf-program').value;
      var message = document.getElementById('cf-message').value.trim();

      if (!name || !message) {
        if (formNote) formNote.textContent = 'Por favor completa tu nombre y el mensaje.';
        return;
      }

      var text = 'Hola Eduardo, soy ' + name + '.\n\n'
        + 'Me interesa: ' + program + '\n\n'
        + message;

      var waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

      window.open(waLink, '_blank', 'noopener');

      if (formNote) {
        formNote.textContent = 'Abriendo WhatsApp con tu mensaje listo. Si no se abre, escribe directo al +591 73115185.';
      }
    });
  }

});
