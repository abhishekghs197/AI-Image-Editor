export interface ImageFile {
  base64: string;
  mimeType: string;
  name: string;
}

export interface HistoryItem {
  prompt: string;
  editedImage: string;
  id: string;
}
