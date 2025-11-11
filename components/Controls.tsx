import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import ResetIcon from './icons/ResetIcon';
import PromptSuggestions from './PromptSuggestions';
import StylePresets from './StylePresets';
import QuickActions from './QuickActions';
import HistoryPanel from './HistoryPanel';
import { HistoryItem } from '../types';

interface ControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (prompt: string) => void;
  onClear: () => void;
  onEnhance: () => void;
  onTransparent: () => void;
  onUpscale: () => void;
  onBlurBackground: () => void;
  isLoading: boolean;
  history: HistoryItem[];
  onHistoryClick: (item: HistoryItem) => void;
}

const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  onClear,
  onEnhance,
  onTransparent,
  onUpscale,
  onBlurBackground,
  isLoading,
  history,
  onHistoryClick,
}) => {
  
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };
  
  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(prev => prev ? `${prev}, ${presetPrompt}` : presetPrompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isLoading) {
        onSubmit(prompt);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full bg-slate-800/50 md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-200">Controls</h2>
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700 hover:bg-red-500/80 hover:text-white rounded-lg transition-colors"
          title="Start over with a new image"
        >
          <ResetIcon className="w-4 h-4" />
          Start Over
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-start gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your edits... (Ctrl+Enter to submit)"
          className="w-full p-3 bg-slate-800 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center h-[88px]"
          title="Generate Image (Ctrl+Enter)"
        >
          <SparklesIcon className="w-6 h-6" />
          <span className="sr-only">Generate</span>
        </button>
      </form>

      <div className="space-y-6">
        <QuickActions
          onEnhance={onEnhance}
          onTransparent={onTransparent}
          onUpscale={onUpscale}
          onBlurBackground={onBlurBackground}
          disabled={isLoading}
        />
        <StylePresets onPresetClick={handlePresetClick} disabled={isLoading} />
        <PromptSuggestions onSuggestionClick={handleSuggestionClick} disabled={isLoading} />
        <HistoryPanel history={history} onHistoryClick={onHistoryClick} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Controls;