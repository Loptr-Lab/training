/* Optional device-local reading preferences. No requests or participant data. */
(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'loptr-training-display';
  const loptrHome = 'https://loptrlab.com/';
  const trainingHome = 'https://loptrlab.com/training/';
  let preferences = { theme: 'dark', size: 'standard' };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && ['dark', 'light', 'system'].includes(saved.theme)) preferences.theme = saved.theme;
    if (saved && ['standard', 'large', 'largest'].includes(saved.size)) preferences.size = saved.size;
  } catch (_) { /* Reading remains available when storage is blocked. */ }
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    root.dataset.theme = preferences.theme === 'system' ? (system.matches ? 'dark' : 'light') : preferences.theme;
    root.dataset.textSize = preferences.size;
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.masthead');
    if (!header) return;
    const breadcrumbData = document.getElementById('site-breadcrumbs');
    if (breadcrumbData && !document.querySelector('.site-breadcrumbs')) {
      try {
        const data = JSON.parse(breadcrumbData.textContent);
        const items = Array.isArray(data.itemListElement) ? data.itemListElement : [];
        const normalized = items.map((item) => {
          const entry = { ...item };
          if (entry.name === 'Loptr Lab Training') entry.name = 'Training';
          if (typeof entry.item === 'string' && entry.item.includes('/training/')) {
            entry.item = trainingHome + entry.item.split('/training/').slice(1).join('/training/');
          }
          return entry;
        });

        if (!normalized.some((item) => item.name === 'Loptr Lab')) {
          normalized.unshift({
            '@type': 'ListItem',
            position: 1,
            name: 'Loptr Lab',
            item: loptrHome
          });
        }
        if (normalized.length > 1 && normalized[1].name === 'Training') {
          normalized[1].item = trainingHome;
        } else if (normalized.length && normalized[0].name !== 'Training' && normalized[0].name !== 'Loptr Lab') {
          normalized.splice(1, 0, {
            '@type': 'ListItem',
            position: 2,
            name: 'Training',
            item: trainingHome
          });
        }
        normalized.forEach((item, index) => { item.position = index + 1; });
        data.itemListElement = normalized;
        breadcrumbData.textContent = JSON.stringify(data);

        // BreadcrumbList remains available to search engines, but no second visible navigation is rendered.

      } catch (_) { /* Structured data remains available if display rendering fails. */ }
    }
    const settings = document.createElement('details');
    settings.className = 'display-settings';
    settings.innerHTML = '<summary>Reading settings</summary><div class="display-controls"><label>Theme<select name="training-theme"><option value="dark">Dark</option><option value="light">Dim light</option><option value="system">Use device setting</option></select></label><label>Text size<select name="training-text-size"><option value="standard">Standard</option><option value="large">Large</option><option value="largest">Largest</option></select></label></div>';
    header.prepend(settings);
    const theme = settings.querySelector('[name=training-theme]');
    const size = settings.querySelector('[name=training-text-size]');
    theme.value = preferences.theme;
    size.value = preferences.size;
    settings.addEventListener('change', () => {
      preferences = { theme: theme.value, size: size.value };
      apply();
      try { localStorage.setItem(key, JSON.stringify(preferences)); } catch (_) { /* Session-only fallback. */ }
    });
  });
})();
