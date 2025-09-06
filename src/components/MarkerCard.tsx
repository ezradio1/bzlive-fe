interface MarkerCardProps {
  title: string;
  name: string | null;
  opacity?: string;
  progress?: number;
  showProgress?: boolean;
}

export function MarkerCard({ title, name, opacity = "opacity-100", progress = 0, showProgress = false }: MarkerCardProps) {
  return (
    <div className={`bg-white/10 rounded-xl p-6 border border-white/20 ${opacity}`}>
      <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">{title}</h3>
      <p className={`text-lg font-semibold ${opacity === "opacity-60" ? "text-gray-300" : "text-white"}`}>
        {name || "-"}
      </p>
      {showProgress && (
        <div className="w-full bg-gray-700 rounded-full h-4 mt-4 border border-gray-600 overflow-hidden shadow-inner relative">
          <div
            className={`h-full rounded-full ${
              progress > 0
                ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"
                : "bg-gray-600"
            }`}
            style={{ width: progress > 0 ? `${progress}%` : "100%" }}
          ></div>
          {progress === 0 && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-600 to-gray-500 rounded-full opacity-30"></div>
          )}
        </div>
      )}
    </div>
  );
}
