import React from 'react';
import './ui.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false, ...props }: CardProps) {
  return (
    <div 
      className={`ui-card ${hoverable ? 'ui-card-hoverable' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
