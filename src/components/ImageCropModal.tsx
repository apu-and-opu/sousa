import { useState, useRef, useCallback, useEffect } from 'react';
import Modal from './Modal';
import { useLanguage } from '../translations';

interface ImageCropModalProps {
  imageDataUrl: string;
  aspectRatio?: number;
  onConfirm: (croppedDataUrl: string) => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

const CONTAINER_W = 432;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.01;

function isPng(dataUrl: string): boolean {
  return dataUrl.startsWith('data:image/png');
}

interface View { zoom: number; x: number; y: number }

export default function ImageCropModal({ imageDataUrl, aspectRatio = 4 / 3, onConfirm, onCancel, isProcessing = false }: ImageCropModalProps) {
  const { t } = useLanguage();
  const containerH = Math.round(CONTAINER_W / aspectRatio);

  const [view, setView] = useState<View>({ zoom: MIN_ZOOM, x: 0, y: 0 });
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; startView: View } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      imgRef.current = img;
    };
    img.src = imageDataUrl;
  }, [imageDataUrl]);

  useEffect(() => {
    dragRef.current = null;
    setView({ zoom: MIN_ZOOM, x: 0, y: 0 });
  }, [imageDataUrl]);

  const baseScale = imgSize
    ? Math.max(CONTAINER_W / imgSize.w, containerH / imgSize.h)
    : 1;

  const clampPan = useCallback(
    (px: number, py: number, z: number) => {
      if (!imgSize) return { x: 0, y: 0 };
      const maxX = Math.max(0, (imgSize.w * baseScale * z - CONTAINER_W) / 2);
      const maxY = Math.max(0, (imgSize.h * baseScale * z - containerH) / 2);
      return {
        x: Math.max(-maxX, Math.min(maxX, px)),
        y: Math.max(-maxY, Math.min(maxY, py)),
      };
    },
    [imgSize, baseScale, containerH],
  );

  const applyZoom = useCallback(
    (newZoom: number) => {
      setView((prev) => {
        const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
        const ratio = z / prev.zoom;
        const clamped = clampPan(prev.x * ratio, prev.y * ratio, z);
        return { zoom: z, ...clamped };
      });
    },
    [clampPan],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isProcessing) return;
      e.preventDefault();
      setView((prev) => {
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + delta));
        const ratio = z / prev.zoom;
        const clamped = clampPan(prev.x * ratio, prev.y * ratio, z);
        return { zoom: z, ...clamped };
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [clampPan, isProcessing]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isProcessing) return;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setView((cur) => {
        dragRef.current = { startX: e.clientX, startY: e.clientY, startView: cur };
        return cur;
      });
    },
    [isProcessing],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isProcessing || !dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const sv = dragRef.current.startView;
      const clamped = clampPan(sv.x + dx, sv.y + dy, sv.zoom);
      setView({ zoom: sv.zoom, ...clamped });
    },
    [clampPan, isProcessing],
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const handleReset = useCallback(() => {
    if (isProcessing) return;
    setView({ zoom: MIN_ZOOM, x: 0, y: 0 });
  }, [isProcessing]);

  const handleConfirm = useCallback(() => {
    if (isProcessing || !imgSize || !imgRef.current) return;

    const eff = baseScale * view.zoom;
    const visibleW = CONTAINER_W / eff;
    const visibleH = containerH / eff;
    const sx = imgSize.w / 2 - view.x / eff - visibleW / 2;
    const sy = imgSize.h / 2 - view.y / eff - visibleH / 2;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(visibleW);
    canvas.height = Math.round(visibleH);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(imgRef.current, sx, sy, visibleW, visibleH, 0, 0, canvas.width, canvas.height);

    const format = isPng(imageDataUrl) ? 'image/png' : 'image/jpeg';
    const quality = format === 'image/jpeg' ? 0.92 : undefined;
    onConfirm(canvas.toDataURL(format, quality));
  }, [imgSize, baseScale, view, containerH, imageDataUrl, onConfirm, isProcessing]);

  if (!imgSize) return null;

  const displayW = imgSize.w * baseScale * view.zoom;
  const displayH = imgSize.h * baseScale * view.zoom;

  return (
    <Modal
      title={t('crop.title')}
      width="w-auto"
      className="!z-[60]"
      onClose={isProcessing ? () => {} : onCancel}
      footer={
        <>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-700/70 disabled:text-blue-100/70 disabled:cursor-wait text-white font-medium py-2 rounded transition-colors text-sm"
          >
            {isProcessing ? t('crop.processing') : t('crop.confirm')}
          </button>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/70 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-300 px-4 py-2 rounded transition-colors text-sm"
          >
            {t('crop.cancel')}
          </button>
        </>
      }
    >
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded border border-gray-600 bg-black/30 select-none touch-none ${isProcessing ? 'cursor-wait opacity-80' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ width: CONTAINER_W, height: containerH }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src={imageDataUrl}
          alt=""
          draggable={false}
          className="pointer-events-none absolute"
          style={{
            width: displayW,
            height: displayH,
            maxWidth: 'none',
            maxHeight: 'none',
            left: (CONTAINER_W - displayW) / 2 + view.x,
            top: (containerH - displayH) / 2 + view.y,
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs text-gray-400 shrink-0">{t('crop.zoom')}</label>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={ZOOM_STEP}
          value={view.zoom}
          disabled={isProcessing}
          onChange={(e) => applyZoom(Number(e.target.value))}
          className="flex-1 accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleReset}
          disabled={isProcessing}
          className="text-xs text-gray-400 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          {t('crop.reset')}
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        {isProcessing ? t('crop.processing') : t('crop.dragHint')}
      </p>
    </Modal>
  );
}
