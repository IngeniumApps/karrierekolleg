import FadeDownOnScroll from '@components/visual/animation/FadeDownOnScroll';
import CardFlowLine from '@components/visual/animation/CardFlowLine';
import UnderlineBrush from '@components/visual/animation/UnderlineBrush';
import type { FC } from 'react';

export const KollegVsAndStudy: FC = () => {
  return (
    <section className="relative w-full bg-transparent py-20 lg:py-32 overflow-hidden">
      <CardFlowLine />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <FadeDownOnScroll duration={0.8}>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
              <span className="font-black relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="relative z-[1] text-primary">Kolleg </span>
                <UnderlineBrush
                  className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                  fillColor="#BBF451"
                  bottomOffset={8}
                />
              </span>
              <span className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl">
                {' '}
                oder Bachelor?
              </span>
            </h2>
          </div>
        </FadeDownOnScroll>

        <FadeDownOnScroll duration={0.8} delay={0.2}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 text-center lg:mb-20 mb-6">
            <div className="prose prose-lg mx-auto leading-relaxed">
              <p className="text-xl lg:text-2xl font-semibold text-primary mb-6">
                Ein starkes Plus für das Kolleg.
              </p>
              <p className="text-base lg:text-lg mb-6">
                Nach drei Jahren einschlägiger Berufspraxis kannst du die{' '}
                <strong>Ingenieurszertifizierung</strong> durchführen, damit erreichst du die{' '}
                <strong>Stufe 6 im Nationalen Qualifikationsrahmen</strong>. Damit stehst du auf
                derselben Stufe wie ein:e Bachelorabsolvent:in.
              </p>
              <p className="text-base lg:text-lg">
                Durch die stark <strong>anwendungsorientierte Ausbildung</strong> und die Tatsache,
                dass HTL-Absolvent:innen überall sehr gefragt sind, sind dir bereits nach dem Kolleg
                <strong>
                  {' '}
                  ausgezeichnete Jobchancen in nationalen und internationalen Unternehmen
                </strong>{' '}
                garantiert.
              </p>
            </div>
          </div>
        </FadeDownOnScroll>

        <FadeDownOnScroll duration={0.8} delay={0.4}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 text-center">
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
              <p className="text-xl lg:text-2xl font-semibold text-primary mb-6">
                Weiterführendes Studium.
              </p>

              <p className="text-lg leading-relaxed">
                Selbstverständlich kannst du nach dem Kolleg ein weiterführendes Studium beginnen –
                national wie international. Viele Lehrveranstaltungen werden an Fachhochschulen oder
                Universitäten anerkannt.
              </p>

              <br />

              <p className="text-lg leading-relaxed">
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

              <br />

              <p className="text-lg leading-relaxed">
                Informiere dich direkt bei der Studiengangsleitung deines gewünschten Kollegs über
                Weiterstudienmöglichkeiten nach dem Abschluss!
              </p>
            </div>
          </div>
        </FadeDownOnScroll>
      </div>
    </section>
  );
};
