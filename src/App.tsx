import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { SongTitle } from "./components/SongTitle";
import { TempoDisplay } from "./components/TempoDisplay";
import { MarkerCard } from "./components/MarkerCard";

type Marker = {
  time: number;
  name: string;
  isSongTitle?: boolean;
};

function App() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [beatSide, setBeatSide] = useState("left");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.100.10:8080");

    ws.onopen = () => console.log("Connected to WebSocket server ✅");

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "update") {
        setMarkers(msg.markers);
        setCurrentTime(msg.currentTime);
        setTempo(msg.tempo);
        setIsPlaying(msg.isPlaying);
      } else if (msg.type === "markers") {
        setMarkers(msg.markers);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected ❌");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, []);

  // Beat animasi
  useEffect(() => {
    if (!tempo || !isPlaying) return;
    const interval = (60 / tempo) * 1000;
    const beatTimer = setInterval(() => {
      setBeatSide((prev) => (prev === "left" ? "right" : "left"));
    }, interval);

    return () => clearInterval(beatTimer);
  }, [tempo, isPlaying]);

  // Tentukan lagu sekarang
  const currentSongMarker = markers
    .filter((m) => m.isSongTitle)
    .reduce<Marker | null>((prev, m) => (m.time <= currentTime ? m : prev), null);

  const currentSong = currentSongMarker
    ? currentSongMarker.name.replace("SONG:", "")
    : "Unknown";

  // Marker prev/current/next
  const activeIndex = markers.findIndex(
    (marker, idx) =>
      currentTime >= marker.time &&
      (idx === markers.length - 1 || currentTime < markers[idx + 1].time)
  );

  const prevMarker = activeIndex > 0 ? markers[activeIndex - 1] : null;
  const currentMarker = activeIndex >= 0 ? markers[activeIndex] : null;
  const nextMarker =
    activeIndex >= 0 && activeIndex < markers.length - 1
      ? markers[activeIndex + 1]
      : null;

  let progress = 0;
  if (currentMarker && nextMarker) {
    const duration = nextMarker.time - currentMarker.time;
    progress = ((currentTime - currentMarker.time) / duration) * 100;
  }

  return (
    <div className="bg-blue-dark text-white h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8 overflow-hidden">
        <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 overflow-hidden">
          <SongTitle currentSong={currentSong} />
          <TempoDisplay tempo={tempo} beatSide={beatSide} isPlaying={isPlaying} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
            <div className="scale-90">
              <MarkerCard
                title="Previous"
                name={prevMarker ? prevMarker.name.replace("SONG:", "") : null}
                opacity="opacity-50"
              />
            </div>
            <MarkerCard
              title="Current"
              name={
                currentMarker ? currentMarker.name?.replace("SONG:", "") : null
              }
              showProgress={true}
              progress={progress}
            />
            <div className="scale-90">
              <MarkerCard
                title="Next"
                name={nextMarker ? nextMarker.name.replace("SONG:", "") : null}
                opacity="opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-400 flex items-center justify-center gap-2 py-2">
        <img src="/src/assets/logo.png" alt="Logo" className="w-6 h-6" />
        Powered by BezaleelSequencer
      </footer>
    </div>
  );
}

export default App;
