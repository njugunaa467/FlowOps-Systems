declare module "lucide-react" {
  import React from "react";
  
  interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }
  
  type LucideIcon = React.FC<LucideProps>;
  
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Mail: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Check: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Brain: LucideIcon;
  export const Zap: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const Workflow: LucideIcon;
  export const BarChart3: LucideIcon;
  export const Layers: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Cpu: LucideIcon;
  export const Rocket: LucideIcon;
  export const Users: LucideIcon;
  export const Shield: LucideIcon;
  export const Twitter: LucideIcon;
  export const Linkedin: LucideIcon;
  export const LinkedIn: LucideIcon;
  export const Github: LucideIcon;
}
