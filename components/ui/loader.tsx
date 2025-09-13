import React from 'react';

const Loader = ({ text = "Loading GRAD KONNECT..." }: { text?: string }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="p-4 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 relative">
          <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
          <div className="w-24 h-24 border-4 border-solid rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-10 border-purple-400"></div>
      </div>
      <p className="mt-8 text-lg font-semibold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {text}
      </p>
    </div>
  );
};

export default Loader;