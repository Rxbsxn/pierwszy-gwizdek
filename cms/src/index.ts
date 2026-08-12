const initialLandingPage = {
  seo: {
    title: 'Pierwszy Gwizdek — szkółka piłkarska dla dzieci',
    description: 'Pierwszy Gwizdek — przyjazna szkółka piłkarska dla dzieci w Wierzchosławicach. Treningi, zabawa i rozwój w dobrej drużynie.',
  },
  navigation: {
    brandPrefix: 'Pierwszy', brandAccent: 'Gwizdek', ctaLabel: 'Zapisz dziecko',
    items: [
      { label: 'O nas', target: '#o-nas' },
      { label: 'Treningi', target: '#harmonogram' },
      { label: 'Gdzie gramy?', target: '#miejsce' },
    ],
  },
  hero: {
    eyebrow: 'Piłkarska przygoda zaczyna się tutaj', title: 'Małe kroki.', titleAccent: 'Wielka pasja.',
    lead: 'Tworzymy miejsce, w którym dzieci rozwijają sprawność, pewność siebie i przyjaźnie — z piłką przy nodze i uśmiechem na twarzy.',
    primaryCtaLabel: 'Umów trening próbny', secondaryCtaLabel: 'Zobacz harmonogram',
    trustTitle: 'Dołącz do naszej drużyny', trustText: 'Pierwszy trening jest bezpłatny',
    badgeValue: '100%', badgeText: 'dobrej energii',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Dziecięca drużyna piłkarska podczas treningu',
  },
  intro: {
    kicker: 'Dlaczego Pierwszy Gwizdek?', heading: 'Więcej niż piłka.', headingSecondLine: 'To dobry początek.',
    text: 'Bez presji na wynik i bez siedzenia na ławce. Każde dziecko bierze udział, poznaje swoje możliwości i czuje się ważną częścią drużyny.',
  },
  benefits: [
    { icon: '⚽', title: 'Radość z ruchu', text: 'Uczymy przez zabawę, budując naturalną miłość do sportu.', color: 'lime' },
    { icon: '🤝', title: 'Drużyna i przyjaźń', text: 'Współpraca, szacunek i wspólne małe zwycięstwa.', color: 'yellow' },
    { icon: '🌱', title: 'Rozwój krok po kroku', text: 'Trening dopasowany do wieku i możliwości każdego dziecka.', color: 'blue' },
  ],
  schedule: {
    kicker: 'Znajdź swoją drużynę', heading: 'Harmonogram treningów',
    description: 'Zajęcia w małych grupach, dopasowane do wieku i poziomu zaawansowania.',
    note: 'Harmonogram może ulec zmianie — potwierdź termin przed pierwszym treningiem.', cardCtaLabel: 'Zapytaj o miejsce',
  },
  groups: [
    { age: '4–6 lat', name: 'Skrzaty', days: 'Wtorek i czwartek', time: '16:00–17:00', color: 'lime' },
    { age: '7–9 lat', name: 'Żaki', days: 'Poniedziałek i środa', time: '17:00–18:15', color: 'yellow' },
    { age: '10–12 lat', name: 'Orliki', days: 'Wtorek i piątek', time: '17:15–18:30', color: 'blue' },
  ],
  location: {
    kicker: 'Gramy blisko Ciebie', heading: 'Spotkajmy się', headingSecondLine: 'na boisku!',
    text: 'Trenujemy w Wierzchosławicach, w bezpiecznym i wygodnym miejscu z dobrym dojazdem dla rodzin z okolicy.',
    place: 'Wierzchosławice', region: 'województwo małopolskie', mapLabel: 'Wierzchosławice',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wierzchos%C5%82awice%20Ma%C5%82opolskie', mapCtaLabel: 'Otwórz w Mapach Google',
  },
  contact: {
    kicker: 'Gotowi na pierwszy gwizdek?', heading: 'Przyjdźcie i zagrajcie z nami!',
    text: 'Zostaw kontakt — opowiemy o grupach i wspólnie wybierzemy najlepszy termin pierwszych zajęć.',
    buttonLabel: 'Napisz do nas', email: 'kontakt@pierwszygwizdek.pl', emailSubject: 'Trening próbny',
  },
  footer: { description: 'Piłkarska przygoda dla dzieci w Wierzchosławicach.', copyrightName: 'Pierwszy Gwizdek' },
};

export default {
  register() {},
  async bootstrap({ strapi }) {
    const documents = strapi.documents('api::landing-page.landing-page');
    const existing = await documents.findFirst();
    if (!existing) {
      await documents.create({ data: initialLandingPage, status: 'published' });
      strapi.log.info('Created and published the initial Landing Page content.');
    }
  },
};
