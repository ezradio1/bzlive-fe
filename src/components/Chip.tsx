interface ChipProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber';
  className?: string;
}

export function Chip({ children, variant = 'emerald', className = '' }: ChipProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full font-medium text-sm";
  const variantClasses = {
    emerald: "bg-emerald-500/20 border border-emerald-400/30 text-emerald-300",
    amber: "bg-amber-400/20 border border-amber-400/30 text-amber-300"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
