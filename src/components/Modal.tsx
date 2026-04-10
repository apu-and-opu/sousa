import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  title: string;
  width?: string;
  className?: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Modal({ title, width = 'w-[400px]', className, onClose, footer, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 ${className ?? ''}`} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className={`bg-[#1a1a2e] border border-gray-600 rounded-lg shadow-2xl ${width} max-h-[80vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        <div className="p-4 space-y-3">
          {children}
        </div>

        {footer && (
          <div className="flex gap-2 p-4 border-t border-gray-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
