import { Highlight } from '@components/visual/Highlight';
import type { JSX } from 'react';

/** ------------------------------------------------------------
 *  Datensätze für den „Was ist ein Kolleg?“-Scroller
 * ----------------------------------------------------------- */
export type Slide =
  | {
      kind: 'hero';
      image: string;
      alt: string;
    }
  | {
      kind: 'colleg';
      title: string;
      description: JSX.Element; // immer JSX, nie roher String
      image: string;
      alt: string;
      classNames: { container: string };
    };

export const whatIsCollegData: Slide[] = [
  /* ------------------------------------------------ HERO */
  {
    kind: 'hero',
    image: 'woman.webp',
    alt: 'Studentin am Kolleg',
  },

  /* -------------------------------------------- BAUTECHNIK */
  {
    kind: 'colleg',
    title: 'Bautechnik.',
    description: (
      <>
        <p>
          Im Kolleg für Bautechnik lernst du alles rund um&nbsp;
          <Highlight>Planung, Konstruktion, Bauphysik und Projektmanagement</Highlight>.
        </p>

        <p className="mt-4">
          Die Ausbildung verknüpft technisches Know-how mit Zukunftsthemen wie Nachhaltigkeit und
          Digitalisierung – etwa durch&nbsp;
          <Highlight>Building&nbsp;Information Modeling&nbsp;(BIM)</Highlight> oder&nbsp;
          <Highlight>energieeffiziente Bauweisen</Highlight>.
        </p>

        <p className="mt-4">
          Du wirst optimal vorbereitet für Positionen in&nbsp;
          <Highlight>Architektur-, Bau- und Ingenieurbüros</Highlight> oder im öffentlichen Dienst.
          Mit diesem Praxiswissen gestaltest du die Welt von morgen mit.
        </p>
      </>
    ),
    image: 'woman-bau.webp',
    alt: 'Unser Bautechnik-Kolleg',
    classNames: { container: 'bg-indigo-600' },
  },

  /* ---------------------------------------- KUNST & DESIGN */
  {
    kind: 'colleg',
    title: 'Kunst & Design.',
    description: (
      <>
        <p>
          Das Kolleg für <Highlight>Kunst & Design</Highlight> gibt dir Raum, deine gestalterischen
          Talente zu entfalten – ob in Grafikdesign, Produktgestaltung, Multimedia oder
          Innenarchitektur.
        </p>

        <p className="mt-4">
          Du arbeitest mit modernen Tools, entwickelst eigene Projekte und baust ein&nbsp;
          <Highlight>überzeugendes Portfolio</Highlight> auf.
        </p>

        <p className="mt-4">
          Die <Highlight>praxisnahe Ausbildung</Highlight> eröffnet dir Wege in die
          Kreativwirtschaft – oder bildet die perfekte Basis für ein&nbsp;
          <Highlight>weiterführendes Designstudium</Highlight>.
        </p>
      </>
    ),
    image: 'woman-photo.webp',
    alt: 'Kunst & Design',
    classNames: { container: 'bg-red-600' },
  },

  /* ------------------------------------------------ CHEMIE */
  {
    kind: 'colleg',
    title: 'Chemie.',
    description: (
      <>
        <p>
          Das Kolleg der Chemie Akademie vermittelt dir in nur&nbsp;
          <Highlight>4 Semestern</Highlight> ein fundiertes Wissen in allen Bereichen der Chemie.
        </p>

        <p className="mt-4">
          Dank eines <Highlight>hohen Laboranteils</Highlight> setzt du Theorie sofort in die Praxis
          um. Während deiner Diplomarbeit begleiten dich renommierte Industriebetriebe des Landes –
          ideale Voraussetzungen für den direkten Berufseinstieg und&nbsp;
          <Highlight>exzellente Aufstiegschancen</Highlight>.
        </p>

        <p className="mt-4">
          Ein <Highlight>praxisorientierter Lehrplan</Highlight> und&nbsp;
          <Highlight>modernste Labors</Highlight> an unserem top-ausgestatteten Standort schaffen
          die besten Voraussetzungen für deine erfolgreiche Zukunft.
        </p>
      </>
    ),
    image: 'woman-chemie.webp',
    alt: 'Kolleg Chemie',
    classNames: { container: 'bg-yellow-600' },
  },

  /* ---------------------------------- TECHNIK & INFORMATIK */
  {
    kind: 'colleg',
    title: 'Technik & Informatik.',
    description: (
      <>
        <p>
          <Highlight>Digitalisierung, Automatisierung & Innovation</Highlight> – vereint in einer
          praxisnahen Ausbildung für zukunftsweisende technische Berufe.
        </p>

        <ul className="list-disc ml-4 my-4 space-y-1 text-left">
          <li>
            <strong>Informatik:</strong>&nbsp;Programmieren, KI & Software
          </li>
          <li>
            <strong>E-Technologies:</strong>&nbsp;Energie & Automatisierung
          </li>
          <li>
            <strong>Elektronik:</strong>&nbsp;Mikrocontroller & Embedded
          </li>
          <li>
            <strong>Maschinenbau:</strong>&nbsp;Konstruktion & Fertigung
          </li>
        </ul>

        <p>
          Du wirst fit für die <Highlight>Industrie 4.0</Highlight> – mit&nbsp;
          <Highlight>vielseitigen Karrierechancen</Highlight> in Technik und IT.
        </p>
      </>
    ),
    image: 'woman-it.webp',
    alt: 'Technik & Informatik',
    classNames: { container: 'bg-green-600' },
  },
];
