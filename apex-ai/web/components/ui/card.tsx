import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-bg-surface border border-border rounded-lg p-5", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn("text-sm font-medium text-text-secondary uppercase tracking-wider", className)}>{children}</h3>;
}

export function CardValue({ children, className }: CardProps) {
  return <p className={cn("text-2xl font-semibold text-text-primary mt-1", className)}>{children}</p>;
}
