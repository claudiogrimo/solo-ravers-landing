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

// Build the unlocked CTA markup. Reused both for the first unlock and for every later
// price switch, so the link/price always reflect the currently active tier.
const paidTicketMarkup = (container, ticketUrl, price) => {
  const scopeAttrs = collectScopeAttrs(container);
  const s = scopeMarkup(scopeAttrs);
  const priceMarkup = price ? `<em class="ticket-price"${s.inner}>${price}</em>` : '';
  return `<a class="ticket-action red" data-magnet data-magnet-strength="6" data-ticket-shake href="${ticketUrl}" target="_blank" rel="noopener noreferrer"${s.open}><span${s.inner}>MAIN PARTY AT HUIS VAN IEMAND ANDERS</span><strong${s.inner}>Get tickets</strong><b${s.inner}>↗</b>${priceMarkup}</a>`;
};

const unlockPaidTicket = (container, ticketUrl, price) => {
  container.innerHTML = paidTicketMarkup(container, ticketUrl, price);
  window.dispatchEvent(new Event('sr:tickets-unlocked'));
};

// After the first unlock the CTA is a live <a>. A later tier switch only rewrites its
// href (and the price badge) in place — no re-mount, no re-animation.
const updatePaidTicket = (container, ticketUrl, price) => {
  const link = container.querySelector('a.ticket-action');
  if (!link) {
    unlockPaidTicket(container, ticketUrl, price);
    return;
  }
  link.setAttribute('href', ticketUrl);
  const priceEl = container.querySelector('.ticket-price');
  if (price) {
    if (priceEl) {
      priceEl.textContent = price;
    } else {
      const scopeAttrs = collectScopeAttrs(container);
      const s = scopeMarkup(scopeAttrs);
      link.insertAdjacentHTML('beforeend', `<em class="ticket-price"${s.inner}>${price}</em>`);
    }
  } else if (priceEl) {
    priceEl.remove();
  }
};

// Tiers arrive as an ordered list (first = opening tier, `startsAtIso` null). The active
// tier is the last one whose `startsAtIso` has passed.
export const activeTier = (tiers, nowMs) => {
  let current = tiers[0];
  for (const tier of tiers) {
    const at = tier.startsAtIso ? Date.parse(tier.startsAtIso) : NaN;
    if (Number.isNaN(at) || at <= nowMs) current = tier;
  }
  return current;
};

export const initTicketsGate = (root = document) => {
  root.querySelectorAll('[data-ticket-paid]').forEach((container) => {
    const releaseAt = container.dataset.releaseAt;
    const releaseAtMs = releaseAt ? Date.parse(releaseAt) : NaN;
    const countdown = container.querySelector('[data-countdown]');

    let tiers = [];
    try {
      tiers = JSON.parse(container.dataset.ticketTiers || '[]');
    } catch {
      tiers = [];
    }
    if (!tiers.length) return;

    // Guard against a missing opening instant: fall back to the first tier's own URL.
    if (Number.isNaN(releaseAtMs)) return;

    const update = () => {
      const nowMs = Date.now();

      // Before the opening release: stay locked, tick the countdown.
      if (nowMs < releaseAtMs) {
        if (countdown) countdown.textContent = formatCountdown(releaseAtMs - nowMs);
        return tiers[0];
      }

      const tier = activeTier(tiers, nowMs);
      if (nowMs >= releaseAtMs && container.dataset.ticketTierUrl !== tier.url) {
        container.dataset.ticketTierUrl = tier.url;
        if (container.querySelector('a.ticket-action')) {
          updatePaidTicket(container, tier.url, tier.price);
        } else {
          unlockPaidTicket(container, tier.url, tier.price);
        }
      }
      return tier;
    };

    update();
    window.setInterval(update, 1000);
  });
};
