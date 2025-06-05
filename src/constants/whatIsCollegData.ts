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
    title: 'Lorem i',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    image: 'woman-bau.webp',
    alt: 'Our Mission image',
    classNames: {
      container: 'bg-indigo-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Lorem i',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    image: 'woman-photo.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-red-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Lorem i',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    image: 'woman-chemie.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-yellow-600',
    },
  },
];
