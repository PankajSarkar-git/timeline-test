import React, { useRef, useState } from "react";
import "./Timeline.css";
import { rawData } from "./data";

const Timeline = () => {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Calculate the total width based on the max `left + width` of the blocks

  const handleMouseDown = (e) => {
    if (timelineRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - timelineRef.current.offsetLeft);
      setScrollLeft(timelineRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && timelineRef.current) {
      const x = e.pageX - timelineRef.current.offsetLeft;
      const walk = x - startX;
      timelineRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="timeline-container"
      ref={timelineRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="timeline">
        {rawData.map((block, index) => (
          <div
            key={index}
            className="timeline-block"
            style={{
              backgroundColor: block.color,
              left: `${block.left}px`,
              width: `${block.width}px`,
              position: "absolute", // Absolute to align based on left
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
