import { STATUS_MAP } from "./utils";

import { BookingStatus } from "@/types";

// Variantes du badge
type BadgeVariant = "default" | "ghost" | "outline" | "dot";

interface StatusBadgeProps {
  status: BookingStatus;
  variant?: BadgeVariant;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({
  status,
  variant = "default",
  showIcon = true,
  size = "md",
  className = "",
}: StatusBadgeProps) {
  const cfg = STATUS_MAP[status];

  // Tailles
  const sizeClasses = {
    sm: {
      badge: "px-2 py-0.5 text-xs gap-1",
      icon: "w-3 h-3",
      dot: "w-1.5 h-1.5",
    },
    md: {
      badge: "px-2.5 py-1 text-xs gap-1.5",
      icon: "w-3.5 h-3.5",
      dot: "w-2 h-2",
    },
    lg: {
      badge: "px-3 py-1.5 text-sm gap-2",
      icon: "w-4 h-4",
      dot: "w-2.5 h-2.5",
    },
  };

  const currentSize = sizeClasses[size];

  // Classes de base
  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    transition-all duration-200 ease-in-out
    ${currentSize.badge}
  `;

  // Classes selon la variante
  const variantClasses = {
    default: `${cfg.bgClass} ${cfg.textClass} border border-transparent`,
    ghost: `${cfg.textClass} hover:${cfg.bgClass}`,
    outline: `border ${cfg.borderClass} ${cfg.textClass} hover:${cfg.bgClass}`,
    dot: `${cfg.textClass} ${cfg.bgClass}`,
  };

  // Rendu pour la variante "dot"
  if (variant === "dot") {
    return (
      <span
        aria-label={`Statut: ${cfg.label}`}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        <span
          className={`${currentSize.dot} rounded-full ${cfg.dotClass} animate-pulse`}
        />
        <span className="font-medium">{cfg.label}</span>
      </span>
    );
  }

  return (
    <span
      aria-label={`Statut: ${cfg.label}`}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && <cfg.Icon className={`${currentSize.icon} opacity-70`} />}
      <span>{cfg.label}</span>
    </span>
  );
}
