"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva("fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-sidebar text-sidebar-foreground", {
  variants: {
    variant: {
      default: "w-[var(--sidebar-width)]",
      collapsed: "w-[var(--sidebar-width-collapsed)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface SidebarContextValue {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultIsCollapsed?: boolean
}

export function SidebarProvider({ children, defaultIsCollapsed = false }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultIsCollapsed)

  return <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>{children}</SidebarContext.Provider>
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, variant, ...props }: SidebarProps) {
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        sidebarVariants({
          variant: isCollapsed ? "collapsed" : variant,
        }),
        className,
      )}
      {...props}
    />
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("flex h-14 items-center border-b px-4", className)} {...props} />
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto py-2", className)} {...props} />
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("flex items-center border-t p-4", className)} {...props} />
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn("pb-4", className)} {...props} />
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("grid gap-1 px-2", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn("", className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  {
    variants: {
      variant: {
        default: "",
        ghost: "hover:bg-transparent hover:underline",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
      },
      isActive: {
        true: "bg-sidebar-accent text-sidebar-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isActive: false,
    },
  },
)

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, variant, size, isActive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp>
        <button
          ref={ref}
          className={cn(
            sidebarMenuButtonVariants({
              variant,
              size,
              isActive,
              className,
            }),
          )}
          {...props}
        />
      </Comp>
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
      onClick={() => setIsCollapsed(!isCollapsed)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M9 3v18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { isCollapsed } = useSidebar()

  if (!isCollapsed) {
    return null
  }

  return (
    <div className={cn("absolute inset-y-0 right-0 w-1 cursor-col-resize bg-sidebar-border", className)} {...props} />
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col",
        isCollapsed ? "ml-[var(--sidebar-width-collapsed)]" : "ml-[var(--sidebar-width)]",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-sidebar-border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sidebar-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

