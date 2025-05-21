"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Menu, X, Music2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import { navigationItems, mobileNavItems } from "@/config/navigation"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              <Music2 className="h-8 w-8 text-blue-400" />
            </motion.div>
            <span className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Bluetune
            </span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                      "text-gray-300 hover:text-white hover:bg-white/10",
                      isActive && "bg-white/10 text-white"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ConnectWalletButton />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="grid grid-cols-2 gap-4">
                {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg transition-colors",
                        "text-gray-300 hover:text-white hover:bg-white/10",
                        isActive && "bg-white/10 text-white"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-4 pt-4 border-t border-white/10">
                <ConnectWalletButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

