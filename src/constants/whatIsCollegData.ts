export type Slide =
  | {
      kind: 'hero';
      image: string;
      alt: string;
    } // only a flag
  | {
      kind: 'colleg';
      title: string;
      description: string;
      image: string;
      alt: string;
      classNames: { container: string };
    };

export const whatIsCollegData: Slide[] = [
  {
    kind: 'hero',
    image: 'woman.webp',
    alt: 'What is Colleg image',
  },
  {
    kind: 'colleg',
    title: 'Gestalten. Planen. Umsetzen.',
    description:
      'Du willst verstehen, wie Technik funktioniert – und sie mitgestalten.\n' +
        'Das Kolleg verbindet Theorie mit Praxis – und macht dich zur gefragten Fachkraft.',
    image: 'woman-bau.webp',
    alt: 'Our Mission image',
    classNames: {
      container: 'bg-indigo-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Kreativ denken. Beruflich nutzen.',
    description:
      'Im Kolleg entwickelst du deine gestalterischen Stärken weiter – in Grafik, Kommunikation oder Medien.',
    image: 'woman-photo.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-red-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Wissen, was wirkt.',
    description:
      'Du interessierst dich für Naturwissenschaften, Labor oder Technik?\n' +
        'Im Kolleg wirst du zur Lösungssucherin mit System.',
    image: 'woman-chemie.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-yellow-600',
    },
  },
];
