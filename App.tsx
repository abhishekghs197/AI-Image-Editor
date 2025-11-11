import React, { useState } from 'react';
import Controls from './components/Controls';
import ImageDisplay from './components/ImageDisplay';
import ImageUploader from './components/ImageUploader';
import { editImageWithGemini } from './services/geminiService';
import { ImageFile, HistoryItem } from './types';
import { fileToBase64 } from './utils/fileUtils';

export type ViewMode = 'side-by-side' | 'slider';

function App() {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleImageUpload = async (file: File) => {
    try {
      const imageFile = await fileToBase64(file);
      setOriginalImage(imageFile);
      setEditedImage(null);
      setError(null);
      setPrompt('');
      setHistory([]);
    } catch (err) {
      setError('Failed to process image. Please try another file.');
      console.error(err);
    }
  };
  
  const handleGenerateImage = async (currentPrompt: string) => {
    if (!originalImage || !currentPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    // Keep the previous image visible during loading for better UX
    // setEditedImage(null);

    try {
      const result = await editImageWithGemini(
        originalImage.base64,
        originalImage.mimeType,
        currentPrompt
      );
      setEditedImage(result);
      const newHistoryItem: HistoryItem = {
        prompt: currentPrompt,
        editedImage: result,
        id: `history-${Date.now()}`,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (item: HistoryItem) => {
    if (isLoading) return;
    setPrompt(item.prompt);
    setEditedImage(item.editedImage);
    setError(null);
  };

  const handleClear = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setHistory([]);
  };

  const runQuickAction = (actionPrompt: string) => {
    setPrompt(actionPrompt);
    handleGenerateImage(actionPrompt);
  };

  const handleEnhance = () => runQuickAction('Professionally enhance the image, improving lighting, color balance, sharpness, and overall quality. Make it look like it was taken by a professional photographer.');
  const handleTransparent = () => runQuickAction('Make the background of the image transparent. Output as a PNG.');
  const handleUpscale = () => runQuickAction('Upscale the image to 2x its original resolution, significantly enhancing details, sharpness, and overall quality for a professional, high-definition result.');
  const handleBlurBackground = () => runQuickAction('Apply a subtle, photorealistic blur to the background, keeping the main subject in sharp focus (bokeh effect).');
  const handleApplyFrame = (framePrompt: string) => runQuickAction(framePrompt);
  const handleApplyFilter = (filterPrompt: string) => runQuickAction(filterPrompt);


  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4">
      <header className="w-full max-w-7xl text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          AI Image Editor
        </h1>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
          Upload an image, then use text, quick actions, or style presets to transform your photo with Gemini.
        </p>
      </header>

      <main className="w-full max-w-7xl flex-grow flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full flex flex-col items-center md:gap-8">
            <div className="w-full">
              <ImageDisplay
                originalImage={originalImage}
                editedImage={editedImage}
                isLoading={isLoading}
                error={error}
                viewMode={viewMode}
                setViewMode={setViewMode}
                prompt={prompt}
              />
            </div>
            <div className="w-full max-w-3xl mt-6 md:mt-0">
              <Controls
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleGenerateImage}
                onClear={handleClear}
                onEnhance={handleEnhance}
                onTransparent={handleTransparent}
                onUpscale={handleUpscale}
                onBlurBackground={handleBlurBackground}
                onApplyFrame={handleApplyFrame}
                onApplyFilter={handleApplyFilter}
                isLoading={isLoading}
                history={history}
                onHistoryClick={handleHistoryClick}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-7xl text-center py-4 text-slate-500 text-sm">
        Powered by Google Gemini
      </footer>
    </div>
  );
}

export default App;