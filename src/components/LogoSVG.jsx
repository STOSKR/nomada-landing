import React from 'react';

// Logo SVG simple para Nómada con colores pastel
const LogoSVG = ({ width = 40, height = 40 }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Fondo circular con gradiente */}
            <circle cx="100" cy="100" r="100" fill="url(#logoGradient)" />

            {/* Montaña */}
            <path
                d="M40 140L80 80L120 140H40Z"
                fill="#FFFFFF"
                fillOpacity="0.9"
            />

            {/* Montaña más grande */}
            <path
                d="M70 140L120 60L170 140H70Z"
                fill="#FFFFFF"
                fillOpacity="0.7"
            />

            {/* Sol */}
            <circle cx="150" cy="50" r="20" fill="#FFFFFF" fillOpacity="0.9" />

            {/* Camino */}
            <path
                d="M80 140C80 140 100 120 100 100C100 80 120 60 140 60"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="1 12"
            />

            {/* Definición del gradiente */}
            <defs>
                <linearGradient
                    id="logoGradient"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="200"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#7FB3D5" />
                    <stop offset="1" stopColor="#F7CAC9" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default LogoSVG; 