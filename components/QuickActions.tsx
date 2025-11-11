import React from 'react';
import MagicWandIcon from './icons/MagicWandIcon';
import TransparentIcon from './icons/TransparentIcon';
import UpscaleIcon from './icons/UpscaleIcon';
import BlurIcon from './icons/BlurIcon';

interface QuickActionsProps {
  onEnhance: () => void;
  onTransparent: () => void;
  onUpscale: () => void;
  onBlurBackground: () => void;
  disabled: boolean;
}

const actions = [
  { name: 'AI Enhance', handler: 'onEnhance', icon: <MagicWandIcon className="w-6 h-6" />, prompt: 'Enhance image quality' },
  { name: 'Remove BG', handler: 'onTransparent', icon: <TransparentIcon className="w-6 h-6" />, prompt: 'Make background transparent' },
  { name: '2x Upscale', handler: 'onUpscale', icon: <UpscaleIcon className="w-6 h-6" />, prompt: 'Upscale image resolution' },
  { name: 'Blur BG', handler: 'onBlurBackground', icon: <BlurIcon className="w-6 h-6" />, prompt: 'Apply a blur to the background' },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onEnhance, onTransparent, onUpscale, onBlurBackground, disabled }) => {
  const handlers: { [key: string]: () => void } = { onEnhance, onTransparent, onUpscale, onBlurBackground };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={handlers[action.handler]}
            disabled={disabled}
            title={action.prompt}
            className="flex flex-col items-center justify-center p-3 bg-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed aspect-square"
          >
            {action.icon}
            <span className="mt-1.5 text-center text-xs leading-tight">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
