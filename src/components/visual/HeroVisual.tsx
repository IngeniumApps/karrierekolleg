"use client"
import React from "react"
import { motion } from "framer-motion"

export default function HeroVisual() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Linker Kreis – schwebt dauerhaft auf/ab */}
            <motion.div
                className="absolute top-[20%] left-[5%] w-36 h-36 rounded-full bg-[#3c8bc1] opacity-25 backdrop-blur-sm"
                animate={{ y: [0, -20, 0, 20, 0] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Rechter Kreis – schwebt dauerhaft asynchron */}
            <motion.div
                className="absolute bottom-[15%] right-[10%] w-36 h-36 rounded-full bg-[#f4c94e] opacity-25 backdrop-blur-sm"
                animate={{ y: [0, 20, 0, -20, 0] }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}