import React, { useState } from 'react';
import Controls from './components/Controls';
import ImageDisplay from './components/ImageDisplay';
import ImageUploader from './components/ImageUploader';
import { editImageWithGemini } from './services/geminiService';
import { ImageFile } from './types';
import { fileToBase64 } from './utils/fileUtils';

export type ViewMode = 'side-by-side' | 'slider';

function App() {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');

  const handleImageUpload = async (file: File) => {
    try {
      const imageFile = await fileToBase64(file);
      setOriginalImage(imageFile);
      setEditedImage(null);
      setError(null);
      setPrompt('');
    } catch (err) {
      setError('Failed to process image. Please try another file.');
      console.error(err);
    }
  };
  
  const handleGenerateImage = async (currentPrompt: string) => {
    if (!originalImage || !currentPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithGemini(
        originalImage.base64,
        originalImage.mimeType,
        currentPrompt
      );
      setEditedImage(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4">
      <header className="w-full max-w-5xl text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          AI Image Editor
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Upload an image and use the power of Gemini to edit it with a simple text prompt.
        </p>
      </header>

      <main className="w-full max-w-5xl flex-grow flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full flex flex-col items-center">
            <ImageDisplay
              originalImage={originalImage}
              editedImage={editedImage}
              isLoading={isLoading}
              error={error}
              viewMode={viewMode}
              setViewMode={setViewMode}
              prompt={prompt}
            />
            <Controls
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerateImage}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      <footer className="w-full max-w-5xl text-center py-4 text-slate-500 text-sm">
        Powered by Google Gemini
      </footer>
    </div>
  );
}

export default App;
