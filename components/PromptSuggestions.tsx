import React from 'react';

const suggestions = [
  'Make it black and white',
  'Add a vintage filter',
  'Remove the background',
  'Change background to a forest',
  'Make it look like a painting',
  'Add a cinematic look',
  'Apply a watercolor effect',
  'Create a surreal composite image',
  'Generate a futuristic cityscape',
  'Turn the image into a sketch',
];

interface PromptSuggestionsProps {
    onSuggestionClick: (suggestion: string) => void;
    disabled: boolean;
}

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSuggestionClick, disabled }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">Need inspiration?</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((text) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            disabled={disabled}
            className="px-3 py-1.5 bg-slate-700 text-slate-200 text-sm font-medium rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
