import { motion } from "framer-motion";

export const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-slate-50">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 opacity-80" />

            {/* Animated Blob 1 - Royal Blue */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/5 rounded-full blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Animated Blob 2 - Amber */}
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px]"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Animated Blob 3 - Deep Blue */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-blue-800/5 rounded-full blur-[150px]"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />

            {/* Overlay Texture (Optional for "Fintech" feel) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        </div>
    );
};
