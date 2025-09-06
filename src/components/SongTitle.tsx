interface SongTitleProps {
  currentSong: string;
}

export function SongTitle({ currentSong }: SongTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-6xl font-semibold text-center text-slate-200 select-text tracking-widest uppercase">
        {currentSong}
      </h2>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
      </div>
    </div>
  );
}
