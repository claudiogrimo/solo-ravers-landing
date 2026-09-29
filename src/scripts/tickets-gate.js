export const formatCountdown = (remainingMs) => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const clock = [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  return days > 0 ? `${days}d ${clock}` : clock;
};

// Astro scopes component CSS with `data-astro-cid-*` attributes on every element.
// The unlocked link is built at runtime, so we must copy those scope attributes
// onto it (and its inner elements), otherwise the scoped rules never match and
// the CTA loses its grid, padding and background.
const collectScopeAttrs = (node) => {
  const attrs = [];
  for (const attr of node?.attributes ?? []) {
    if (attr.name.startsWith('data-astro-cid-')) attrs.push(attr.name);
  }
  return attrs;
};

const scopeMarkup = (scopeAttrs) => {
  const suffix = scopeAttrs.length ? ' ' + scopeAttrs.join(' ') : '';
  return {
    open: suffix,
    inner: suffix,
  };
};

const unlockPaidTicket = (container, ticketUrl) => {
  const price = container.dataset.ticketPrice;
  const scopeAttrs = collectScopeAttrs(container);
  const s = scopeMarkup(scopeAttrs);
  const priceMarkup = price ? `<em class="ticket-price"${s.inner}>${price}</em>` : '';
  container.innerHTML = `<a class="ticket-action red" data-magnet data-magnet-strength="6" data-ticket-shake href="${ticketUrl}" target="_blank" rel="noopener noreferrer"${s.open}><span${s.inner}>MAIN PARTY AT HUIS VAN IEMAND ANDERS</span><strong${s.inner}>Get tickets</strong><b${s.inner}>↗</b>${priceMarkup}</a>`;
  window.dispatchEvent(new Event('sr:tickets-unlocked'));
};

export const initTicketsGate = (root = document) => {
  root.querySelectorAll('[data-ticket-paid]').forEach((container) => {
    const releaseAt = container.dataset.releaseAt;
    const ticketUrl = container.dataset.ticketUrl;
    const releaseAtMs = releaseAt ? Date.parse(releaseAt) : NaN;
    const countdown = container.querySelector('[data-countdown]');

    if (!ticketUrl || Number.isNaN(releaseAtMs)) return;

    const update = () => {
      const remainingMs = releaseAtMs - Date.now();
      if (remainingMs <= 0) {
        unlockPaidTicket(container, ticketUrl);
        return true;
      }

      if (countdown) countdown.textContent = formatCountdown(remainingMs);
      return false;
    };

    if (!update()) {
      const timer = window.setInterval(() => {
        if (update()) window.clearInterval(timer);
      }, 1000);
    }
  });
};
