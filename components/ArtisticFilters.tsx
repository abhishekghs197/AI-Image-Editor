import React from 'react';
import CartoonIcon from './icons/CartoonIcon';
import PaintBrushIcon from './icons/PaintBrushIcon';
import PencilIcon from './icons/PencilIcon';
import WatercolorIcon from './icons/WatercolorIcon';
import PixelArtIcon from './icons/PixelArtIcon';
import Anaglyph3DIcon from './icons/Anaglyph3DIcon';
import VectorArtIcon from './icons/VectorArtIcon';


const filters = [
  { name: 'Pencil Sketch', prompt: 'Transform the image into a detailed black and white pencil sketch, capturing the main subjects and textures.', icon: <PencilIcon className="w-6 h-6" /> },
  { name: 'Oil Painting', prompt: 'Convert the image into an oil painting, with visible, textured brush strokes and rich colors.', icon: <PaintBrushIcon className="w-6 h-6" /> },
  { name: 'Watercolor', prompt: 'Apply a watercolor painting effect to the image, with soft, blended colors and a paper texture.', icon: <WatercolorIcon className="w-6 h-6" /> },
  { name: 'Pixel Art', prompt: 'Change the image into a pixel art style, with a limited color palette and blocky, 8-bit aesthetic.', icon: <PixelArtIcon className="w-6 h-6" /> },
  { name: 'Anaglyph 3D', prompt: 'Create a stereoscopic anaglyph 3D effect on the image, with red and cyan color channels offset.', icon: <Anaglyph3DIcon className="w-6 h-6" /> },
  { name: 'Cartoon', prompt: 'Redraw the image in a vibrant cartoon style with bold outlines and simplified shading.', icon: <CartoonIcon className="w-6 h-6" /> },
  { name: 'Vector Art', prompt: 'Convert the image into a clean, scalable vector art style with flat colours and sharp lines.', icon: <VectorArtIcon className="w-6 h-6" /> },
];

interface ArtisticFiltersProps {
  onFilterClick: (prompt: string) => void;
  disabled: boolean;
}

const ArtisticFilters: React.FC<ArtisticFiltersProps> = ({ onFilterClick, disabled }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">Artistic Filters</h3>
      <div className="grid grid-cols-3 gap-2">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => onFilterClick(filter.prompt)}
            disabled={disabled}
            title={filter.prompt}
            className="flex flex-col items-center justify-center p-3 bg-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed aspect-square"
          >
            {filter.icon}
            <span className="mt-1.5 text-center text-xs leading-tight">{filter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArtisticFilters;
