export interface NavigationMenuProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    delayDuration?: number;
    skipDelayDuration?: number;
    dir?: 'ltr' | 'rtl';
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    children: React.ReactNode;
  }
  
  export interface NavigationMenuItemProps {
    className?: string;
    children: React.ReactNode;
  }
  
  export interface NavigationMenuTriggerProps {
    className?: string;
    children: React.ReactNode;
  }
  
  export interface NavigationMenuContentProps {
    className?: string;
    children: React.ReactNode;
  }
  
  export interface NavigationMenuLinkProps {
    className?: string;
    href: string;
    children: React.ReactNode;
  }
  
  export interface NavigationMenuIndicatorProps {
    className?: string;
  }
  
  export interface NavigationMenuViewportProps {
    className?: string;
  }
  