import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      
      // Animate in (cover screen)
      gsap.to('.transition-panel', {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.5,
        ease: 'power4.inOut',
        stagger: 0.05,
        onComplete: () => {
          // Change content ONLY when screen is fully covered
          setDisplayLocation(location);
          setDisplayChildren(children);
          window.scrollTo(0, 0);
          
          // Animate out (uncover screen)
          gsap.to('.transition-panel', {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 0.5,
            ease: 'power4.inOut',
            stagger: 0.05,
            onComplete: () => {
              setIsTransitioning(false);
            }
          });
        }
      });
    }
  }, [location.pathname]); // Only depend on path change

  return (
    <>
      {/* 5-column transition panels for a cinematic sweep effect */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="transition-panel flex-1 h-full bg-[#1A1A1A] scale-y-0"
          />
        ))}
      </div>
      
      {/* The actual page content */}
      <div className={isTransitioning ? 'pointer-events-none' : ''}>
        {displayChildren}
      </div>
    </>
  );
}
