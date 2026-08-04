import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gold"
  | "success"
  | "warning"
  | "destructive"
  | "whatsapp"
  | "download";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-card active:bg-primary-dark active:shadow-none focus-visible:ring-primary",
  secondary:
    "bg-secondary text-primary shadow-soft hover:bg-accent hover:shadow-card active:shadow-none focus-visible:ring-secondary",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:shadow-card active:bg-primary-dark focus-visible:ring-primary",
  ghost:
    "bg-transparent text-primary hover:bg-surface-soft active:bg-border/40 focus-visible:ring-primary",
  gold:
    "bg-accent text-primary shadow-gold hover:bg-secondary hover:shadow-card-hover active:shadow-soft focus-visible:ring-accent",
  success:
    "bg-success text-white shadow-soft hover:brightness-110 hover:shadow-card active:brightness-95 focus-visible:ring-success",
  warning:
    "bg-warning text-white shadow-soft hover:brightness-110 hover:shadow-card active:brightness-95 focus-visible:ring-warning",
  destructive:
    "bg-error text-white shadow-soft hover:brightness-110 hover:shadow-card active:brightness-95 focus-visible:ring-error",
  whatsapp:
    "bg-[#25D366] text-white shadow-soft hover:brightness-105 hover:shadow-card active:brightness-95 focus-visible:ring-[#25D366]",
  download:
    "bg-primary-dark text-white shadow-soft hover:bg-primary hover:shadow-card active:shadow-none focus-visible:ring-primary-dark",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const baseClasses =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-lg font-heading font-semibold " +
  "transition-all duration-200 ease-out will-change-transform " +
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-100 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none " +
  "motion-reduce:hover:translate-y-0 motion-reduce:transition-colors";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "left",
    className,
    children,
  } = props;

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  const iconMotion =
    iconPosition === "right"
      ? "transition-transform duration-200 group-hover/btn:translate-x-0.5 motion-reduce:group-hover/btn:translate-x-0"
      : "transition-transform duration-200 group-hover/btn:-translate-x-0.5 motion-reduce:group-hover/btn:translate-x-0";

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon aria-hidden="true" size={18} className={iconMotion} />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon aria-hidden="true" size={18} className={iconMotion} />}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button {...buttonProps} className={classes} type={buttonProps.type ?? "button"}>
      {content}
    </button>
  );
}
