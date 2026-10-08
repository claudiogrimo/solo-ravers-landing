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
  // Ticket tiers. Prices are the totals the buyer pays. Order matters: first tier is the
  // one opening at the release above. Later tiers carry their switch-over instants so the
  // schedule can be shown publicly:
  //   - Second release 15 euro: Wednesday 14 October 2026, 21:30 Europe/Rome (CEST, UTC+2),
  //     i.e. one week before the event.
  //   - Final release 20 euro: Monday 19 October 2026, 21:30 Europe/Rome, i.e. the last 48h.
  ticketTiers: [
    { label: 'First release', price: '8 euro', featured: true, startsAtIso: null, windowLabel: 'Until Tue 13 Oct' },
    { label: 'Second release', price: '15 euro', featured: false, startsAtIso: '2026-10-14T19:30:00Z', windowLabel: 'From Wed 14 Oct, 21:30' },
    { label: 'Final release', price: '20 euro', featured: false, startsAtIso: '2026-10-19T19:30:00Z', windowLabel: 'From Mon 19 Oct, 21:30' },
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
      time: '21:30 - late',
      venue: 'Huis van Iemand Anders',
      address: 'Van Woustraat 2Hs, Amsterdam',
      ticket: 'Separate ticket required',
      note: 'Main-party tickets are sold separately. Tapmarin is just a short walk away.',
      href: 'https://ra.co/events/2521472',
      action: 'Get tickets',
      tone: 'red',
    },
  ],
  // Slot 05 is the DJ contest winner. Until the announcement (see contestWinner and
  // voteClosesAtIso) it shows the TBA placeholder; the Lineup gate swaps it at that instant.
  lineup: ['Clodol', 'oatmilk', 'DE//SIRE', 'SLURPiSS'],
  lineupWinnerPlaceholder: 'TBA',
  b2b: ['Clodol', 'oatmilk'],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Huis+van+Iemand+Anders+Van+Woustraat+2Hs+Amsterdam',
  ticketUrl: 'https://ra.co/events/2521472',
};
