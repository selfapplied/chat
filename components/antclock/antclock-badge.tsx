'use client';

import { useEffect, useState } from 'react';

interface AntClockStatus {
  active: boolean;
  framework: string;
  coherenceScore?: number;
}

export function AntClockBadge() {
  const [status, setStatus] = useState<AntClockStatus>({
    active: false,
    framework: 'AntClock CE1→CE2→CE3',
  });

  useEffect(() => {
    // Check AntClock service status
    const checkStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/health');
        if (response.ok) {
          const data = await response.json();
          setStatus({
            active: true,
            framework: data.framework || 'AntClock CE1→CE2→CE3',
          });
        }
      } catch (error) {
        console.log('AntClock service not available:', error);
      }
    };

    checkStatus();
    // Check periodically
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!status.active) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg backdrop-blur-sm">
        <div className="relative">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold">AntClock Intelligence Boost</span>
          <span className="text-[10px] opacity-90">{status.framework}</span>
        </div>
      </div>
    </div>
  );
}
