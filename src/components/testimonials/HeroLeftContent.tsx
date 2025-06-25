import TypewriterText from '@components/visual/animation/TypeWriterText';
import UnderlineBrush from '@components/visual/animation/UnderlineBrush';

export default function HeroLeftContent() {
  return (
    <div className="relative z-30 lg:text-left self-center text-center">
      <h1 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
        <span className="inline-block font-black text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl text-primary">
          <TypewriterText
            words={['Karriere', 'Zukunft', 'Bildung']}
            loop={Infinity}
            cursorStyle="_"
          />
        </span>
        <br />
        neu denken.
        <br />
        <span className="font-black relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="relative z-[1] text-primary lg:pr-5 pr-2.5">Kolleg</span>
          <UnderlineBrush
            className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
            fillColor="#BBF451"
            bottomOffset={5}
          />
        </span>
        starten.
      </h1>

      <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Du hast die Matura – vielleicht auch schon Berufserfahrung. Mit dem Kolleg entscheidest du
        dich für eine moderne, praxisnahe Ausbildung mit Zukunft.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <a
          href={`${import.meta.env.BASE_URL}#vorteile`}
          className="cursor-none bg-accent font-bold px-8 py-4 rounded-full shadow-md border-2 border-transparent text-center"
        >
          Jetzt informieren
        </a>
        <a
          href={`${import.meta.env.BASE_URL}#kollegs`}
          className="cursor-none bg-white text-primary font-bold border border-primary px-8 py-4 rounded-full shadow-md"
        >
          Alle Kollegs ansehen
        </a>
      </div>
    </div>
  );
}
