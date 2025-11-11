import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import PromptSuggestions from './PromptSuggestions';
import StylePresets from './StylePresets';

interface ControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };
  
  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(prev => prev ? `${prev}, ${presetPrompt}` : presetPrompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="flex items-start gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the changes you want to make..."
          className="w-full p-3 bg-slate-800 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center h-[88px]" // Match textarea height
        >
          <SparklesIcon className="w-6 h-6" />
          <span className="sr-only">Generate</span>
        </button>
      </form>

      <div className="space-y-6">
        <StylePresets onPresetClick={handlePresetClick} disabled={isLoading} />
        <PromptSuggestions onSuggestionClick={handleSuggestionClick} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Controls;
