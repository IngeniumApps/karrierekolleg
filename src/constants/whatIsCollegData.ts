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
        title: 'Bautechnik.',
        description:
            'Im Kolleg für Bautechnik lernst du alles rund um Planung, Konstruktion, Bauphysik und Projektmanagement. Die Ausbildung verknüpft technisches Know-how mit Zukunftsthemen wie Nachhaltigkeit und Digitalisierung – etwa durch Building Information Modeling (BIM) oder energieeffiziente Bauweisen. Du wirst optimal vorbereitet für Positionen in Architektur-, Bau- und Ingenieurbüros oder im öffentlichen Dienst. Mit diesem Praxiswissen gestaltest du die Welt von morgen mit.',
        image: 'woman-bau.webp',
        alt: 'Our Mission image',
        classNames: {
            container: 'bg-indigo-600',
        },
    },
    {
        kind: 'colleg',
        title: 'Kunst & Design.',
        description:
            'Das Kolleg für Kunst & Design gibt dir Raum, deine gestalterischen Talente zu entfalten – ob in Grafikdesign, Produktgestaltung, Multimedia oder Innenarchitektur. Du arbeitest mit modernen Tools, entwickelst eigene Projekte und baust ein überzeugendes Portfolio auf. Die praxisnahe Ausbildung eröffnet dir Wege in die Kreativwirtschaft, in Agenturen oder Designstudios – oder bildet die perfekte Basis für ein weiterführendes Designstudium.',
        image: 'woman-photo.webp',
        alt: 'Join Us image',
        classNames: {
            container: 'bg-red-600',
        },
    },
    {
        kind: 'colleg',
        title: 'Chemie.',
        description:
            'Im Kolleg für Chemie wirst du Expert:in in Bereichen wie Laboranalytik, Umwelttechnik und chemische Verfahren. Die Ausbildung ist stark praxisorientiert – mit modern ausgestatteten Laboren und realen Projektarbeiten. Ob in der Pharma-, Lebensmittel- oder Umweltbranche: Mit deinem Fachwissen bist du ein gefragter Profi in Industrie und Forschung. Ideal für alle, die naturwissenschaftliche Neugier mit technischer Praxis verbinden wollen.',
        image: 'woman-chemie.webp',
        alt: 'Join Us image',
        classNames: {
            container: 'bg-yellow-600',
        },
    },
  {
    kind: 'colleg',
    title: 'Technik & Informatik.',
    description: `
  <p><strong>Digitalisierung, Automatisierung & Innovation – alles in einem Paket</strong><br><br>
  In den Kollegs für Informatik, E-Technologies, Elektronik & Maschinenbau erhältst du eine praxisnahe Ausbildung für zukunftsweisende technische Berufe:</p><br>
  <ul>
    <li class="list-disc ml-4 text-left"><strong>Informatik:</strong> Programmierung, KI & Softwareentwicklung.</li>
    <li class="list-disc ml-4 text-left"><strong>E-Technologies:</strong> Energie- und Automatisierungssysteme.</li>
    <li class="list-disc ml-4 text-left"><strong>Elektronik:</strong> Mikrocontroller & Embedded Systems.</li>
    <li class="list-disc ml-4 text-left"><strong>Maschinenbau:</strong> Konstruktion & Fertigungstechnik.</li>
  </ul><br>
  <p>Du wirst fit für die Industrie 4.0 und eröffnest dir vielfältige Karrierewege.</p>
    `,
    image: 'woman.webp',
    alt: 'Join Us image',
    classNames: {
      container: 'bg-green-600',
    },
  },
];
