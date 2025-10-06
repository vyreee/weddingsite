import * as React from "react";

export interface BrandCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function BrandCard({ title, subtitle, className = "", children, ...props }: BrandCardProps) {
  return (
    <div
      className={[
        "rounded-xl border bg-brand-accent/10 border-brand-secondary/30 text-brand-dark shadow-sm",
        "p-6 backdrop-blur-sm",
        className,
      ].join(" ")}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold text-brand-primary">{title}</h3>}
          {subtitle && <p className="text-sm text-brand-secondary mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export default BrandCard;
