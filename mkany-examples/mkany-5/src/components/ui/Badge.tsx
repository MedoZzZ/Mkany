import React from 'react';
import './ui.css';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'dimmed';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'dimmed', className = '' }: BadgeProps) {
  return (
    <span className={`ui-badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}
