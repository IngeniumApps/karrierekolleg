// src/constants/kollegDescriptions.tsx
import type { JSX } from 'react';

export const kollegDescriptions: Record<string, JSX.Element[]> = {
    'Technik & Informatik': [
        <p key="1">
            Digitalisierung, Automatisierung und Innovation – vereint in einer praxisnahen Ausbildung für
            zukunftsweisende technische Berufe. Du wirst fit für die Industrie 4.0 und findest vielfältige Karrierechancen in Technik und IT.
        </p>,
    ],
    'Kunst und Design': [
        <>
            <p key="1">
                <strong>Kolleg für Fine Art:</strong> Die Zusammenführung von inhaltlicher Idee, gestalterischem Denken und künstlerischem Entwurf mit der umfassenden Fachtechnologieausbildung ermöglicht unter Verwendung modernster Geräte ein zeitgemäßes, professionelles Arbeiten.
            </p><br/>
        </>,
        <p key="2">
            <strong>Kolleg für Grafik:</strong> Die Aufgabenbereiche des Kommunikationsdesigns sind mittlerweile so vielschichtig wie seine Kundenprofile. Die übergreifenden Kompetenzfelder machen Grafik- und Kommunikationsdesign zu einem umfangreichen Berufsfeld.
        </p>,
    ],
    Bautechnik: [
        <p key="1">
            Hochkonjunktur im Bauwesen, neue Gesetze sowie Verordnungen in den Bereichen des energieeffizienten,
            ressourcenschonenden und nachhaltigen Bauens öffnen die Chance, in einer traditionellen und doch modernen
            Branche Fuß zu fassen und so den Weg für eine erfolgreiche Karriere zu ebnen.
        </p>
    ],
    Chemie: [
        <>
            <p key="1">
                Das Kolleg der Chemie Akademie bietet dir die Möglichkeit, in nur 4 Semestern ein fundiertes Wissen in allen Bereichen der Chemie zu erlangen.
                Dieses Wissen wird durch einen sehr hohen Laboranteil in die Praxis umgesetzt.
            </p>
            <br/>
        </>,
        <p key="2">
            Unsere Studierenden werden von renommierten Industriebetrieben
            des Landes während der Diplomarbeit begleitet und sind daher ideal für den sofortigen Einstieg in die Berufswelt mit ausgezeichneten Aufstiegschancen vorbereitet.
            Mit einem praxisorientierten Lehrplan und modernster Laborausstattung an unserem modernen Standort bieten wir dir beste Vorrausetzungen für einen erfolgreichen Start
            in deine berufliche Zukunft.
        </p>
    ],
};