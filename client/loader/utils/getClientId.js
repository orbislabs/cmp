export default function getClientID() {
  const scriptElement = document.getElementById('pluto-cmp-js-src');
  const clientId = (scriptElement) ? scriptElement.getAttribute('client-id') : 0;
  return clientId;
}