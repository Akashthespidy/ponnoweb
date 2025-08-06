"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";

// Type definitions
interface IconWrapperProps {
  children: ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isActive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

interface IconPosition {
  transformX: number;
  transformY: number;
  svgX: number;
  svgY: number;
}

interface OuterIcon {
  id: number;
  component: ReactNode;
  name: string;
  color: string;
}

// Inventory Management Icons - Made larger
const StockIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"
      fill="currentColor"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 8v4M12 16h.01"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BarcodeIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M3 4h2v16H3V4zm3 0h1v16H6V4zm2 0h2v16H8V4zm3 0h1v16h-1V4zm2 0h2v16h-2V4zm3 0h1v16h-1V4zm2 0h2v16h-2V4z"
      fill="currentColor"
    />
  </svg>
);

const AutomationIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-8.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S9.33 10 8.5 10 7 10.67 7 11.5zm5 0c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm5 0c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
      fill="currentColor"
    />
  </svg>
);

const ReportIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"
      fill="currentColor"
    />
  </svg>
);

const SyncIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
      fill="currentColor"
    />
  </svg>
);

const BulkEditIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      fill="currentColor"
    />
  </svg>
);

const POSIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
      fill="currentColor"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    height="2.5em"
    style={{ flex: "none", lineHeight: 1 }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="2.5em"
  >
    <path
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
      fill="currentColor"
    />
  </svg>
);

// Center Inventory Icon
const InventoryCenterIcon = () => (
  <Image
    src="/images/inventory.jpeg"
    alt="Smart Inventory Management"
    width={80}
    height={80}
    className="object-contain"
    priority
  />
);

const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isActive = false,
  isHovered = false,
  color = "bg-blue-500",
  animationDelay = 0,
  bgColor,
  padding = "p-4", // Standardized padding
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isActive?: boolean;
  isHovered?: boolean;
  color?: string;
  animationDelay?: number;
  bgColor?: string;
  padding?: string;
}) => (
  <div
    className={`
      backdrop-blur-xl rounded-2xl flex items-center justify-center border transition-all duration-300
      ${padding}
      ${
        isHighlighted
          ? `${
              bgColor || "bg-gray-100/80"
            } border-blue-400/50 shadow-blue-400/30 shadow-2xl animate-breathing-glow`
          : `bg-white/60 border-gray-300/60 ${
              !isActive && !isHovered && "animate-float"
            }`
      }
      ${
        isActive && "border-blue-400/60 scale-110 shadow-blue-400/40 shadow-2xl"
      }
      ${
        isHovered &&
        "border-blue-400/60 scale-110 shadow-blue-400/40 shadow-2xl"
      }
      ${className}
    `}
    style={{
      animationDelay: `${animationDelay}s`,
      transform: isActive ? "scale(1.1)" : "scale(1)",
      backgroundColor: isActive
        ? "rgba(129, 140, 248, 0.2)"
        : "rgba(255, 255, 255, 0.05)",
      transition:
        "transform 0.8s ease-in-out, background-color 0.8s ease-in-out, border-color 0.8s ease-in-out",
    }}
  >
    {children}
  </div>
);

// Updated outerIcons with inventory-focused features
const outerIcons: OuterIcon[] = [
  {
    id: 1,
    component: <StockIcon />,
    name: "Stock Tracking",
    color: "#4285F4",
  },
  {
    id: 2,
    component: <AlertIcon />,
    name: "Low Stock Alerts",
    color: "#EA4335",
  },
  {
    id: 3,
    component: <BarcodeIcon />,
    name: "Barcode Scanning",
    color: "#FBBC05",
  },
  {
    id: 4,
    component: <BulkEditIcon />,
    name: "Bulk Editing",
    color: "#34A853",
  },
  {
    id: 5,
    component: <POSIcon />,
    name: "POS Integration",
    color: "#673AB7",
  },
  {
    id: 6,
    component: <ReportIcon />,
    name: "Inventory Reports",
    color: "#00ACC1",
  },
  {
    id: 7,
    component: <AnalyticsIcon />,
    name: "Sales Analytics",
    color: "#FF6D00",
  },
  {
    id: 8,
    component: <SyncIcon />,
    name: "Real-time Sync",
    color: "#00897B",
  },
  {
    id: 9,
    component: <AutomationIcon />,
    name: "Automation",
    color: "#5E35B1",
  },
];

