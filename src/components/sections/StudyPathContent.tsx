import CardFlowLine from '@components/visual/animation/CardFlowLine.tsx';

export default function StudyPathContent() {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      <CardFlowLine />

      <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
        <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">
          Weiterführendes Studium
        </h2>

        <p className="text-lg leading-relaxed">
          Selbstverständlich kannst du nach dem Kolleg ein weiterführendes Studium beginnen –
          national wie international. Viele Lehrveranstaltungen werden an Fachhochschulen oder
          Universitäten anerkannt.
        </p>

        <div className="bg-white border-l-4 border-primary px-6 py-4 rounded-lg text-left text-base sm:text-lg leading-relaxed">
          <p>
            Ein speziell für HTL-Absolvent:innen und damit natürlich auch für
            HTL-Kolleg-Absolvent:innen entwickeltes Modell findest du unter{' '}
            <a
              href="https://www.aufbaustudium.at"
              className="underline font-semibold text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aufbaustudium.at
            </a>
            . Die volle Kolleg-Ausbildung wird dort anerkannt – du kannst in zwei Jahren mit dem
            akademischen Grad <strong>Dipl.-Ing. (FH)</strong> abschließen.
          </p>
        </div>

        <p className="text-lg leading-relaxed">
          Informiere dich direkt bei der Studiengangsleitung deines gewünschten Kollegs über
          Weiterstudienmöglichkeiten nach dem Abschluss!
        </p>
      </div>
    </section>
  );
}
