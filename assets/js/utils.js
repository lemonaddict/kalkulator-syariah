// assets/js/utils.js
const BASE_PATH = window.location.pathname.includes('/kalkulator-syariah')
  ? '/kalkulator-syariah'
  : '';

// Fungsi untuk include komponen HTML
async function includeHTML(id, relativePath) {
  const html = await fetch(`${BASE_PATH}/${relativePath}`).then(r => r.text());
  document.getElementById(id).innerHTML = html;

  // Setelah komponen dimuat, perbaiki semua link di dalamnya
  fixLinks(`#${id}`);
}

// Fungsi untuk menyesuaikan href di <a> agar sesuai base path
function fixLinks(selector) {
  document.querySelectorAll(`${selector} a`).forEach(a => {
    const href = a.getAttribute('href');
    if (!href.startsWith('http') && !href.startsWith('#')) {
      // Kalau dia nggak absolut, tambahkan BASE_PATH di depan
      // dan normalisasi supaya ga double "../" atau "pages/pages"
      a.href = `${BASE_PATH}/${href}`.replace(/\/{2,}/g, '/');
    }
  });
}
