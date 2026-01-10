'use client';

import React, { useEffect } from 'react';

interface StructuredDataProps {
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  useEffect(() => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);

    // Add to head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [data]);

  return null; // This component doesn't render anything
};