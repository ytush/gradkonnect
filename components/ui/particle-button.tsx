
"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useState, useRef } from "react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import type { ButtonProps } from "./button";

interface ParticleButtonProps extends ButtonProps {
    onSuccess?: () => void;
    successDuration?: number;
}

function SuccessParticles({
    buttonRef,
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const portalRoot = document.body;
    if (!portalRoot) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    {...{
                        initial: {
                            scale: 0,
                            x: 0,
                            y: 0,
                        },
                        animate: {
                            scale: [0, 1.2, 0],
                            x: [0, (i % 2 ? 1 : -1) * (Math.random() * 60 + 30)],
                            y: [0, -Math.random() * 60 - 30],
                        },
                        transition: {
                            duration: 0.7,
                            delay: i * 0.08,
                            ease: "easeOut",
                        },
                    }}
                    className="fixed w-1.5 h-1.5 bg-white rounded-full z-[9999]"
                    style={{ left: centerX, top: centerY }}
                />
            ))}
        </AnimatePresence>,
        portalRoot
    );
}

const ParticleButton = React.forwardRef<HTMLButtonElement, ParticleButtonProps>(({
    children,
    onClick,
    onSuccess,
    successDuration = 1000,
    className,
    ...props
}, forwardedRef) => {
    const [showParticles, setShowParticles] = useState(false);
    const internalButtonRef = useRef<HTMLButtonElement>(null);

    const buttonRef = forwardedRef || internalButtonRef;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        }

        if (e.defaultPrevented) {
            return;
        }
        
        setShowParticles(true);

        if(onSuccess) {
            onSuccess();
        }

        setTimeout(() => {
            setShowParticles(false);
        }, successDuration);
    };

    return (
        <>
            {showParticles && <SuccessParticles buttonRef={buttonRef as React.RefObject<HTMLButtonElement>} />}
            <Button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative transition-transform duration-150 ease-in-out",
                    showParticles && "scale-95",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        </>
    );
});
ParticleButton.displayName = "ParticleButton";

export { ParticleButton }
