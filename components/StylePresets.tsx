import React from 'react';
import CameraIcon from './icons/CameraIcon';
import CartoonIcon from './icons/CartoonIcon';
import PaintBrushIcon from './icons/PaintBrushIcon';
import PencilIcon from './icons/PencilIcon';

const presets = [
  { name: 'Photo', prompt: 'photorealistic, 4k, high detail', icon: <CameraIcon className="w-6 h-6" /> },
  { name: 'Cartoon', prompt: 'cartoon style, vibrant colors, clean lines', icon: <CartoonIcon className="w-6 h-6" /> },
  { name: 'Sketch', prompt: 'pencil sketch, black and white', icon: <PencilIcon className="w-6 h-6" /> },
  { name: 'Painting', prompt: 'oil painting, textured brush strokes', icon: <PaintBrushIcon className="w-6 h-6" /> },
];

interface StylePresetsProps {
  onPresetClick: (prompt: string) => void;
  disabled: boolean;
}

const StylePresets: React.FC<StylePresetsProps> = ({ onPresetClick, disabled }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">Apply a style</h3>
      <div className="grid grid-cols-4 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onPresetClick(preset.prompt)}
            disabled={disabled}
            title={`Apply "${preset.prompt}"`}
            className="flex flex-col items-center justify-center p-3 bg-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed aspect-square"
          >
            {preset.icon}
            <span className="mt-1.5">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;
