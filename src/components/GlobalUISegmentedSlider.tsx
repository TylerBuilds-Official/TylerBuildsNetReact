import React, { useState, useRef, useEffect, useCallback } from "react";

type SegmentedTab = {
  key: string;
  label: React.ReactNode;
};

type SegmentedSliderProps = {
  tabs: SegmentedTab[];
  active: string;
  onSelect: (key: string) => void;
  ariaLabel?: string;
  className?: string;
};

const SegmentedSlider: React.FC<SegmentedSliderProps> = ({ tabs, active, onSelect, ariaLabel, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>("[aria-selected='true']");
    if (!activeBtn) return;
    setIndicator({
      left: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
    });
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [active, updateIndicator]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(container);

    window.addEventListener("resize", updateIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <div
      className={`segmented segmented-slider ${className}`}
      role="tablist"
      aria-label={ariaLabel}
      ref={containerRef}
    >
      <span
        className="segmented-indicator"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          className={active === tab.key ? "active" : ""}
          onClick={() => onSelect(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedSlider;
