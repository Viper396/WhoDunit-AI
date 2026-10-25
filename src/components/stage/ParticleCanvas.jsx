import React, { useEffect, useRef } from "react";

export default function ParticleCanvas({ weather = "rain" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const width = (canvas.width = 1280);
    const height = (canvas.height = 720);

    const isRain = weather === "rain" || weather === "storm";
    const count = isRain ? 110 : 35;

    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: isRain ? 12 + Math.random() * 8 : 1 + Math.random() * 2,
        len: isRain ? 14 + Math.random() * 12 : 2 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.35
      });
    }

    let lightningTimer = 0;
    let lightningFlash = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Storm lightning flash
      if (weather === "storm") {
        lightningTimer++;
        if (lightningTimer > 280 && Math.random() < 0.02) {
          lightningFlash = 0.35;
          lightningTimer = 0;
        }
        if (lightningFlash > 0) {
          ctx.fillStyle = `rgba(220, 230, 255, ${lightningFlash})`;
          ctx.fillRect(0, 0, width, height);
          lightningFlash -= 0.035;
        }
      }

      ctx.strokeStyle = "rgba(180, 210, 240, 0.4)";
      ctx.lineWidth = 1.2;

      for (const p of particles) {
        if (isRain) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + p.len);
          ctx.stroke();

          p.y += p.speed;
          p.x -= 0.8;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * (width + 100);
          }
        } else {
          // Floating dust or fog particle
          ctx.fillStyle = `rgba(240, 240, 255, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.len, 0, Math.PI * 2);
          ctx.fill();

          p.y -= 0.4;
          p.x += Math.sin(p.y * 0.05) * 0.5;
          if (p.y < 0) {
            p.y = height + 5;
            p.x = Math.random() * width;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5
      }}
    />
  );
}
