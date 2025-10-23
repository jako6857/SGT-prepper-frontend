/**
 * Hash-router der arbejder med HTML-strenge
 * @param {*} routes 
 * @param {*} sel 
 */
export async function router(routes, sel = '#container') {
  // Find container-elementet hvor sidens indhold skal vises
  const el = document.querySelector(sel);

  // Funktion der renderer baseret på aktuel hash (#/route)
  const render = async () => {
    // Læs ruten fra hash (uden #). Brug "/" som standard.
    const key = location.hash.slice(1) || '/';

    // Slå view op i routes. Brug "*" som fallback. Ellers tom streng.
    const v = routes[key] ?? routes['*'] ?? '';
    // Hvis v er en funktion, kald den og brug retur-HTML. Ellers brug værdien direkte.    
    const output = (typeof v === 'function') ? await v() : v;

    // Ryd altid containeren først
    el.innerHTML = '';

    if (output instanceof Node) {
      el.append(output);      // DOM-node → indsæt direkte
    } else {
      el.innerHTML = String(output);   // HTML-streng → render som HTML
    }
  };

  // Kør render når hash ændrer sig, og også én gang ved load
  addEventListener('hashchange', render);
  render();
}

// Programmatisk navigation: skift hash (triggere render)
export const go = (path) => (location.hash = path);
