import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white py-16 px-6 overflow-hidden">
      {/* Background Deko */}
      <div className="absolute left-10 top-10">
        <motion.div
          className="w-16 h-16 rounded-full bg-accent"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 z-10 relative">
        <div className="text-3xl font-bold font-grotesque">
          Karriere <span className="text-accent">*</span>Kolleg
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <a
            href={`${import.meta.env.BASE_URL}#kontakt`}
            className="cursor-none text-lg px-1 py-0.5 border-b-2 border-transparent hover:border-accent hover:text-accent transition-colors"
          >
            Kontakt
          </a>
          <a
            href={`${import.meta.env.BASE_URL}#kollegs`}
            className="cursor-none text-lg px-1 py-0.5 border-b-2 border-transparent hover:border-accent hover:text-accent transition-colors"
          >
            Kollegs
          </a>
          <a
            href={`${import.meta.env.BASE_URL}#vorteile`}
            className="cursor-none text-lg px-1 py-0.5 border-b-2 border-transparent hover:border-accent hover:text-accent transition-colors"
          >
            Vorteile
          </a>
          <a
            href={`${import.meta.env.BASE_URL}impressum/`}
            className="cursor-none text-lg px-1 py-0.5 border-b-2 border-transparent hover:border-accent hover:text-accent transition-colors"
          >
            Impressum
          </a>
          <a
            href={`${import.meta.env.BASE_URL}datenschutz/`}
            className="cursor-none text-lg px-1 py-0.5 border-b-2 border-transparent hover:border-accent hover:text-accent transition-colors"
          >
            Datenschutz
          </a>
        </div>

        {/* Button */}
        <motion.a
          href={`${import.meta.env.BASE_URL}#kollegs`}
          className="cursor-none bg-lime-300 text-black font-bold px-6 py-3 -rotate-3 rounded-full hover:rotate-0 hover:scale-105 transition-transform"
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          Starte jetzt!
        </motion.a>
      </div>

      {/* Copyright */}
      <div className="mt-16 text-center text-sm">© Karriere Kolleg {new Date().getFullYear()}</div>
    </footer>
  );
}
