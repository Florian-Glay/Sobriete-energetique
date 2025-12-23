import React, { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  bottomNav?: ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, bottomNav }) => {
  return (
    <div className="w-full h-[100dvh] bg-white md:min-h-screen md:h-auto md:bg-gray-100 md:p-4 md:flex md:items-center md:justify-center">
      <div className="relative w-full h-full bg-white flex flex-col md:w-[41vh] md:h-[85vh] md:max-h-[850px] md:min-h-[600px] md:shadow-2xl md:rounded-[40px] md:overflow-hidden md:border-8 md:border-gray-900 md:ring-1 md:ring-gray-900/50">
        {/* Dynamic Island / Notch - Desktop Only */}
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>
        
        {/* Status Bar Mockup - Desktop Only */}
        <div className="hidden md:flex w-full h-12 bg-white items-center justify-between px-6 pt-2 select-none z-40">
          <span className="text-xs font-semibold text-gray-900">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="h-3 w-3 bg-gray-900 rounded-full opacity-20"></div>
            <div className="h-3 w-3 bg-gray-900 rounded-full opacity-20"></div>
            <div className="h-2.5 w-5 border border-gray-300 rounded-sm relative">
              <div className="absolute inset-0.5 bg-gray-900 rounded-sm w-[70%]"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white scroll-smooth pb-32 no-scrollbar">
          {children}
        </div>

        {/* Bottom Nav Area */}
        {bottomNav && (
            <div className="absolute bottom-0 left-0 w-full z-40">
                {bottomNav}
            </div>
        )}

        {/* Home Indicator - Desktop Only */}
        <div className="hidden md:block absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full opacity-20 z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
