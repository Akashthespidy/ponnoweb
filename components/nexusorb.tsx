"use client";
import React, { useState } from "react";

// Social Media Icons (white on brand-colored backgrounds)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
      fill="white"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      fill="white"
    />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.616 4.471 8.653V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.628 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z"
      fill="white"
    />
  </svg>
);

// Website Icon from Flaticon (converted to white)
const WebsiteIcon = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M208,64h66.75a32,32,0,0,1,22.62,9.37L438.63,214.63A32,32,0,0,1,448,237.25V432a48,48,0,0,1-48,48H192a48,48,0,0,1-48-48V304"
      fill="none"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <path
      d="M288,72V192a32,32,0,0,0,32,32H440"
      fill="none"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <rect
      x="64"
      y="304"
      width="112"
      height="128"
      rx="32"
      fill="none"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <line
      x1="144"
      y1="360"
      x2="96"
      y2="360"
      fill="none"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);

const AIChatIcon = () => (
  <svg
    width="2.2em"
    height="2.2em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4609 20 9.01172 19.6565 7.74466 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Wrapper for individual icons with increased padding
const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
  bgColor = "bg-blue-500",
  padding = "p-6", // Increased padding
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
  bgColor?: string;
  padding?: string;
}) => (
  <div
    className={`
      backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300
      ${padding} // Applied padding here
      ${
        isHighlighted
          ? `${bgColor} border border-blue-400/50 shadow-blue-400/30 shadow-2xl animate-breathing-glow`
          : `${bgColor} border border-gray-200/50 ${
              !isHovered && "animate-float"
            }`
      }
      ${
        isHovered
          ? "border-blue-400/60 scale-110 shadow-blue-400/40 shadow-2xl"
          : "hover:bg-opacity-90 hover:border-gray-300/60"
      }
      ${className}
  `}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

const SocialMediaOrb = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const socialIcons = [
    {
      id: 1,
      component: <FacebookIcon />,
      name: "Facebook",
      bgColor: "bg-[#1877F2]",
    },
    {
      id: 2,
      component: <WhatsAppIcon />,
      name: "WhatsApp",
      bgColor: "bg-[#25D366]",
    },
    {
      id: 3,
      component: <InstagramIcon />,
      name: "Instagram",
      bgColor: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    },
    {
      id: 4,
      component: <MessengerIcon />,
      name: "Messenger",
      bgColor: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF]",
    },
    {
      id: 5,
      component: <WebsiteIcon />,
      name: "Website",
      bgColor: "bg-[#4285F4]",
    },
  ];

  // Constants for layout calculation
  const radius = 160;
  const centralIconRadius = 48;
  const outerIconRadius = 40;
  const svgSize = 380;
  const svgCenter = svgSize / 2;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 max-w-6xl mx-auto">
      {/* Left side - Description */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Unified Social Commerce Platform
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Handle <span className="font-semibold text-blue-600">Facebook</span>,{" "}
          <span className="font-semibold text-pink-600">Instagram</span>,{" "}
          <span className="font-semibold text-green-600">WhatsApp</span> orders
          and support from one dashboard. Your customers can buy directly
          through{" "}
          <span className="font-semibold text-blue-600">
            Automated chat system
          </span>{" "}
          .
        </p>
        <div className="flex flex-wrap gap-3">
          {socialIcons.map((icon) => (
            <div
              key={icon.id}
              className={`px-4 py-2 rounded-full ${icon.bgColor} bg-opacity-20 backdrop-blur-sm flex items-center gap-2 border border-white/20`}
            >
              <div
                className={`w-6 h-6 rounded-full ${icon.bgColor} flex items-center justify-center`}
              >
                {React.cloneElement(icon.component, { width: 12, height: 12 })}
              </div>
              <span className="text-sm font-medium text-white">
                {icon.name}
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
            {socialIcons.map((icon, i) => {
              const angleInDegrees = -90 + i * 72;
              const angleInRadians = angleInDegrees * (Math.PI / 180);
              const startX =
                svgCenter + centralIconRadius * Math.cos(angleInRadians);
              const startY =
                svgCenter + centralIconRadius * Math.sin(angleInRadians);
              const endX =
                svgCenter +
                (radius - outerIconRadius) * Math.cos(angleInRadians);
              const endY =
                svgCenter +
                (radius - outerIconRadius) * Math.sin(angleInRadians);

              return (
                <line
                  key={`line-${icon.id}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={hoveredId === icon.id ? "#3B82F6" : "#ffffff"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={{
                    opacity: hoveredId === icon.id ? 0.8 : 0.3,
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* The main container that acts as the center for the circle */}
        <div className="absolute top-1/2 left-1/2">
          {/* Center Icon - AI Chat */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
            <IconWrapper
              className="w-24 h-24"
              isHighlighted={true}
              animationDelay={0}
              bgColor="bg-gradient-to-br from-blue-600 to-purple-600"
              padding="p-8" // Increased padding for center icon
            >
              <AIChatIcon />
            </IconWrapper>
          </div>

          {/* Mapping over the social icons to place them */}
          {socialIcons.map((icon, i) => {
            const angleInDegrees = -90 + i * 72;
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            const iconStyle = {
              transform: `translate(${x}px, ${y}px)`,
            };

            return (
              <div
                key={icon.id}
                className="absolute z-10"
                style={iconStyle}
                onMouseEnter={() => setHoveredId(icon.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <IconWrapper
                    className="w-20 h-20"
                    isHovered={hoveredId === icon.id}
                    animationDelay={i * 0.15}
                    bgColor={icon.bgColor}
                    padding="p-6" // Increased padding for outer icons
                  >
                    {icon.component}
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

export default function SocialCommerceHub() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-8 overflow-hidden">
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
            0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); }
            100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
          }
          .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Enhanced background with a radial gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <SocialMediaOrb />
      </div>
    </div>
  );
}
