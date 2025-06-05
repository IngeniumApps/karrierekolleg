interface MessageIconProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

export default function MessageIcon({
  className = '',
  stroke = 'currentColor',
  strokeWidth = 2.5,
}: MessageIconProps) {
  return (
    <svg
      className={className}
      viewBox="-2 -2 42 40"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.8 32.7C8.9 32.7 13.2 30.6 16.4 28.3C27.3 28.6 35.4 22.4 35.4 14.2C35.4 6.3 27.6 0 17.7 0C7.9 0 0 6.3 0 14.2C0 19.3 3.3 23.9 8.2 26.2C7.5 27.5 6.2 29.4 5.5 30.3C4.7 31.4 5.2 32.7 6.8 32.7Z" />
      <circle cx="10.4" cy="14.3" r="1.5" />
      <circle cx="17.7" cy="14.3" r="1.5" />
      <circle cx="25" cy="14.3" r="1.5" />
    </svg>
  );
}
