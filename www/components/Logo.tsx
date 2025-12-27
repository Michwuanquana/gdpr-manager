export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definice */}
      <defs>
        <linearGradient id="shieldGradient" x1="50" y1="8" x2="50" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA"/>
          <stop offset="100%" stopColor="#2563EB"/>
        </linearGradient>
      </defs>
      
      {/* Štít - čistší tvar s gradientem */}
      <path
        d="M50 8 L88 24 L88 52 Q88 78 50 94 Q12 78 12 52 L12 24 Z"
        fill="url(#shieldGradient)"
      />
      
      {/* Checkmark - větší, čitelnější */}
      <path
        d="M35 52 L45 62 L65 42"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
