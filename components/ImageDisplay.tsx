import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { ImageFile } from '../types';
import { ViewMode } from '../App';
import Loader from './Loader';
import DownloadIcon from './icons/DownloadIcon';
import ErrorIcon from './icons/ErrorIcon';
import ZoomableImage from './ZoomableImage';
import CompareIcon from './icons/CompareIcon';
import SideBySideIcon from './icons/SideBySideIcon';


interface ImageDisplayProps {
  originalImage: ImageFile | null;
  editedImage: string | null;
  isLoading: boolean;
  error: string | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  prompt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, isLoading, error, viewMode, setViewMode, prompt }) => {
  const handleDownload = () => {
    if (!editedImage || !originalImage) return;

    const link = document.createElement('a');
    link.href = `data:image/png;base64,${editedImage}`;
    
    const originalNameWithoutExt = originalImage.name.substring(0, originalImage.name.lastIndexOf('.')) || 'image';
    link.download = `${originalNameWithoutExt}-edited.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const originalImageUrl = originalImage ? `data:${originalImage.mimeType};base64,${originalImage.base64}` : '';
  const editedImageUrl = editedImage ? `data:image/png;base64,${editedImage}` : '';
  
  const commonButtonClass = "p-2 bg-slate-900/50 rounded-full text-white hover:bg-indigo-600/80 backdrop-blur-sm transition-colors duration-200";

  const ErrorState = () => (
    <div className="text-center text-red-400 flex flex-col items-center justify-center p-4 h-full">
        <ErrorIcon className="w-12 h-12 mb-2" />
        <p className="text-lg font-semibold">Generation Failed</p>
        <p className="text-sm text-slate-400 mt-1">{error}</p>
    </div>
  );

  return (
    <div className="w-full relative">
        {/* View Mode Toggle */}
        <div className="absolute top-2 left-2 z-20 flex space-x-2">
            <button 
                onClick={() => setViewMode('side-by-side')}
                className={`${commonButtonClass} ${viewMode === 'side-by-side' ? 'bg-indigo-600' : ''}`}
                aria-label="Side-by-side view"
                title="Side-by-side view"
            >
                <SideBySideIcon className="w-6 h-6" />
            </button>
            <button 
                onClick={() => setViewMode('slider')}
                className={`${commonButtonClass} ${viewMode === 'slider' ? 'bg-indigo-600' : ''}`}
                aria-label="Comparison slider view"
                title="Comparison slider view"
            >
                <CompareIcon className="w-6 h-6" />
            </button>
        </div>

      {viewMode === 'side-by-side' ? (
        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-1/2 p-2">
              <div className="relative aspect-square bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg">
                  {originalImage && (
                    <ZoomableImage src={originalImageUrl} alt="Original" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-1 font-semibold text-sm pointer-events-none">Original</div>
              </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <div className="relative aspect-square bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg flex items-center justify-center">
              {isLoading ? (
                <Loader prompt={prompt} />
              ) : error ? (
                <ErrorState />
              ) : editedImage ? (
                <ZoomableImage src={editedImageUrl} alt="Edited">
                  <div className="absolute top-2 right-2 z-10">
                    <button onClick={handleDownload} className={commonButtonClass} aria-label="Download edited image" title="Download edited image">
                      <DownloadIcon className="w-6 h-6" />
                    </button>
                  </div>
                </ZoomableImage>
              ) : (
                 <div className="text-center text-slate-400 p-4">
                    <p className="text-lg font-semibold">Your edited image will appear here.</p>
                </div>
              )}
               <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-1 font-semibold text-sm pointer-events-none">Edited</div>
            </div>
          </div>
        </div>
      ) : (
        // Slider View
        <div className="w-full p-2">
          <div className="relative aspect-square bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg flex items-center justify-center">
            {isLoading ? (
                <Loader prompt={prompt} />
            ) : error ? (
                <ErrorState />
            ) : (
              <>
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={originalImageUrl} alt="Original" />}
                  itemTwo={<ReactCompareSliderImage src={editedImageUrl || originalImageUrl} alt="Edited" style={{ filter: editedImage ? 'none' : 'blur(8px) grayscale(50%)' }} />}
                  className="w-full h-full"
                />
                 {editedImage && (
                    <div className="absolute top-2 right-2 z-10">
                        <button onClick={handleDownload} className={commonButtonClass} aria-label="Download edited image" title="Download edited image">
                            <DownloadIcon className="w-6 h-6" />
                        </button>
                    </div>
                 )}
                 {!editedImage && (
                   <div className="absolute inset-0 flex items-center justify-center text-center text-slate-400 p-4 pointer-events-none">
                      <p className="text-lg font-semibold bg-slate-900/50 p-2 rounded-lg">Your edited image will appear here.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;