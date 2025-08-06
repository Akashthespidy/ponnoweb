"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// POS Icons - Made larger with explicit dimensions
const TerminalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 8H20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H8.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12H12.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 12H16.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReceiptIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
  >
    <path
      d="M4 2H20V22L17.5 20L15 22L12.5 20L10 22L7.5 20L5 22L4 22V2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 7H16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11H16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 15H12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PaymentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
  >
    <path
      d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
      fill="white"
    />
  </svg>
);

const OnlineIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7 13C6.45 13 6 12.55 6 12C6 11.45 6.45 11 7 11C7.55 11 8 11.45 8 12C8 12.55 7.55 13 7 13ZM12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13ZM17 13C16.45 13 16 12.55 16 12C16 11.45 16.45 11 17 11C17.55 11 18 11.45 18 12C18 12.55 17.55 13 17 13Z"
      fill="white"
    />
  </svg>
);

const InventoryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
  >
    <path
      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const POSCenterIcon = () => (
  <Image
    src="/images/web-logo.png"
    alt="Complete POS Solution"
    width={60}
    height={60}
    className="object-contain"
    priority
    onError={(e) => {
      console.error("Failed to load logo:", e);
    }}
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
              bgColor || "bg-gradient-to-br from-green-600 to-blue-600"
            } border-blue-400/50 shadow-blue-400/30 shadow-2xl animate-breathing-glow`
          : `${color} border-gray-200/50 ${
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
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

const POSOrb = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number>(1);
  const posFeatures = [
    {
      id: 1,
      component: <TerminalIcon />,
      name: "POS Terminal",
      color: "bg-[#3B82F6]",
      description: "Beautiful interface for fast in-person checkout",
    },
    {
      id: 2,
      component: <ReceiptIcon />,
      name: "Digital Receipts",
      color: "bg-[#10B981]",
      description: "Email or print receipts with your branding",
    },
    {
      id: 3,
      component: <PaymentIcon />,
      name: "All Payment Types",
      color: "bg-[#F59E0B]",
      description: "Accept cards, mobile pay, cash and more",
    },
    {
      id: 4,
      component: <OnlineIcon />,
      name: "Online Orders",
      color: "bg-[#8B5CF6]",
      description: "Sync with your ecommerce seamlessly",
    },
    {
      id: 5,
      component: <InventoryIcon />,
      name: "Real-time Inventory",
      color: "bg-[#EC4899]",
      description: "Stock levels update across all channels",
    },
  ];

  // Auto-rotate active feature
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => (prev % posFeatures.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Constants for layout calculation
  const radius = 160;
  const svgSize = 420;
  const svgCenter = svgSize / 2;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 max-w-6xl mx-auto">
      {/* Left side - Description */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Complete POS Solution
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Sell <span className="font-semibold text-green-600">in-person</span>{" "}
          and <span className="font-semibold text-blue-600">online</span> with
          the same system.{" "}
          <span className="font-semibold text-purple-600">Accept payments</span>
          ,{" "}
          <span className="font-semibold text-yellow-600">print receipts</span>,{" "}
          <span className="font-semibold text-pink-600">track everything</span>.
        </p>
        {/* Active feature description */}
        <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
          <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">
            {posFeatures.find((f) => f.id === activeId)?.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {posFeatures.find((f) => f.id === activeId)?.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {posFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`px-4 py-2 rounded-full  backdrop-blur-sm flex items-center gap-2 border border-white/20 transition-all ${
                activeId === feature.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`w-7 h-7 rounded-full bg-blue-300 flex items-center justify-center"`}
              >
                {React.cloneElement(feature.component, {
                  className: "w-5 h-5",
                })}
              </div>
              <span className="text-sm font-medium text-black-800 dark:text-gray-200">
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Right side - Interactive Orb */}
      <div className="relative w-[420px] h-[420px] scale-75 md:scale-90">
        {/* SVG container for all connecting lines */}
        <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
          <g>
            {posFeatures.map((feature, i) => {
              const angleInDegrees = -90 + i * 72;
              const angleInRadians = angleInDegrees * (Math.PI / 180);
              const endX = svgCenter + radius * Math.cos(angleInRadians);
              const endY = svgCenter + radius * Math.sin(angleInRadians);
              return (
                <line
                  key={`line-${feature.id}`}
                  x1={svgCenter}
                  y1={svgCenter}
                  x2={endX}
                  y2={endY}
                  stroke={activeId === feature.id ? feature.color : "#ffffff"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={{
                    opacity: activeId === feature.id ? 0.6 : 0.2,
                  }}
                />
              );
            })}
          </g>
        </svg>
        {/* The main container that acts as the center for the circle */}
        <div className="absolute top-1/2 left-1/2">
          {/* Center Icon - POS Hub */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
            <IconWrapper
              className="w-20 h-20"
              isHighlighted={true}
              animationDelay={0}
              bgColor="bg-gradient-to-br from-green-600 to-blue-600"
              padding="p-4" // Reduced padding
            >
              <POSCenterIcon />
            </IconWrapper>
          </div>
          {/* Mapping over the features to place them */}
          {posFeatures.map((feature, i) => {
            const angleInDegrees = -90 + i * 72;
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);
            const iconStyle = {
              transform: `translate(${x}px, ${y}px)`,
            };
            return (
              <div
                key={feature.id}
                className="absolute z-10"
                style={iconStyle}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveId(feature.id)}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <IconWrapper
                    className="w-20 h-20"
                    isActive={activeId === feature.id}
                    isHovered={hoveredId === feature.id}
                    animationDelay={i * 0.15}
                    color={feature.color}
                    padding="p-4" // Reduced padding
                  >
                    <div className="w-5/6 h-5/6">
                      {" "}
                      {/* Increased size to fill more space */}
                      {feature.component}
                    </div>
                  </IconWrapper>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function CompletePOSSolution() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-4 overflow-hidden">
      {/* Style block to define the animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes breathing-glow {
            0% { box-shadow: 0 0 20px 0px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.2); }
            100% { box-shadow: 0 0 20px 0px rgba(16, 185, 129, 0.3); }
          }
          .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>
      {/* Enhanced background with a radial gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(74,222,128,0.1),rgba(255,255,255,0))]"></div>
      </div>
      <div className="relative z-10 container mx-auto">
        <POSOrb />
      </div>
    </div>
  );
}
