import { Chip } from "./Chip";

interface TempoDisplayProps {
  tempo: number;
  beatSide: string;
  timeSignature: string;
  isPlaying: boolean;
}

export function TempoDisplay({
  tempo,
  beatSide,
  isPlaying,
  timeSignature,
}: TempoDisplayProps) {
  return (
    <div className="text-center mb-10">
      <div className="mb-6 flex justify-center">
        <div className="flex flex-wrap gap-2 jusctify-center items-center">
          <Chip variant="emerald">{tempo.toFixed(1)} BPM</Chip>
          <Chip variant="amber">{timeSignature}</Chip>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-6">
        <div
          className={`w-4 h-16 rounded-lg transition-all duration-300 ${
            beatSide === "left" && isPlaying
              ? "bg-teal-500 shadow-lg shadow-teal-500/50 scale-110 animate-pulse"
              : "bg-gray-700 scale-100"
          }`}
          aria-label="Left beat indicator"
          role="presentation"
        ></div>
        <div
          className={`w-4 h-16 rounded-lg transition-all duration-300 ${
            beatSide === "right" && isPlaying
              ? "bg-yellow-500 shadow-lg shadow-yellow-500/50 scale-110 animate-pulse"
              : "bg-gray-700 scale-100"
          }`}
          aria-label="Right beat indicator"
          role="presentation"
        ></div>
      </div>
    </div>
  );
}
