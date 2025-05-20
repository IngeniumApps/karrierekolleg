'use client'

import { motion } from 'framer-motion'

interface ChatBubbleProps {
    sender: string
    time: string
    text: string
    position?: string // z.B. "top-[15%] left-[5%]" oder "bottom-[20%] right-[10%]"
    delay?: number
    scale?: number
}

const chatVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.3 + i * 0.3, duration: 0.5 },
    }),
}

export default function HeroChatBubble({
                                           sender,
                                           time,
                                           text,
                                           position = 'top-0 left-0',
                                           delay = 0,
                                           scale = 0.95
                                       }: ChatBubbleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, scale }}
            transition={{ delay, duration: 0.4 }}
            className={`absolute ${position} z-20`}
        >
            <div className="flex items-start gap-2.5">
                <img
                    className="w-7 h-7 rounded-full"
                    src="/images/profile-picture-3.jpg"
                    alt={`${sender} Avatar`}
                />
                <div className="flex flex-col w-full max-w-[280px] leading-1.5 p-3 border border-gray-200 bg-white/90 backdrop-blur-md rounded-e-xl rounded-es-xl shadow-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-gray-900">{sender}</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </div>
                    <p className="text-sm text-gray-900 py-2">{text}</p>
                    <span className="text-xs text-gray-400">Zugestellt</span>
                </div>
            </div>
        </motion.div>
    )
}