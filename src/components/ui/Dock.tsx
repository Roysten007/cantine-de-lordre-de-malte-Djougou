import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue, type SpringOptions } from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import './Dock.css';

interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  label: string;
  staticCenter?: number;
}

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  staticCenter
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  // Calculate distance based on the static captured center to eliminate feedback loops (vibration)
  const mouseDistance = useTransform(mouseX, val => {
    if (val === Infinity || staticCenter === undefined) {
      return Infinity;
    }
    return val - staticCenter;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, child => {
        if (React.isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, { isHovered });
        }
        return child;
      })}
    </motion.div>
  );
}

interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: MotionValue<number>;
}

function DockLabel({ children, className = '', ...rest }: DockLabelProps) {
  const isHovered = rest.isHovered;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export interface DockItemConfig {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DockProps {
  items: DockItemConfig[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const panelRef = useRef<HTMLDivElement>(null);
  const [itemCenters, setItemCenters] = useState<number[]>([]);

  // Capture static item positions when the mouse enters the dock.
  // Since they are static during hover, this prevents the layout shift feedback loop (vibration/jitter).
  const handleMouseEnter = () => {
    if (panelRef.current) {
      const itemElements = panelRef.current.querySelectorAll('.dock-item');
      const centers: number[] = [];
      itemElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        centers.push(rect.left + rect.width / 2 + window.scrollX);
      });
      setItemCenters(centers);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  return (
    <div 
      style={{ height: panelHeight, overflow: 'visible' }} 
      className="dock-outer relative flex items-center justify-center"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={panelRef}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
            staticCenter={itemCenters[index]}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
