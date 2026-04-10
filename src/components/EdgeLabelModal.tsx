import { useState, useRef, useEffect, useCallback } from 'react';
import { RELATIONSHIP_PRESETS } from '../constants';
import Modal from './Modal';
import { FormInput } from './FormField';
import { useLanguage, translateEdgeLabel, displayToPresetKey } from '../translations';
import type { ArrowDirection } from '../types';

interface EdgeLabelModalProps {
  currentLabel: string;
  currentDirection: ArrowDirection;
  onSave: (label: string) => void;
  onDirectionChange: (direction: ArrowDirection) => void;
  onDelete: () => void;
  onClose: () => void;
}

const DIRECTIONS: ArrowDirection[] = ['forward', 'reverse', 'both', 'none'];

export default function EdgeLabelModal({ currentLabel, currentDirection, onSave, onDirectionChange, onDelete, onClose }: EdgeLabelModalProps) {
  const { t } = useLanguage();
  // Input always shows the human-readable display text
  const [displayLabel, setDisplayLabel] = useState(() => translateEdgeLabel(currentLabel, t));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Convert display text back to stable key if it matches a preset
      onSave(displayToPresetKey(displayLabel, t));
      onClose();
    }
  }, [displayLabel, t, onSave, onClose]);

  const handleSave = useCallback(() => {
    onSave(displayToPresetKey(displayLabel, t));
    onClose();
  }, [displayLabel, t, onSave, onClose]);

  const handleDelete = useCallback(() => {
    onDelete();
    onClose();
  }, [onDelete, onClose]);

  return (
    <Modal
      title={t('edge.editTitle')}
      width="w-[350px]"
      onClose={onClose}
      footer={
        <>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded transition-colors text-sm"
          >
            {t('edge.save')}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            {t('edge.delete')}
          </button>
        </>
      }
    >
      <FormInput
        ref={inputRef}
        label={t('edge.label')}
        type="text"
        value={displayLabel}
        onChange={e => setDisplayLabel(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('edge.placeholder')}
        className="placeholder-gray-500"
      />

      <div>
        <label className="block text-xs text-gray-400 mb-2">{t('edge.direction')}</label>
        <div className="flex gap-1.5">
          {DIRECTIONS.map(dir => (
            <button
              key={dir}
              onClick={() => onDirectionChange(dir)}
              className={`flex-1 px-2 py-1.5 rounded text-sm transition-colors
                ${currentDirection === dir
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {t(`edge.${dir}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-2">{t('edge.presets')}</label>
        <div className="flex flex-wrap gap-1.5">
          {RELATIONSHIP_PRESETS.map(preset => {
            const displayName = t(`rel.${preset}`);
            return (
              <button
                key={preset}
                onClick={() => setDisplayLabel(displayName)}
                className={`px-2 py-1 rounded text-xs transition-colors
                  ${displayLabel === displayName
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
