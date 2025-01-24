"use client";
import React, { useState, useEffect, useRef } from "react";

const ImageRotation = () => {
  const totalImages = 300; // Assuming you have 5 images in the sequence
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  const handleWheel = (event: any) => {
    event.preventDefault();
    const newScale = event.deltaY > 0 ? -0.1 : 0.1; // Adjust the zoom scale based on deltaY
    setScale((prScale) => Math.max(0.1, Math.min(prScale + newScale, 10))); // Limit the zoom scale between 0.1x and 3x
  };

  useEffect(() => {
    const imgElement = imageRef.current;
    if(imgElement){
      imgElement.addEventListener("wheel", handleWheel, { passive: false });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (isDragging && isMove && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const index =
          Math.floor(mouseX / (containerRect.width / totalImages)) + 1;
        setCurrentImageIndex(Math.min(Math.max(index, 3), totalImages));
        return;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsMove(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="map"
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "auto", // Hide any content that exceeds the image element's dimensions
      }}
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={() => setIsMove(true)}
      onMouseUp={() => {
        setIsMove(false);
        setIsDragging(false);
      }}
    >
      <img
        src={`/map/12-Tribes-3D- (${currentImageIndex}).png`}
        width="70%"
        alt="Zoomable Image"
        ref={imageRef}
        style={{
          transform: `scale(${scale})`,
          margin: "auto",
          transition: "transform 0.1s ease-out",
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      />
    </div>
  );
};

export default ImageRotation;
