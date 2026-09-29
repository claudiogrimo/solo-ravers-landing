export const formatCountdown = (remainingMs) => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const clock = [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  return days > 0 ? `${days}d ${clock}` : clock;
};

const unlockPaidTicket = (container, ticketUrl) => {
  const price = container.dataset.ticketPrice;
  const priceMarkup = price ? `<em class="ticket-price">${price}</em>` : '';
  container.innerHTML = `<a class="ticket-action red" data-magnet data-magnet-strength="6" data-ticket-shake href="${ticketUrl}" target="_blank" rel="noopener noreferrer"><span>MAIN PARTY AT HUIS VAN IEMAND ANDERS</span><strong>Get tickets</strong><b>↗</b>${priceMarkup}</a>`;
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
