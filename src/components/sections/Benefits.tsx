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
      <section className="relative w-full overflow-visible">
        <div className="absolute inset-0 z-0 backdrop-glass" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div
              ref={sectionRef}
              style={{ height: sectionHeight }}
              className="relative"
          >
            {/* Sticky-Container */}
            <div className="sticky top-0 h-screen flex flex-col">
              {/* — Header: immer sichtbar */}
              <div className="flex flex-1 justify-center z-20 pt-20">
                <FadeDownOnScroll duration={0.8} className={"self-end"}>
                  <div className="text-center mb-8 lg:mb-10">
                    <h2 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
                    <span className="relative inline-block text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl">
                      <span className="relative z-[1] text-primary">Deine Vorteile</span>
                      <UnderlineBrush
                          className="hidden lg:block absolute left-0 bottom-0 z-0 w-full"
                          fillColor="#BBF451"
                          bottomOffset={8}
                      />
                    </span>
                      <br />
                      <span className="text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl">
                      im Kolleg
                    </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                      Warum das Kolleg der perfekte Weg für deine Zukunft ist
                    </p>
                  </div>
                </FadeDownOnScroll>
              </div>

              {/* — Cards: nehmen den Rest der Höhe */}
              <div className="flex-2 flex items-center ">
                <motion.div style={{ x: xSpring }} className="flex gap-10 px-10">
                  {benefits.map((benefit, index) => (
                      <FadeDownOnScroll key={index} duration={0.6} delay={index * 0.1}>
                        <div className="min-w-[30vw] lg:min-w-[30vw] bg-white/85 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col group">
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

            {/* Footer unterhalb: nach der horizontalen Scroll-Phase */}
            <div className="px-6 py-12">
              {/* Hier kommt dein nächster Content */}
            </div>
          </div>
        </div>
      </section>
  );
};