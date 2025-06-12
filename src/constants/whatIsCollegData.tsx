import { Highlight } from '@components/visual/Highlight';
import type { JSX } from 'react';

export type Slide =
  | {
      kind: 'hero';
      image: string;
      alt: string;
    } // only a flag
  | {
      kind: 'colleg';
      title: string;
      description: string | JSX.Element;
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
    title: 'Bautechnik.',
    description: (
      <>
        Im Kolleg für Bautechnik lernst du alles rund um{' '}
        <Highlight>Planung, Konstruktion, Bauphysik und Projektmanagement</Highlight>
        .<br />
        <br />
        Die Ausbildung verknüpft technisches Know-how mit Zukunftsthemen wie Nachhaltigkeit und
        Digitalisierung – etwa durch <Highlight>
          Building Information Modeling (BIM)
        </Highlight> oder <Highlight>energieeffiziente Bauweisen</Highlight>
        .<br />
        <br />
        Du wirst optimal vorbereitet für Positionen in{' '}
        <Highlight>Architektur-, Bau- und Ingenieurbüros</Highlight> oder im öffentlichen Dienst.
        Mit diesem Praxiswissen gestaltest du die Welt von morgen mit.
      </>
    ),
    image: 'woman-bau.webp',
    alt: 'Our Mission image',
    classNames: {
      container: 'bg-indigo-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Kunst & Design.',
    description: (
      <>
        Das Kolleg für <Highlight>Kunst & Design</Highlight> gibt dir Raum, deine gestalterischen
        Talente zu entfalten – ob in Grafikdesign, Produktgestaltung, Multimedia oder
        Innenarchitektur.
        <br />
        <br />
        Du arbeitest mit modernen Tools, entwickelst eigene Projekte und baust ein{' '}
        <Highlight>überzeugendes Portfolio</Highlight> auf.
        <br />
        <br />
        Die <Highlight>praxisnahe Ausbildung</Highlight> eröffnet dir Wege in die Kreativwirtschaft
        – oder bildet die perfekte Basis für ein{' '}
        <Highlight>weiterführendes Designstudium</Highlight>.
      </>
    ),
    image: 'woman-photo.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-red-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Chemie.',
    description: (
      <>
        Das Kolleg der Chemie Akademie vermittelt dir in nur <Highlight>4 Semestern</Highlight> ein
        fundiertes Wissen in allen Bereichen der Chemie.
        <br />
        <br />
        Dank eines <Highlight>sehr hohen Laboranteils</Highlight> setzt du Theorie sofort in die
        Praxis um. Während deiner Diplomarbeit begleiten dich renommierte Industriebetriebe des
        Landes – ideale Voraussetzungen für den direkten Berufseinstieg und{' '}
        <Highlight>exzellente Aufstiegschancen</Highlight>.
        <br />
        <br />
        Ein <Highlight>praxisorientierter Lehrplan und modernste Labors</Highlight> an unserem
        top-ausgestatteten Standort schaffen die besten Voraussetzungen für deine erfolgreiche
        Zukunft.
      </>
    ),
    image: 'chemie-mirrored.webp', // bleibt gleich
    alt: 'Kolleg Chemie image',
    classNames: {
      container: 'bg-yellow-600',
    },
  },
  {
    kind: 'colleg',
    title: 'Technik & Informatik.',
    description: (
      <>
        <p>
          <Highlight>Digitalisierung, Automatisierung & Innovation</Highlight> – vereint in einer
          praxisnahen Ausbildung für zukunftsweisende technische Berufe.
        </p>
        <br />
        <ul className="list-disc ml-4 text-left space-y-1">
          <li>
            <strong>Informatik:</strong> Programmieren, KI & Software
          </li>
          <li>
            <strong>E-Technologies:</strong> Energie & Automatisierung
          </li>
          <li>
            <strong>Elektronik:</strong> Mikrocontroller & Embedded
          </li>
          <li>
            <strong>Maschinenbau:</strong> Konstruktion & Fertigung
          </li>
        </ul>
        <br />
        <p>
          Du wirst fit für die <Highlight>Industrie 4.0</Highlight> – mit{' '}
          <Highlight>vielseitigen Karrierechancen</Highlight> in Technik und IT.
        </p>
      </>
    ),
    image: 'woman.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-green-600',
    },
  },
];
