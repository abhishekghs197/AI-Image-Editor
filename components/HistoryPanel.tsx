import React from 'react';
import { HistoryItem } from '../types';
import HistoryIcon from './icons/HistoryIcon';

interface HistoryPanelProps {
  history: HistoryItem[];
  onHistoryClick: (item: HistoryItem) => void;
  disabled: boolean;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onHistoryClick, disabled }) => {
  if (history.length === 0) {
    return null; // Don't render if there's no history
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
        <HistoryIcon className="w-6 h-6" />
        History
      </h3>
      <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onHistoryClick(item)}
            disabled={disabled}
            className="w-full text-left p-2 flex items-center gap-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src={`data:image/png;base64,${item.editedImage}`}
              alt={item.prompt}
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
            <p className="text-sm text-slate-300 truncate">{item.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
