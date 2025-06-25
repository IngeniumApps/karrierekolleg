import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import FadeDownOnScroll from '@components/visual/animation/FadeDownOnScroll';
import UnderlineBrush from '@components/visual/animation/UnderlineBrush';
import { benefits } from '../../constants/benefits';

export const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const endShiftVw = -(benefits.length - 1) * 30;
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${endShiftVw}vw`]);

  // Scroll Speed Control
  const xSpring = useSpring(x, { damping: 30, stiffness: 100 });

  const totalVw = (benefits.length - 1) * 100;
  const sectionHeight = `calc(100vh + ${totalVw}vw)`;

  return (
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/*** MOBILE VARIANTE ***/}
        <div className="block lg:hidden">
          {/* hier dein altes Grid-Layout */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
                <FadeDownOnScroll key={index} duration={0.6} delay={index * 0.1}>
                  <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col group relative">
                    <div className="absolute inset-0 z-20 flex items-start justify-center pointer-events-none -mt-5">
                      <div
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300"
                          style={{ backgroundColor: benefit.color }}
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

        {/*** DESKTOP VARIANTE: original ***/}
        <div ref={sectionRef}
             style={{ height: sectionHeight }}
             className="relative hidden lg:block">
          {/* Sticky-Container */}
          <div className="sticky top-0 h-screen flex flex-col">
            {/* — Header: immer sichtbar */}
            <div className="flex flex-1 justify-center flex-col z-20 pt-20 mb-16 lg:mb-20">
              <FadeDownOnScroll duration={0.8}>
                <div className="text-center">
                  <h2 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-8 leading-tight">
                     <span className="font-black relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                      <span className="relative z-[1] text-primary">Deine Vorteile </span>
                      <UnderlineBrush
                          className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                          fillColor="#BBF451"
                          bottomOffset={8}
                      />
                      </span>
                    <span className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl"> im Kolleg</span>
                  </h2>
                </div>
              </FadeDownOnScroll>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Warum das Kolleg der perfekte Weg für deine Zukunft ist</p>
            </div>

            {/* — Cards: nehmen den Rest der Höhe */}
            <div className="flex-2 flex items-center">
              <motion.div style={{ x: xSpring }} className="flex gap-10 lg:px-6 xl:px-10">
                {benefits.map((benefit, index) => (
                    <FadeDownOnScroll key={index} duration={0.6} delay={index * 0.1}>
                      <div className="lg:min-w-[35vw] xl:min-w-[25vw]
                      bg-white/85 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                        <div className="absolute inset-0 z-20 flex items-start justify-center pointer-events-none -mt-5">
                          <div
                              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300"
                              style={{ backgroundColor: benefit.color }}
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
  );
};
