import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export const CountUpStats = () => {
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <Stat num={25} suffix="" subheading="Kollegs in der Steiermark" />
            <Stat num={8200} suffix="+" subheading="Absolvent:innen pro Jahr" />
            <Stat num={100} suffix="%" subheading="staatlich anerkannt & kostenlos" />
        </div>
    );
};

const Stat = ({
                  num,
                  suffix,
                  decimals = 0,
                  subheading,
              }: {
    num: number;
    suffix: string;
    decimals?: number;
    subheading: string;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!isInView) return;

        animate(0, num, {
            duration: 2.5,
            onUpdate(value) {
                if (ref.current) {
                    ref.current.textContent = value.toFixed(decimals);
                }
            },
        });
    }, [isInView, num, decimals]);

    return (
        <div className="flex flex-col items-center">
            <p className="text-5xl font-bold text-green mb-2">
                <span ref={ref}></span>
                {suffix}
            </p>
            <p className="text-lg text-gray-700 max-w-[14rem]">{subheading}</p>
        </div>
    );
};