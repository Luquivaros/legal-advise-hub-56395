import * as React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string | number;
  label: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  variant?: "default" | "glassmorphism";
  className?: string;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ value, label, trend, variant = "default", className, ...props }, ref) => {
    const baseStyles = variant === "glassmorphism" 
      ? "relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-6 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden"
      : "p-6 bg-gradient-to-br from-card to-card/95 shadow-lg rounded-2xl border border-border/30";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, className)}
        {...props}
      >
        {/* Glassmorphism texture overlay */}
        {variant === "glassmorphism" && (
          <>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          </>
        )}
        {/* Content Container */}
        <dl className={cn("space-y-2", variant === "glassmorphism" && "relative z-10")}>
          <dt className={cn(
            "text-xs font-medium uppercase tracking-wide",
            variant === "glassmorphism" ? "text-white/90" : "text-muted-foreground"
          )}>
            {label}
          </dt>
          
          <dd className={cn(
            "text-2xl font-bold md:text-3xl leading-none",
            variant === "glassmorphism" ? "text-white" : "text-foreground"
          )}>
            {value}
          </dd>
          
          {trend && (
            <dd className={cn(
              "flex items-center space-x-1 text-sm font-medium",
              variant === "glassmorphism" 
                ? "text-white/90 drop-shadow-sm" 
                : trend.isPositive ? "text-trend-up" : "text-trend-down"
            )}>
              <span>{trend.value}</span>
              {trend.isPositive ? (
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17.25 15.25V6.75H8.75"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17 7L6.75 17.25"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17.25 8.75V17.25H8.75"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17 17L6.75 6.75"></path>
                </svg>
              )}
            </dd>
          )}
        </dl>
      </div>
    );
  }
);

MetricCard.displayName = "MetricCard";

export { MetricCard };