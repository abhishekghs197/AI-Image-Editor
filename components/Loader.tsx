import React from 'react';

interface LoaderProps {
  prompt?: string;
}

const Loader: React.FC<LoaderProps> = ({ prompt }) => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center">
    <div className="w-16 h-16 border-4 border-slate-400 border-t-indigo-500 border-solid rounded-full animate-spin"></div>
    <p className="mt-4 text-slate-300 font-medium tracking-wide">Generating your image...</p>
    {prompt && (
      <p className="mt-2 text-sm text-slate-400 italic line-clamp-2">
        &ldquo;{prompt}&rdquo;
      </p>
    )}
  </div>
);

export default Loader;