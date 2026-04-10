import { useState, useCallback } from 'react';
import { isCommentData, type BoardNodeData } from '../types';
import { ROLES, EVIDENCE_TYPES } from '../constants';
import { useImageCompress } from '../hooks/useImageCompress';
import Modal from './Modal';
import { FormInput, FormSelect, FormTextarea, ImagePicker } from './FormField';
import ImageCropModal from './ImageCropModal';
import { useLanguage } from '../translations';

interface EditModalProps {
  data: BoardNodeData;
  onSave: (data: BoardNodeData) => void;
  onClose: () => void;
}

export default function EditModal({ data, onSave, onClose }: EditModalProps) {
  const [formData, setFormData] = useState<BoardNodeData>({ ...data });
  const { t } = useLanguage();

  const onCompressed = useCallback((compressed: string) => {
    setFormData((prev) => {
      if (isCommentData(prev)) return prev;
      return { ...prev, image: compressed };
    });
  }, []);

  const { imagePreview, fileInputRef, handleImageSelect, clearImage, rawImage, isProcessing, confirmCrop, cancelCrop } = useImageCompress(onCompressed);

  const handleClearImage = () => {
    clearImage();
    setFormData((prev) => {
      if (isCommentData(prev)) return prev;
      return { ...prev, image: undefined };
    });
  };

  const handleSave = () => {
    if (!formData.label.trim()) {
      alert(t('edit.alertName'));
      return;
    }
    if (formData.category === 'comment' && !formData.text.trim()) {
      alert(t('edit.alertComment'));
      return;
    }
    onSave(formData);
    onClose();
  };

  const title = data.category === 'person' ? t('edit.person') : data.category === 'evidence' ? t('edit.evidence') : t('edit.comment');

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded transition-colors text-sm"
          >
            {t('edit.save')}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition-colors text-sm"
          >
            {t('edit.cancel')}
          </button>
        </>
      }
    >
      <FormInput
        label={t('form.nameTitle')}
        type="text"
        value={formData.label}
        onChange={e => setFormData({ ...formData, label: e.target.value })}
      />

      {formData.category === 'person' && (
        <FormSelect
          label={t('form.role')}
          value={formData.role || ''}
          onChange={e => setFormData({ ...formData, role: e.target.value })}
        >
          {ROLES.map(r => <option key={r} value={r}>{t(`role.${r}`)}</option>)}
        </FormSelect>
      )}

      {formData.category === 'evidence' && (
        <FormSelect
          label={t('form.evidenceType')}
          value={formData.evidenceType || ''}
          onChange={e => setFormData({ ...formData, evidenceType: e.target.value })}
        >
          {EVIDENCE_TYPES.map(et => <option key={et} value={et}>{t(`evidence.${et}`)}</option>)}
        </FormSelect>
      )}

      {formData.category === 'comment' ? (
        <FormTextarea
          label={t('form.comment')}
          value={formData.text}
          onChange={e => setFormData({ ...formData, text: e.target.value })}
          rows={4}
        />
      ) : (
        <>
          <ImagePicker
            preview={imagePreview || formData.image}
            fileInputRef={fileInputRef}
            onSelect={handleImageSelect}
            onClear={handleClearImage}
            thumbnailClass="w-24 h-[72px]"
          />

          <FormTextarea
            label={t('form.description')}
            value={formData.description || ''}
            onChange={e => setFormData((prev) => {
              if (isCommentData(prev)) return prev;
              return { ...prev, description: e.target.value };
            })}
            rows={2}
          />
        </>
      )}
      {rawImage && (
        <ImageCropModal
          imageDataUrl={rawImage}
          isProcessing={isProcessing}
          onConfirm={confirmCrop}
          onCancel={cancelCrop}
        />
      )}
    </Modal>
  );
}
