import { AnimatePresence, motion } from "framer-motion";
import { animation } from "./animation";

export function ErrorMessage({ error }: { error: string | undefined }) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.span
          key={error}
          {...animation}
          className="text-sm text-red-600"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