const IconGrid = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const radius = 180; // Increased radius to accommodate larger icons
  const svgSize = 450; // Increased SVG size
  const svgCenter = svgSize / 2;
  const numIcons = outerIcons.length;

  const getIconPosition = useCallback(
    (index: number): IconPosition => {
      const angle = (-90 + index * (360 / numIcons)) * (Math.PI / 180);
      return {
        transformX: radius * Math.cos(angle),
        transformY: radius * Math.sin(angle),
        svgX: svgCenter + radius * Math.cos(angle),
        svgY: svgCenter + radius * Math.sin(angle),
      };
    },
    [numIcons, radius, svgCenter]
  );

  // Animation loop for particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, svgSize, svgSize);
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.life / 60})`;
          ctx.fill();
        }
      });
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  // Effect for sequential animation and particle emission
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prevId) => {
        const currentIndex = outerIcons.findIndex((icon) => icon.id === prevId);
        const nextIndex = (currentIndex + 1) % outerIcons.length;

        // Emit particles from the new active icon's position
        const pos = getIconPosition(nextIndex);
        const iconCenterX = svgCenter + pos.transformX;
        const iconCenterY = svgCenter + pos.transformY;

        for (let i = 0; i < 20; i++) {
          particlesRef.current.push({
            x: iconCenterX,
            y: iconCenterY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1,
            life: Math.random() * 60,
          });
        }

        return outerIcons[nextIndex].id;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [outerIcons, getIconPosition, svgCenter]);

  return (
    <div className="relative w-[450px] h-[450px] scale-75 md:scale-90 lg:scale-100">
      <canvas
        ref={canvasRef}
        width={svgSize}
        height={svgSize}
        className="absolute top-0 left-0 pointer-events-none z-10"
      ></canvas>

      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <defs>
          <filter id="glow_v6">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {outerIcons.map((icon1, i) => {
            const p1 = getIconPosition(i);
            return outerIcons.map((icon2, j) => {
              if (i >= j) return null;
              const p2 = getIconPosition(j);
              const isLineActive =
                activeId === icon1.id || activeId === icon2.id;
              return (
                <line
                  key={`line-${i}-${j}`}
                  x1={p1.svgX}
                  y1={p1.svgY}
                  x2={p2.svgX}
                  y2={p2.svgY}
                  strokeWidth="1.5"
                  style={{
                    stroke: isLineActive ? "#3B82F6" : "#6B7280",
                    opacity: isLineActive ? 0.8 : 0.15,
                    filter: isLineActive ? "url(#glow_v6)" : "none",
                    transition: "all 1.2s ease-in-out",
                  }}
                  className="stroke-gray-600"
                />
              );
            });
          })}
        </g>
      </svg>

      <div className="absolute top-1/2 left-1/2">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20">
          <IconWrapper
            className="w-32 h-32 p-4 bg-blue-500/10 border-blue-400/30" // Increased size
            isHighlighted={true}
          >
            <InventoryCenterIcon />
          </IconWrapper>
        </div>

        {outerIcons.map((icon, i) => {
          const { transformX, transformY } = getIconPosition(i);
          const isActive = activeId === icon.id;

          return (
            <div
              key={icon.id}
              className="absolute z-20"
              style={{
                top: 0,
                left: 0,
                transform: `translate(${transformX}px, ${transformY}px)`,
                transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 relative">
                <div
                  className="absolute inset-[-30px] rounded-full blur-2xl" // Increased blur area
                  style={{
                    backgroundColor: `${icon.color}20`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.8s ease-in-out",
                  }}
                />
                <IconWrapper className="w-22 h-22" isActive={isActive}>
                  {" "}
                  {/* Increased size */}
                  <div style={{ color: icon.color }}>{icon.component}</div>
                </IconWrapper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function SmartInventoryManagement() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-4 overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes breathing-glow {
            0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2)); }
            50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.1)); }
            100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2)); }
          }
          @keyframes breathing-glow-light {
            0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
            50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.05)); }
            100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
          }
          .animate-breathing-glow {
            animation: breathing-glow 4s ease-in-out infinite;
          }
          .animate-breathing-glow-light {
            animation: breathing-glow-light 4s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(72,187,120,0.1),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Smart Inventory Management
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Real-time stock tracking, low-stock alerts, and bulk editing.
              Never run out of bestsellers again.
            </p>
            <div className="flex flex-wrap gap-3">
              {outerIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 border border-white/20"
                >
                  <div className="w-9 h-9 bg-blue-300 rounded-full flex items-center justify-center">
                    {" "}
                    {/* Increased size */}
                    <div
                      className="flex items-center justify-center"
                      style={{ color: "white", width: "6px", height: "6px" }} // Increased size
                    >
                      {icon.component}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Interactive Orb */}
          <div className="relative w-[450px] h-[450px] scale-75 md:scale-90">
            {" "}
            {/* Increased size */}
            <IconGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
