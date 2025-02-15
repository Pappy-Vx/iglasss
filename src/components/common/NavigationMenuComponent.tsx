import { FC, forwardRef } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import {
  NavigationMenuProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuIndicatorProps,
  NavigationMenuViewportProps,
} from "../../types/NavigationMenu.types";

// Main NavigationMenu component
export const NavigationMenuComponent: FC<NavigationMenuProps> = ({
  defaultValue,
  value,
  onValueChange,
  delayDuration = 200,
  skipDelayDuration = 300,
  dir = "ltr",
  orientation = "horizontal",
  className,
  children,
}) => (
  <NavigationMenu.Root
    defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    dir={dir}
    orientation={orientation}
    className={clsx("NavigationMenuRoot", className)}
  >
    {children}
  </NavigationMenu.Root>
);

// NavigationMenu Item component
export const NavigationMenuItem: FC<NavigationMenuItemProps> = ({
  className,
  children,
}) => (
  <NavigationMenu.Item className={clsx("NavigationMenuItem", className)}>
    {children}
  </NavigationMenu.Item>
);

// NavigationMenu Trigger component
export const NavigationMenuTrigger = forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <NavigationMenu.Trigger
    className={clsx("NavigationMenuTrigger", className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </NavigationMenu.Trigger>
));

// NavigationMenu Content component
export const NavigationMenuContent = forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <NavigationMenu.Content
    className={clsx("NavigationMenuContent", className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </NavigationMenu.Content>
));

// NavigationMenu Link component
export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, href, children, ...props }, forwardedRef) => (
  <NavigationMenu.Link asChild>
    <a
      className={clsx("NavigationMenuLink", className)}
      href={href}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </a>
  </NavigationMenu.Link>
));

// NavigationMenu Indicator component
export const NavigationMenuIndicator: FC<NavigationMenuIndicatorProps> = ({
  className,
}) => (
  <NavigationMenu.Indicator
    className={clsx("NavigationMenuIndicator", className)}
  />
);

// NavigationMenu Viewport component
export const NavigationMenuViewport: FC<NavigationMenuViewportProps> = ({
  className,
}) => (
  <NavigationMenu.Viewport
    className={clsx("NavigationMenuViewport", className)}
  />
);

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
NavigationMenuContent.displayName = "NavigationMenuContent";
NavigationMenuLink.displayName = "NavigationMenuLink";
