import React from 'react';
import OrnateFrameIcon from './icons/OrnateFrameIcon';
import MinimalistFrameIcon from './icons/MinimalistFrameIcon';
import VintageFrameIcon from './icons/VintageFrameIcon';
import OrnateSilverFrameIcon from './icons/OrnateSilverFrameIcon';
import RusticWoodFrameIcon from './icons/RusticWoodFrameIcon';
import ModernGeometricFrameIcon from './icons/ModernGeometricFrameIcon';


const presets = [
  { name: 'Ornate Gold', prompt: 'Add a highly detailed, ornate gold frame around the entire image.', icon: <OrnateFrameIcon className="w-6 h-6" /> },
  { name: 'Ornate Silver', prompt: 'Add a highly detailed, ornate silver frame around the entire image.', icon: <OrnateSilverFrameIcon className="w-6 h-6" /> },
  { name: 'Minimalist', prompt: 'Add a thin, minimalist black border frame around the entire image.', icon: <MinimalistFrameIcon className="w-6 h-6" /> },
  { name: 'Vintage Wood', prompt: 'Add a vintage dark wood frame around the entire image.', icon: <VintageFrameIcon className="w-6 h-6" /> },
  { name: 'Rustic Wood', prompt: 'Add a rustic, weathered wood frame around the entire image.', icon: <RusticWoodFrameIcon className="w-6 h-6" /> },
  { name: 'Geometric', prompt: 'Add a modern, geometric pattern frame with clean lines around the entire image.', icon: <ModernGeometricFrameIcon className="w-6 h-6" /> },
];

interface FramePresetsProps {
  onFrameClick: (prompt: string) => void;
  disabled: boolean;
}

const FramePresets: React.FC<FramePresetsProps> = ({ onFrameClick, disabled }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">Add a Frame</h3>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onFrameClick(preset.prompt)}
            disabled={disabled}
            title={preset.prompt}
            className="flex flex-col items-center justify-center p-3 bg-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed aspect-square"
          >
            {preset.icon}
            <span className="mt-1.5 text-center text-xs leading-tight">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FramePresets;