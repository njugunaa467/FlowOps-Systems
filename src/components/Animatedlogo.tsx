export default function Animatedlogo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="52"
        height="52"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_18px_rgba(34,197,94,0.35)]"
      >
        {/* Rotating orbit */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 60 60"
            to="360 60 60"
            dur="10s"
            repeatCount="indefinite"
          />

          <circle
            cx="18"
            cy="60"
            r="6"
            fill="#22c55e"
          />

          <circle
            cx="102"
            cy="60"
            r="4"
            fill="#4ade80"
          />
        </g>

        {/* Infinity Shape */}
        <path
          d="M30 60C30 42 42 32 56 32C72 32 80 48 92 60C80 72 72 88 56 88C42 88 30 78 30 60ZM64 60C76 48 84 32 100 32C114 32 126 42 126 60C126 78 114 88 100 88C84 88 76 72 64 60Z"
          stroke="url(#paint0_linear)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 400;400 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Glow Layer */}
        <path
          d="M30 60C30 42 42 32 56 32C72 32 80 48 92 60C80 72 72 88 56 88C42 88 30 78 30 60ZM64 60C76 48 84 32 100 32C114 32 126 42 126 60C126 78 114 88 100 88C84 88 76 72 64 60Z"
          stroke="#22c55e"
          strokeOpacity="0.25"
          strokeWidth="18"
          fill="none"
        />

        <defs>
          <linearGradient
            id="paint0_linear"
            x1="20"
            y1="20"
            x2="120"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22c55e" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col leading-tight">
        <span className="text-white font-bold text-lg tracking-wide">
          FlowOps
        </span>

        <span className="text-gray-400 text-xs uppercase tracking-[0.25em]">
          Systems
        </span>
      </div>
    </div>
  );
}