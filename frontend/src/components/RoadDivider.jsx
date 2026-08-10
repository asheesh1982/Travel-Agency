export default function RoadDivider({ className = '' }) {
  return (
    <div
      className={`w-full h-0 border-t-4 border-dashed border-gold/50 ${className}`}
      aria-hidden="true"
    />
  );
}
