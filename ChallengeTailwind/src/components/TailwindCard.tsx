import React from 'react';

type TailwindCardProps = {
  children: React.ReactNode;
  className?: string;
};

const TailwindCard: React.FC<TailwindCardProps> = ({ children, className = '' }) => {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </section>
  );
};

export default TailwindCard;
