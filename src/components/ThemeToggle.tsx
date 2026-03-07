import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/providers/ThemeProvider"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 rounded-full hover:bg-muted transition-colors group"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme === "light" ? "light" : "dark"}
          initial={{ y: -20, opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 20, opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center"
        >
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-foreground/70 group-hover:text-foreground transition-colors" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] text-yellow-400 fill-yellow-400 group-hover:text-yellow-300 transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
