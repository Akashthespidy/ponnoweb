"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Icons
const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
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

const LoyaltyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AIRecommendationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 10H15M9 14H12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DiscountIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M15 7L7 15M9 7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7ZM17 15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15C15 14.4477 15.4477 14 16 14C16.5523 14 17 14.4477 17 15Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RetentionCenterIcon = () => (
  <Image
    src="/images/web-logo.png"
    alt="Customer Retention Tools"
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
              bgColor || "bg-gradient-to-br from-blue-600 to-purple-600"
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

const RetentionOrb = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number>(1);
  const retentionTools = [
    {
      id: 1,
      component: <CartIcon />,
      name: "Abandoned Cart Recovery",
      color: "bg-[#FF6B6B]",
      description: "Automatically recover lost sales with personalized emails",
    },
    {
      id: 2,
      component: <LoyaltyIcon />,
      name: "Loyalty Programs",
      color: "bg-[#4ECDC4]",
      description: "Reward repeat customers with points & exclusive perks",
    },
    {
      id: 3,
      component: <AIRecommendationIcon />,
      name: "AI Recommendations",
      color: "bg-[#FFBE0B]",
      description: "Smart product suggestions that boost average order value",
    },
    {
      id: 4,
      component: <EmailIcon />,
      name: "Email Sequences",
      color: "bg-[#8338EC]",
      description: "Automated email flows that nurture customer relationships",
    },
    {
      id: 5,
      component: <DiscountIcon />,
      name: "Smart Discounts",
      color: "bg-[#3A86FF]",
      description: "Personalized offers that convert without hurting margins",
    },
  ];

  // Auto-rotate active tool
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => (prev % retentionTools.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Constants for layout calculation
  const radius = 140;
  const svgSize = 380;
  const svgCenter = svgSize / 2;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 max-w-6xl mx-auto">
      {/* Left side - Description */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Customer Retention Tools
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Reduce churn and boost repeat purchases with our{" "}
          <span className="font-semibold text-purple-600">
            abandoned cart recovery
          </span>
          ,{" "}
          <span className="font-semibold text-pink-600">loyalty programs</span>,
          and{" "}
          <span className="font-semibold text-blue-600">
            AI-powered recommendations
          </span>{" "}
          that actually convert.
        </p>
        {/* Active tool description */}
        <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
          <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">
            {retentionTools.find((t) => t.id === activeId)?.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {retentionTools.find((t) => t.id === activeId)?.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {retentionTools.map((tool) => (
            <div
              key={tool.id}
              className={`px-4 py-2 rounded-full  backdrop-blur-sm flex items-center gap-2 border border-white/20 transition-all ${
                activeId === tool.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredId(tool.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`w-7 h-7 rounded-full bg-blue-300  flex items-center justify-center `}
              >
                {React.cloneElement(tool.component, {
                  className: "w-4 h-4",
                })}
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Right side - Interactive Orb */}
      <div className="relative w-[380px] h-[380px] scale-75 md:scale-90">
        {/* SVG container for all connecting lines */}
        <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
          <g>
            {retentionTools.map((tool, i) => {
              const angleInDegrees = -90 + i * 72;
              const angleInRadians = angleInDegrees * (Math.PI / 180);
              const endX = svgCenter + radius * Math.cos(angleInRadians);
              const endY = svgCenter + radius * Math.sin(angleInRadians);
              return (
                <line
                  key={`line-${tool.id}`}
                  x1={svgCenter}
                  y1={svgCenter}
                  x2={endX}
                  y2={endY}
                  stroke={activeId === tool.id ? tool.color : "#ffffff"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={{
                    opacity: activeId === tool.id ? 0.6 : 0.2,
                  }}
                />
              );
            })}
          </g>
        </svg>
        {/* The main container that acts as the center for the circle */}
        <div className="absolute top-1/2 left-1/2">
          {/* Center Icon - Retention Hub */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
            <IconWrapper className="w-24 h-24" isHighlighted={true}>
              <RetentionCenterIcon />
            </IconWrapper>
          </div>
          {/* Mapping over the tools to place them */}
          {retentionTools.map((tool, i) => {
            const angleInDegrees = -90 + i * 72;
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);
            const iconStyle = {
              transform: `translate(${x}px, ${y}px)`,
            };
            return (
              <div
                key={tool.id}
                className="absolute z-10"
                style={iconStyle}
                onMouseEnter={() => setHoveredId(tool.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveId(tool.id)}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <IconWrapper
                    className="w-20 h-20"
                    isActive={activeId === tool.id}
                    color={tool.color}
                  >
                    <div className="w-3/4 h-3/4">{tool.component}</div>
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

export default function CustomerRetentionTools() {
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
            0% { box-shadow: 0 0 20px 0px rgba(168, 85, 247, 0.3); }
            50% { box-shadow: 0 0 35px 10px rgba(236, 72, 153, 0.2); }
            100% { box-shadow: 0 0 20px 0px rgba(168, 85, 247, 0.3); }
          }
          .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>
      {/* Enhanced background with a radial gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(192,132,252,0.1),rgba(255,255,255,0))]"></div>
      </div>
      <div className="relative z-10 container mx-auto">
        <RetentionOrb />
      </div>
    </div>
  );
}
