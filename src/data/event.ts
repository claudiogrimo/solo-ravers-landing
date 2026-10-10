export const event = {
  title: 'The Return of Solo Ravers Invite',
  dateLabel: 'Wednesday, 21 October 2026',
  dateIso: '2026-10-21T19:00:00+02:00',
  // First ticket release: Thursday 1 October 2026, 20:30 Europe/Amsterdam (CEST, UTC+2).
  ticketsReleaseAtIso: '2026-10-01T18:30:00Z',
  // DJ contest winner announcement: Thursday 8 October 2026, 21:30 Europe/Rome (CEST, UTC+2).
  // Before this instant the site shows "vote closed, winner revealed tonight"; at it, the
  // winner is revealed. (The contest itself is already over.)
  voteClosesAtIso: '2026-10-08T19:30:00Z',
  // DJ contest winner, revealed at the instant above.
  contestWinner: 'YSKM',
  // Ticket tiers. Prices are the totals the buyer pays. Order matters: `startsAtIso` is the
  // instant each tier becomes active (null = the opening tier). The paid-ticket CTA reads
  // the URL and price of the currently active tier, so the link follows the schedule
  // automatically. Switch-over instants (all 21:30 Europe/Rome, CEST/UTC+2):
  //   - Second release 15 euro: Wednesday 14 October 2026, 21:30 (one week before the event).
  //   - Final release 20 euro: Monday 19 October 2026, 21:30 (the last 48h).
  ticketTiers: [
    { label: 'First release', price: '8 euro', featured: true, startsAtIso: null, windowLabel: 'Until Tue 13 Oct', url: 'https://tally.so/r/xXOJZ5' },
    { label: 'Second release', price: '15 euro', featured: false, startsAtIso: '2026-10-14T19:30:00Z', windowLabel: 'From Wed 14 Oct, 21:30', url: 'https://tally.so/r/rjNAxp' },
    { label: 'Final release', price: '20 euro', featured: false, startsAtIso: '2026-10-19T19:30:00Z', windowLabel: 'From Mon 19 Oct, 21:30', url: 'https://tally.so/r/XxVWVe' },
  ],
  city: 'Amsterdam / De Pijp',
  promoter: 'Solo Ravers',
  genre: 'Techno',
  description:
    "What started four years ago as an ADE WhatsApp group has grown into a global movement. After last year's debut event, we are returning to Amsterdam for round two.",
  parts: [
    {
      number: '01',
      name: 'Pre-drinks',
      time: '19:00 - 21:30',
      venue: 'Tapmarin',
      address: 'Van Woustraat 130, 1073 LT Amsterdam',
      ticket: 'Free RA pass',
      note: 'This pass grants access only to the pre-drinks gathering. It does not grant entry to the main party.',
      href: 'https://ra.co/events/2521472',
      action: 'Claim free pass',
      tone: 'acid',
    },
    {
      number: '02',
      name: 'Main event',
      time: '21:30 - 02:30',
      venue: 'Huis van Iemand Anders',
      address: 'Van Woustraat 2Hs, Amsterdam',
      ticket: 'Separate ticket required',
      note: 'Main-party tickets are sold separately. Tapmarin is just a short walk away.',
      href: 'https://ra.co/events/2521472',
      action: 'Get tickets',
      tone: 'red',
    },
  ],
  // Lineup in order of appearance, each with its set window. `winner: true` marks the DJ
  // contest slot: it renders `lineupWinnerPlaceholder` (TBA) until the announcement (see
  // contestWinner and voteClosesAtIso), then the Lineup gate swaps in the real name.
  // `b2b: true` marks a back-to-back set. The two b2b acts are listed as separate rows
  // that share the same slot window; the `b2bGroup` key ties them together visually.
  lineup: [
    { name: 'YSKM', slot: '21:30 / 22:45', winner: true, b2b: false, b2bGroup: null },
    { name: 'Clodol', slot: '22:45 / 00:00', winner: false, b2b: true, b2bGroup: 'clodol-oatmilk' },
    { name: 'oatmilk', slot: '22:45 / 00:00', winner: false, b2b: true, b2bGroup: 'clodol-oatmilk' },
    { name: 'SLURPiSS', slot: '00:00 / 01:15', winner: false, b2b: false, b2bGroup: null },
    { name: 'DE//SIRE', slot: '01:15 / 02:30', winner: false, b2b: false, b2bGroup: null },
  ],
  lineupWinnerPlaceholder: 'TBA',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Huis+van+Iemand+Anders+Van+Woustraat+2Hs+Amsterdam',
  ticketUrl: 'https://ra.co/events/2521472',
};
