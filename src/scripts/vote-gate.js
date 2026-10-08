// Timed reveal of the DJ-contest winner.
//
// The contest is already closed, so there is no "voting" state: the server renders the
// PENDING block ("vote closed, winner revealed tonight") and, once `vote-announce-at`
// is reached, every `[data-vote-gate]` swaps it for the ANNOUNCED block that ships
// hidden right next to it. No hardcoded state: the flip is driven purely by the
// timestamp already in the markup.
//
// While pending, the block shows a live countdown to the announcement, reusing the same
// formatter as the ticket gate so the two clocks read identically.
//
// The reveal also fires for the LINEUP winner slot (`[data-lineup-winner]`), which ships
// the "TBA" placeholder and carries the winner name in `data-lineup-winner-name`. The
// `sr:winner-announced` event is the single sync point: whichever gate reaches the
// instant first, it drives every surface exactly once.

import { formatCountdown } from './tickets-gate.js';

// Swap the lineup placeholder for the real winner name. Independent of the vote section,
// so the lineup is revealed even if the vote block is absent.
export const revealLineupWinner = (root = document) => {
  root.querySelectorAll('[data-lineup-winner]').forEach((el) => {
    if (el.dataset.revealed === 'true') return;
    const name = el.dataset.lineupWinnerName;
    if (!name) return;
    el.dataset.revealed = 'true';
    el.textContent = name;
  });
};

export const revealWinner = (section) => {
  const pending = section.querySelector('[data-vote-pending]');
  const announced = section.querySelector('[data-vote-announced]');
  if (!pending || !announced) return false;
  if (section.dataset.voteState === 'announced') return true;

  section.dataset.voteState = 'announced';
  pending.hidden = true;
  announced.hidden = false;
  window.dispatchEvent(new Event('sr:winner-announced'));
  return true;
};

export const initVoteGate = (root = document) => {
  // One listener drives the lineup from the shared event; it also runs on direct
  // schedule checks so a page without a vote section still reveals the winner.
  window.addEventListener('sr:winner-announced', () => revealLineupWinner(root));

  root.querySelectorAll('[data-vote-gate]').forEach((section) => {
    const announceAt = section.dataset.voteAnnounceAt;
    const announceAtMs = announceAt ? Date.parse(announceAt) : NaN;
    const countdown = section.querySelector('[data-vote-countdown]');

    // No valid timestamp → leave the server-rendered state untouched (fail-safe).
    if (Number.isNaN(announceAtMs)) return;

    if (Date.now() >= announceAtMs) {
      revealWinner(section);
      revealLineupWinner(root);
      return;
    }

    if (countdown) countdown.textContent = formatCountdown(announceAtMs - Date.now());

    const timer = window.setInterval(() => {
      const remainingMs = announceAtMs - Date.now();
      if (remainingMs <= 0) {
        revealWinner(section);
        revealLineupWinner(root);
        window.clearInterval(timer);
        return;
      }
      if (countdown) countdown.textContent = formatCountdown(remainingMs);
    }, 1000);
  });

  // If there is no vote gate on the page but a lineup winner slot exists, schedule the
  // reveal from its own `data-announce-at` so the two surfaces stay independent.
  if (!root.querySelector('[data-vote-gate]')) {
    root.querySelectorAll('[data-lineup-winner][data-announce-at]').forEach((el) => {
      const at = Date.parse(el.dataset.announceAt);
      if (Number.isNaN(at)) return;
      if (Date.now() >= at) {
        revealLineupWinner(root);
        return;
      }
      const timer = window.setInterval(() => {
        if (Date.now() >= at) {
          revealLineupWinner(root);
          window.clearInterval(timer);
        }
      }, 1000);
    });
  }
};
