"use client";

import { useState } from "react";
import Link from "next/link";
import { Ellipsis, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle =
    "w-fit bg-white text-black rounded-md px-4 py-1 text-sm font-medium transition hover:bg-gray-200";

  // Parent container controls stagger
    const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
        staggerChildren: 0.4, 
        },
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
    };

    const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" as const }, 
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: { duration: 0.3, ease: "easeIn" as const },
    },
    };


  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 w-[220px]">
      <div className="bg-black text-white rounded-xl px-3 py-2 shadow-xl">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold tracking-wide">Tom</h1>

          <motion.button
            onClick={() => setOpen(!open)}
            className="bg-white text-black p-1.5 rounded-md transition hover:scale-105"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.40 }}
                >
                  <X size={14} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.40 }}
                >
                  <Ellipsis size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
        {open && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }} 
            className="mt-3 border-t border-neutral-700 pt-3 flex flex-col gap-2 overflow-hidden"
            >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <Link href="/" className={linkStyle}>About Me</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Link href="/services" className={linkStyle}>Services</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Link href="/projects" className={linkStyle}>Projects</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Link href="/contact" className={linkStyle}>Contact</Link>
                </motion.div>
                </motion.div>
        )}
        </AnimatePresence>

      </div>
    </div>
  );
}
