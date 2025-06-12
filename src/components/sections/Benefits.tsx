import FadeDownOnScroll from '@components/visual/animation/FadeDownOnScroll.tsx';
import CardFlowLine from '@components/visual/animation/CardFlowLine.tsx';
import { benefits } from '../../constants/benefits.ts';
import UnderlineBrush from '@components/visual/animation/UnderlineBrush.tsx';

export const Benefits = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      {/*Glass-Overlay*/}
      <div className="absolute inset-0 z-0 backdrop-glass"></div>

      <CardFlowLine />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeDownOnScroll duration={0.8}>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
              <span className="relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="relative z-[1] text-primary">Deine Vorteile</span>
                <UnderlineBrush
                  className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                  fillColor="#BBF451"
                  bottomOffset={8}
                />
              </span>
              <br />
              <span className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl">im Kolleg</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Warum das Kolleg der perfekte Weg für deine Zukunft ist
            </p>
          </div>
        </FadeDownOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <FadeDownOnScroll key={index} duration={0.6} delay={index * 0.1}>
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col group relative">
                <div className="absolute inset-0 z-20 flex items-start justify-center pointer-events-none -mt-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: benefit.color,
                    }}
                  >
                    <span className="text-xl font-bold text-white">{index + 1}</span>
                  </div>
                </div>

                <h3 className="relative z-10 text-lg lg:text-xl font-semibold text-gray-900 mb-4 leading-tight mt-16">
                  {benefit.title}
                </h3>
                <p className="relative z-10 text-gray-600 leading-relaxed flex-1 text-sm lg:text-base">
                  {benefit.description}
                </p>
              </div>
            </FadeDownOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
