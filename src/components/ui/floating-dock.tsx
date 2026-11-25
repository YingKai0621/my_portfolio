"use client";

// Adapted from the Aceternity UI Floating Dock registry component.
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type DockItem = {
  title: string;
  icon: ReactNode;
  href?: string;
  active?: boolean;
  external?: boolean;
};

type FloatingDockProps = {
  items: DockItem[];
  menuLabel: string;
  unavailableLabel: string;
  desktopClassName?: string;
  mobileClassName?: string;
};

export function FloatingDock({ items, menuLabel, unavailableLabel, desktopClassName, mobileClassName }: FloatingDockProps) {
  const pointerX = useMotionValue(Infinity);
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div
        className={cn("dock-desktop", desktopClassName)}
        onPointerMove={(event) => {
          if (event.pointerType === "mouse" && !reducedMotion) pointerX.set(event.clientX);
        }}
        onPointerLeave={() => pointerX.set(Infinity)}
      >
        {items.map((item) => <DockIcon key={item.title} item={item} pointerX={pointerX} unavailableLabel={unavailableLabel} reducedMotion={Boolean(reducedMotion)} />)}
      </div>

      <div className={cn("dock-mobile", mobileClassName)} onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}>
        <AnimatePresence>
          {open && (
            <motion.div
              className="dock-mobile-panel"
              id="mobile-dock-panel"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              {items.map((item) => item.href ? (
                <a className={cn("dock-mobile-item", item.active && "dock-active")} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} aria-current={item.active ? "page" : undefined} key={item.title} onClick={() => setOpen(false)}>
                  {item.icon}<span>{item.title}</span>
                </a>
              ) : (
                <div className="dock-mobile-item dock-unavailable" key={item.title} aria-disabled="true">
                  {item.icon}<span>{item.title}</span><small>{unavailableLabel}</small>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button ref={triggerRef} className="dock-mobile-trigger" type="button" aria-label={menuLabel} aria-expanded={open} aria-controls={open ? "mobile-dock-panel" : undefined} onClick={() => setOpen((value) => !value)}>
          <IconLayoutNavbarCollapse aria-hidden="true" size={22} stroke={1.7} />
        </button>
      </div>
    </>
  );
}

function DockIcon({ item, pointerX, unavailableLabel, reducedMotion }: {
  item: DockItem;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  unavailableLabel: string;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(pointerX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? x - bounds.left - bounds.width / 2 : Infinity;
  });
  const target = useTransform(distance, [-120, 0, 120], [46, 62, 46]);
  const size = useSpring(target, { mass: 0.16, stiffness: 180, damping: 19 });
  const label = item.href ? item.title : `${item.title} · ${unavailableLabel}`;
  const className = cn("dock-icon", item.active && "dock-active", !item.href && "dock-unavailable");
  const content = <><span className="dock-icon-symbol" aria-hidden="true">{item.icon}</span><span className="dock-tooltip" aria-hidden="true">{label}</span></>;

  return (
    <div ref={ref} className="dock-icon-wrap">
      {item.href ? (
        <motion.a className={className} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} aria-label={label} aria-current={item.active ? "page" : undefined} style={reducedMotion ? undefined : { width: size, height: size }}>{content}</motion.a>
      ) : (
        <motion.button className={className} type="button" aria-disabled="true" aria-label={label} style={reducedMotion ? undefined : { width: size, height: size }}>{content}</motion.button>
      )}
    </div>
  );
}
