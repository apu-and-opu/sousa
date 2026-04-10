import { useState } from 'react';
import type { NodeCategory } from '../types';
import { ROLES, EVIDENCE_TYPES } from '../constants';
import { useImageCompress } from '../hooks/useImageCompress';
import { FormInput, FormSelect, FormTextarea, ImagePicker } from './FormField';
import ImageCropModal from './ImageCropModal';
import { useLanguage } from '../translations';

interface SidebarProps {
  onAddPerson: (label: string, role: string, image?: string, description?: string) => void;
  onAddEvidence: (label: string, evidenceType: string, image?: string, description?: string) => void;
  onAddComment: (label: string, text: string) => void;
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
  onHelp: () => void;
}

export default function Sidebar({ onAddPerson, onAddEvidence, onAddComment, onSave, onLoad, onClear, onHelp }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<NodeCategory>('person');
  const [label, setLabel] = useState('');
  const [role, setRole] = useState<string>(ROLES[0]);
  const [evidenceType, setEvidenceType] = useState<string>(EVIDENCE_TYPES[0]);
  const [description, setDescription] = useState('');
  const [commentText, setCommentText] = useState('');
  const { imagePreview, fileInputRef, handleImageSelect, clearImage, rawImage, isProcessing, confirmCrop, cancelCrop } = useImageCompress();
  const { language, setLanguage, t } = useLanguage();

  const resetForm = () => {
    setLabel('');
    setDescription('');
    setCommentText('');
    clearImage();
  };

  const handleAdd = () => {
    if (!label.trim()) return;
    if (activeTab === 'person') {
      onAddPerson(label, role, imagePreview, description || undefined);
    } else if (activeTab === 'evidence') {
      onAddEvidence(label, evidenceType, imagePreview, description || undefined);
    } else {
      if (!commentText.trim()) return;
      onAddComment(label, commentText);
    }
    resetForm();
  };

  const tabs: { key: NodeCategory; label: string; icon: string }[] = [
    { key: 'person', label: t('tab.person'), icon: '👤' },
    { key: 'evidence', label: t('tab.evidence'), icon: '🔍' },
    { key: 'comment', label: t('tab.comment'), icon: '📝' },
  ];

  return (
    <div className="w-[280px] bg-[#0f0f23] border-r border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🔎</span>
            {t('app.title')}
          </h1>
          <div className="flex rounded overflow-hidden border border-gray-600 text-xs">
            <button
              onClick={() => setLanguage('ja')}
              className={`w-8 py-1 text-center transition-colors ${language === 'ja' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              JA
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`w-8 py-1 text-center transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              EN
            </button>
          </div>
        </div>
        <button
          onClick={onHelp}
          className="mt-2 w-full bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-1.5 rounded transition-colors flex items-center justify-center gap-1"
        >
          {t('sidebar.helpGuide')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); resetForm(); }}
            className={`flex-1 py-2 text-sm font-medium transition-colors
              ${activeTab === tab.key
                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/10'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <FormInput
          label={t('form.nameTitle')}
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder={activeTab === 'person' ? t('form.placeholder.person') : activeTab === 'evidence' ? t('form.placeholder.evidence') : t('form.placeholder.comment')}
          className="placeholder-gray-500"
        />

        {activeTab === 'person' && (
          <FormSelect
            label={t('form.role')}
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            {ROLES.map(r => <option key={r} value={r}>{t(`role.${r}`)}</option>)}
          </FormSelect>
        )}

        {activeTab === 'evidence' && (
          <FormSelect
            label={t('form.evidenceType')}
            value={evidenceType}
            onChange={e => setEvidenceType(e.target.value)}
          >
            {EVIDENCE_TYPES.map(et => <option key={et} value={et}>{t(`evidence.${et}`)}</option>)}
          </FormSelect>
        )}

        {activeTab === 'comment' ? (
          <FormTextarea
            label={t('form.comment')}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder={t('form.commentPlaceholder')}
            rows={4}
            className="placeholder-gray-500"
          />
        ) : (
          <>
            <ImagePicker
              preview={imagePreview}
              fileInputRef={fileInputRef}
              onSelect={handleImageSelect}
              onClear={clearImage}
            />

            <FormTextarea
              label={t('form.description')}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t('form.descriptionPlaceholder')}
              rows={2}
              className="placeholder-gray-500"
            />
          </>
        )}

        <button
          onClick={handleAdd}
          disabled={!label.trim() || (activeTab === 'comment' && !commentText.trim())}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          {t('form.addToBoard')}
        </button>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex-1 bg-green-700 hover:bg-green-600 text-white text-xs py-2 rounded transition-colors"
          >
            {t('action.save')}
          </button>
          <button
            onClick={onLoad}
            className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white text-xs py-2 rounded transition-colors"
          >
            {t('action.load')}
          </button>
        </div>
        <button
          onClick={onClear}
          className="w-full bg-gray-700 hover:bg-red-700 text-gray-300 hover:text-white text-xs py-2 rounded transition-colors"
        >
          {t('action.clearBoard')}
        </button>
      </div>
      {rawImage && (
        <ImageCropModal
          imageDataUrl={rawImage}
          isProcessing={isProcessing}
          onConfirm={confirmCrop}
          onCancel={cancelCrop}
        />
      )}
    </div>
  );
}
