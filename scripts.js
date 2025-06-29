// Enkel accordion-funktionalitet
document.querySelectorAll('.accordion button').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    panel.hidden = expanded;
  });
});