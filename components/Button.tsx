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
  primary: "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  secondary: "bg-secondary text-primary hover:bg-accent focus-visible:ring-secondary",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus-visible:ring-primary",
  ghost: "bg-transparent text-primary hover:bg-surface-soft focus-visible:ring-primary",
  gold: "bg-accent text-primary hover:bg-secondary focus-visible:ring-accent",
  success: "bg-success text-white hover:opacity-90 focus-visible:ring-success",
  warning: "bg-warning text-white hover:opacity-90 focus-visible:ring-warning",
  destructive: "bg-error text-white hover:opacity-90 focus-visible:ring-error",
  whatsapp: "bg-[#25D366] text-white hover:opacity-90 focus-visible:ring-[#25D366]",
  download: "bg-primary-dark text-white hover:bg-primary focus-visible:ring-primary-dark",
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
  "inline-flex items-center justify-center gap-2 rounded-lg font-heading font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

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

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon aria-hidden="true" size={18} />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon aria-hidden="true" size={18} />}
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
