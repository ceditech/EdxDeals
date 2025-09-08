declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = ComponentType<LucideProps>;

  // All icons used in the project
  export const ALargeSmall: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const Bell: LucideIcon;
  export const BellRing: LucideIcon;
  export const Bot: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Circle: LucideIcon;
  export const Clock: LucideIcon;
  export const Contrast: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Facebook: LucideIcon;
  export const Filter: LucideIcon;
  export const Gift: LucideIcon;
  export const Globe: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Heart: LucideIcon;
  export const Home: LucideIcon;
  export const HomeIcon: LucideIcon;
  export const Instagram: LucideIcon;
  export const Laptop: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Loader2: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Package: LucideIcon;
  export const PanelLeft: LucideIcon;
  export const Percent: LucideIcon;
  export const Phone: LucideIcon;
  export const Play: LucideIcon;
  export const Search: LucideIcon;
  export const Send: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Star: LucideIcon;
  export const Twitter: LucideIcon;
  export const UserCircle: LucideIcon;
  export const Users: LucideIcon;
  export const X: LucideIcon;
  export const Zap: LucideIcon;
  export const ZoomIn: LucideIcon;
  export const ZoomOut: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const BarChart3: LucideIcon;

  // Export all other icons as a generic type for future use
  const lucideReact: {
    [key: string]: LucideIcon;
  };

  export default lucideReact;
}