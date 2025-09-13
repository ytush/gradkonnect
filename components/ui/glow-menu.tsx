
"use client";
import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"
import { LucideIcon } from "lucide-react"

// A simple hook to mimic next-themes' useTheme for this specific app
const useTheme = () => {
    const [theme, setTheme] = React.useState(() =>
        document.documentElement.classList.contains("dark") ? "dark" : "light"
    );

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.classList.contains("dark")
                ? "dark"
                : "light";
            setTheme(newTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return { theme };
};


export interface MenuItem {
  icon: LucideIcon | React.FC
  label: string
  href: string
  gradient: string
  iconColor: string
  notificationCount?: number
}

interface MenuBarProps extends Omit<HTMLMotionProps<"nav">, "children"> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string) => void
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  (
    {
      className,
      items,
      activeItem,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    const isDarkTheme = theme === "dark"

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg shadow-lg relative overflow-hidden",
          className,
        )}
        {...{
            initial:"initial",
            whileHover:"hover",
        }}
        {...props}
      >
        <motion.div
          className={`absolute -inset-2 bg-gradient-radial from-transparent ${
            isDarkTheme
              ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
              : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
          } to-transparent rounded-3xl z-0 pointer-events-none`}
          {...{ variants:navGlowVariants }}
        />
        <ul className="flex items-center gap-1 sm:gap-2 relative z-10">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.label === activeItem

            return (
              <motion.li key={item.label} className="relative">
                <button
                  onClick={() => onItemClick?.(item.label)}
                  className="block w-full"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    {...{
                      style: { perspective: 600 },
                      whileHover: "hover",
                      initial: "initial",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      {...{
                        variants: glowVariants,
                        animate: isActive ? "hover" : "initial",
                      }}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3 sm:px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      {...{
                        variants: itemVariants,
                        transition: sharedTransition,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="hidden sm:inline-block">{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3 sm:px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      {...{
                        variants: backVariants,
                        transition: sharedTransition,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="hidden sm:inline-block">{item.label}</span>
                    </motion.div>
                  </motion.div>
                </button>
                {item.notificationCount > 0 && (
                  <motion.span
                    className="absolute right-0 top-0 sm:right-1 sm:top-1 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-lg shadow-red-600/50 pointer-events-none"
                    {...{
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        transition: { type: "spring", stiffness: 400, damping: 20 },
                    }}
                  >
                    {item.notificationCount > 9 ? '9+' : item.notificationCount}
                  </motion.span>
                )}
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar"
