'use client'

import { motion } from 'framer-motion'

interface ChatBubbleProps {
    sender: string
    time: string
    text: string
    position?: string // z.B. "top-[15%] left-[5%]" oder "bottom-[20%] right-[10%]"
    delay?: number
    scale?: number
    image: string
}

export default function HeroChatBubble({
                                           sender,
                                           time,
                                           text,
                                           position = 'top-0 left-0',
                                           delay = 0,
                                           scale = 0.95,
                                           image
                                       }: ChatBubbleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, scale }}
            transition={{ delay, duration: 0.4 }}
            className={`absolute ${position} z-20 transition-transform duration-300 ease-in-out hover:scale-115`}
        >
            <div className="flex items-start gap-2">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={`${import.meta.env.BASE_URL}images/${image}`}
                    width="80"
                    height="80"
                    alt={`${sender} Avatar`}
                />
                <div className="flex flex-col w-full max-w-[220px] p-2 border border-gray-200 bg-white/70 backdrop-blur-md rounded-e-xl rounded-es-xl shadow-sm">
                    <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-semibold">{sender}</span>
                        <span className="text-[10px] text-gray-500">{time}</span>
                    </div>
                    <p className="text-xs py-1">{text}</p>
                    <span className="text-[10px] text-gray-400">Zugestellt</span>
                </div>
            </div>
        </motion.div>
    )
}