import { useState, useRef, useCallback } from 'react';
import { compressImage } from '../utils/compressImage';
import { useLanguage } from '../translations';

interface UseImageCompressReturn {
  imagePreview: string | undefined;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  rawImage: string | undefined;
  isProcessing: boolean;
  confirmCrop: (croppedDataUrl: string) => void;
  cancelCrop: () => void;
}

export function useImageCompress(
  onCompressed?: (dataUrl: string) => void,
): UseImageCompressReturn {
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [rawImage, setRawImage] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);
  const { t } = useLanguage();

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      ++requestId.current;
      setIsProcessing(false);
      const reader = new FileReader();
      reader.onerror = () => {
        alert(t('image.loadError'));
      };
      reader.onload = () => {
        setRawImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [t],
  );

  const confirmCrop = useCallback(
    async (croppedDataUrl: string) => {
      const currentId = ++requestId.current;
      setIsProcessing(true);
      try {
        const compressed = await compressImage(croppedDataUrl);
        if (currentId !== requestId.current) return;
        setImagePreview(compressed);
        onCompressed?.(compressed);
        setRawImage(undefined);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch {
        if (currentId !== requestId.current) return;
        alert(t('image.compressError'));
      } finally {
        if (currentId === requestId.current) {
          setIsProcessing(false);
        }
      }
    },
    [onCompressed, t],
  );

  const cancelCrop = useCallback(() => {
    requestId.current++;
    setIsProcessing(false);
    setRawImage(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const clearImage = useCallback(() => {
    requestId.current++;
    setIsProcessing(false);
    setImagePreview(undefined);
    setRawImage(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return { imagePreview, fileInputRef, handleImageSelect, clearImage, rawImage, isProcessing, confirmCrop, cancelCrop };
}
