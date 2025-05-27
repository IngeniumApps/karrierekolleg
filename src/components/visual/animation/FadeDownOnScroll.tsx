import { motion } from "framer-motion";
import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
    className?: string; // optional: zusätzliche Klassen für das Element
    delay?: number; // optional: Verzögerung in Sekunden
    duration?: number; // optional: Dauer der Animation in Sekunden
};

export default function FadeDownOnScroll({ children, delay = 0, duration = 0.6, className }: Props) {

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration }}
            viewport={{ once: true }} // nur beim ersten Mal
        >
            {children}
        </motion.div>
    );
}