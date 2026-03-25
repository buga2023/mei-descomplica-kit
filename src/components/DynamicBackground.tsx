import { useEffect, useRef } from "react";

export const DynamicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;
        let isVisible = true;
        const isMobile = window.innerWidth < 768;
        const frameInterval = isMobile ? 1000 / 20 : 0; // 20fps on mobile
        let lastFrameTime = 0;

        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(container);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const SPACING = 28;
        const DOT_RADIUS = 1;
        const ACTIVE_COLOR = "0,29,110";
        const BASE_OPACITY = 0.06;
        const WAVE_AMPLITUDE = 0.55;
        const WAVE_SPEED = 0.012;

        const draw = (timestamp: number) => {
            animationId = requestAnimationFrame(draw);

            if (!isVisible) return;

            if (frameInterval > 0 && timestamp - lastFrameTime < frameInterval) return;
            lastFrameTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / SPACING) + 1;
            const rows = Math.ceil(canvas.height / SPACING) + 1;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * SPACING;
                    const y = row * SPACING;

                    const wave = Math.sin(col * 0.22 + time) * Math.cos(row * 0.18 + time * 0.7);
                    const opacity = BASE_OPACITY + WAVE_AMPLITUDE * (wave * 0.5 + 0.5) * 0.25;

                    ctx.beginPath();
                    ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${ACTIVE_COLOR}, ${opacity})`;
                    ctx.fill();
                }
            }

            time += WAVE_SPEED;
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-10] pointer-events-none bg-slate-50">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            />
        </div>
    );
};
