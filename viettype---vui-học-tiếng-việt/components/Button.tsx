import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  fullWidth = false,
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-150 transform active:translate-y-1 active:shadow-none focus:outline-none focus:ring-4 focus:ring-opacity-50 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white border-b-4 border-indigo-800 focus:ring-indigo-500 shadow-lg shadow-indigo-600/25",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border-b-4 border-slate-950 focus:ring-slate-500 shadow-md",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white border-b-4 border-emerald-800 focus:ring-emerald-500 shadow-lg shadow-emerald-600/25",
    danger: "bg-rose-600 hover:bg-rose-500 text-white border-b-4 border-rose-800 focus:ring-rose-500 shadow-lg shadow-rose-600/25",
    accent: "bg-amber-500 hover:bg-amber-400 text-slate-950 border-b-4 border-amber-700 focus:ring-amber-400 shadow-lg shadow-amber-500/25 font-extrabold",
    ghost: "bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/80 focus:ring-slate-600",
    outline: "bg-transparent hover:bg-indigo-950/40 text-indigo-400 border-2 border-indigo-500/50 hover:border-indigo-400 focus:ring-indigo-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs md:text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm md:text-base gap-2",
    lg: "px-7 py-3.5 text-base md:text-lg gap-2.5",
    xl: "px-9 py-4 text-lg md:text-xl gap-3 font-extrabold"
  };

  return (
    <button 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
