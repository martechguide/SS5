import logoImage from "@/assets/Logo_1754723761668.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-16 w-16"
  };

  return (
    <img 
      src={logoImage} 
      alt="Learn Here Free Logo" 
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
}