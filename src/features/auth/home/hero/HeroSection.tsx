"use client";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../contexts/AuthContext";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroCTA from "./HeroCTA";
import HeroVideo from "./HeroVideo";
import HeroBackground from "./HeroBackground";

const HeroSection: FC = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f5f9ff] to-[#eaf3fe]">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-28 md:pt-24 md:pb-36 lg:pt-28 lg:pb-44">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left"
            >
              <HeroHeading user={user} />
              <HeroDescription user={user} />
              <HeroCTA user={user} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full"
            >
              <HeroVideo />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
