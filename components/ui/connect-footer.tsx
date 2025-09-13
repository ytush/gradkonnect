
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesCore } from './sparkles';

const ConnectFooter = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.footer
            {...{
                initial: { y: 100, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { type: 'spring', stiffness: 100, damping: 20, delay: 1 },
            }}
            className="fixed bottom-0 left-0 right-0 z-40 p-2"
            aria-labelledby="connect-heading"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="group relative max-w-4xl mx-auto p-px rounded-2xl bg-gradient-to-tr from-blue-950/50 to-black/40 shadow-[0_0_40px_-15px_rgba(30,58,138,0.4)]"
            >
                {/* Background and blur */}
                <div className="absolute inset-px bg-gradient-to-b from-[#010409]/95 to-[#000000]/95 backdrop-blur-xl rounded-[15px] -z-20" />
                
                {/* Animated Sparkles Effect */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            {...{
                                initial: { opacity: 0 },
                                animate: { opacity: 1 },
                                exit: { opacity: 0 },
                                transition: { duration: 0.5 },
                            }}
                            className="absolute inset-0 rounded-[15px] overflow-hidden -z-10"
                        >
                            <SparklesCore
                                background="transparent"
                                minSize={0.4}
                                maxSize={1.2}
                                particleDensity={350}
                                className="w-full h-full"
                                particleColor="#60a5fa"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="w-full rounded-[15px] p-2 md:p-4 flex items-center justify-between flex-wrap gap-y-2 gap-x-4">
                    <div className="text-center md:text-left flex-1 min-w-0">
                        <h3 id="connect-heading" className="text-base md:text-lg font-bold text-white [text-shadow:0_0_12px_rgba(37,99,235,0.6)]">
                            Do you want to contribute to our vision?
                        </h3>
                        <p className="text-xs md:text-sm text-blue-400/70">
                            Feel free to reach out to us!
                        </p>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 mx-auto md:mx-0">
                        <motion.a
                            href="mailto:contribute@studentnation.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Email us"
                            {...{
                                whileHover: { y: -3, scale: 1.05 },
                                transition: { type: 'spring', stiffness: 400, damping: 15 },
                            }}
                            className="group/icon p-2 md:p-3 rounded-full bg-black/30 border border-blue-800/50 hover:border-blue-600 hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all duration-300"
                        >
                            <i className="ri-mail-line text-lg md:text-xl text-blue-400 group-hover/icon:text-white transition-colors"></i>
                        </motion.a>
                        <motion.a
                            href="https://wa.me/1234567890" // Placeholder number
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact us on WhatsApp"
                            {...{
                                whileHover: { y: -3, scale: 1.05 },
                                transition: { type: 'spring', stiffness: 400, damping: 15 },
                            }}
                            className="group/icon p-2 md:p-3 rounded-full bg-black/30 border border-blue-800/50 hover:border-blue-600 hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all duration-300"
                        >
                            <i className="ri-whatsapp-line text-lg md:text-xl text-blue-400 group-hover/icon:text-white transition-colors"></i>
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/company/studentnation" // Placeholder URL
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Connect with us on LinkedIn"
                            {...{
                                whileHover: { y: -3, scale: 1.05 },
                                transition: { type: 'spring', stiffness: 400, damping: 15 },
                            }}
                            className="group/icon p-2 md:p-3 rounded-full bg-black/30 border border-blue-800/50 hover:border-blue-600 hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all duration-300"
                        >
                            <i className="ri-linkedin-line text-lg md:text-xl text-blue-400 group-hover/icon:text-white transition-colors"></i>
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </motion.footer>
    );
};

export default ConnectFooter;
