import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}
export const Button: React.FC<ButtonProps> = ({
  variant = "primary", size = "md", children, ...props
}) => <button data-variant={variant} data-size={size} {...props}>{children}</button>;
