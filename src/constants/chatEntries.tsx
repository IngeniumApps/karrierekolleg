import type { ReactNode } from 'react';

interface Testimonial {
  sender: ReactNode;
  time: string;
  text: string;
  image: string;
  kolleg: string;
}

export const chatEntriesLeft: Testimonial[] = [
  {
    sender: 'Frau Ernst',
    time: '09:15',
    text: 'Eine HTL-Kolleg Ausbildung ist sehr praxisorientiert und man merkt, dass die Lehrer selbst einmal in dem jeweiligen Fachgebiet tätig waren.',
    image: '/avatar/avatar-bulme-inf-ernst.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Jakob Schiller',
    time: '09:20',
    text: 'Regelmäßige Exkursionen und Expertentage vor Ort ermöglichen es DIR, Kontakte mit der Wirtschaft zu knüpfen.',
    image: '/avatar/avatar-ortwein-jakob_schiller.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Frau Korp',
    time: '09:30',
    text: 'Ich bekam im HTL-Kolleg eine fundierte Grundlagenausbildung mit zahlreichen elektrotechnischen Basics.',
    image: '/avatar/avatar-bulme-korb.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Sarah Fischer',
    time: '09:35',
    text: 'Ich wollte mich beruflich verändern, hatte aber Angst, das nicht mit meinem Familienalltag zu schaffen. Das Kolleg hat mir gezeigt, dass beides geht – und zwar richtig gut!',
    image: 'avatar-w-2.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Frau Ernst',
    time: '09:40',
    text: 'Die viersemestrige Ausbildung lässt sich gut mit Familie und dem "normalen" Leben vereinbaren.',
    image: '/avatar/avatar-bulme-inf-ernst.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Georg Gussmagg',
    time: '09:45',
    text: 'Die kurze Ausbildungszeit von 2 bzw. 3 Jahren und das breitgefächerte Studienangebot steigern Deine Berufschancen enorm.',
    image: '/avatar/avatar-ortwein-georg_gussmagg.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Anna Schröder',
    time: '09:50',
    text: 'Ich hatte null Ahnung von Informatik, aber viel Motivation. Das Kolleg hat mich nicht nur abgeholt – es hat mich richtig weit gebracht!',
    image: 'avatar-w-1.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Marcel Beck',
    time: '09:55',
    text: 'Nach meiner Kündigung war ich am Boden. Das Kolleg war meine Chance, neu anzufangen – ich hab nicht nur was gelernt, ich hab auch wieder Hoffnung gefunden.',
    image: 'avatar-m-5.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Lea Berger',
    time: '10:00',
    text: 'Ich bin neu in Österreich. Das Kolleg hat mir nicht nur Wissen vermittelt, sondern auch Selbstvertrauen. Ich wurde gesehen, gefördert – und jetzt arbeite ich in der Technik.',
    image: 'avatar-w-4.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Herr Bachler',
    time: '11:45',
    text: 'Ein großer Vorteil einer HTL ist die praxisnahe Ausbildung mit Werkstättenunterricht.',
    image: '/avatar/avatar-bulme-inf-bachler.webp',
    kolleg: 'Zugestellt',
  },
];

export const chatEntriesRight: Testimonial[] = [
  {
    sender: (
      <>
        Ing.<sup className="font-semibold text-[8px]">in</sup> Andrea Pecanin
      </>
    ),
    time: '11:50',
    text: 'Die Absolvent:innen der Chemie Akademie sind in der Industrie sehr gefragt – die Ausbildung öffnet Türen und bietet zahlreiche Entwicklungschancen.',
    image: '/avatar/avatar-chemie-pecanin.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Clara Wolf',
    time: '11:55',
    text: 'Ich hätte nie gedacht, dass Lernen wieder so viel Freude machen kann. Das Kolleg hat mich wirklich motiviert.',
    image: 'avatar-w-5.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Tobias Seidel',
    time: '12:00',
    text: 'Design ist nicht nur schön – es erzählt Geschichten. Genau das lernst du hier.',
    image: 'avatar-m-4.webp',
    kolleg: 'Zugestellt',
  },
  {
    image: '/avatar/avatar-chemie-salerno.webp',
    kolleg: 'Zugestellt',
    sender: 'Francesco Salerno',
    text: 'Schon in der Schulzeit faszinierte mich Chemie. Die Akademie vertiefte mein Wissen und ließ mich es sofort im Job umsetzen.',
    time: '12:05',
  },
  {
    sender: 'Simon Haas',
    time: '12:10',
    text: 'Ich habe mir lange nicht zugetraut, wieder zu lernen. Aber hier wurde ich Schritt für Schritt aufgebaut.',
    image: 'avatar-m-3.webp',
    kolleg: 'Zugestellt',
  },
  {
    sender: 'Andrea Udier',
    time: '12:15',
    text: 'Die Ausbildung hat mich praxisnah auf das Arbeitsleben vorbereitet und meine persönliche Entwicklung enorm gefördert.',
    image: '/avatar/avatar-chemie-udier.webp',
    kolleg: 'Zugestellt',
  },
];
