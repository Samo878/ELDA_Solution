import type { ReactNode } from 'react';
import './FullPageScroll.css';

interface FullPageScrollProps {
  activeIndex: number;
  children: ReactNode[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FullPageScroll({
  activeIndex,
  children,
  containerRef,
}: FullPageScrollProps) {
  return (
    <div className="fps" ref={containerRef}>
      <div
        className="fps__track"
        style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
      >
        {children.map((child, i) => (
          <div className="fps__section" key={i}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
