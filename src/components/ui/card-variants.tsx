import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        elevated: "shadow-elegant",
        glass: "bg-white/10 backdrop-blur-md border-white/20 shadow-glow",
        gradient: "bg-gradient-secondary shadow-elegant border-0",
        premium: "bg-gradient-primary text-white shadow-glow border-primary-glow/20",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)