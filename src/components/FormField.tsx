import { type ComponentProps, type ReactNode, forwardRef } from 'react';
import { useLanguage } from '../translations';

const baseClass = 'w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400';

interface FieldWrapperProps {
  label: string;
  children: ReactNode;
}

function FieldWrapper({ label, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

type FormInputProps = { label: string } & ComponentProps<'input'>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, className, ...props }, ref) => (
    <FieldWrapper label={label}>
      <input ref={ref} className={`${baseClass} ${className ?? ''}`} {...props} />
    </FieldWrapper>
  ),
);
FormInput.displayName = 'FormInput';

type FormSelectProps = { label: string } & ComponentProps<'select'>;

export function FormSelect({ label, className, children, ...props }: FormSelectProps) {
  return (
    <FieldWrapper label={label}>
      <select className={`${baseClass} ${className ?? ''}`} {...props}>
        {children}
      </select>
    </FieldWrapper>
  );
}

type FormTextareaProps = { label: string } & ComponentProps<'textarea'>;

export function FormTextarea({ label, className, ...props }: FormTextareaProps) {
  return (
    <FieldWrapper label={label}>
      <textarea className={`${baseClass} resize-none ${className ?? ''}`} {...props} />
    </FieldWrapper>
  );
}

interface ImagePickerProps {
  preview: string | undefined;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  thumbnailClass?: string;
}

export function ImagePicker({ preview, fileInputRef, onSelect, onClear, thumbnailClass = 'w-20 h-[60px]' }: ImagePickerProps) {
  const { t } = useLanguage();
  const triggerSelect = () => fileInputRef.current?.click();

  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{t('form.photo')}</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onSelect}
        className="hidden"
      />
      {preview ? (
        <div className="flex items-start gap-3">
          <img src={preview} alt="Preview" className={`${thumbnailClass} object-cover rounded shrink-0`} />
          <div className="flex flex-col gap-1.5 pt-0.5">
            <button onClick={triggerSelect} className="text-xs text-blue-400 hover:text-blue-300 text-left">
              {t('image.change')}
            </button>
            <button onClick={onClear} className="text-xs text-red-400 hover:text-red-300 text-left">
              {t('image.remove')}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={triggerSelect}
          className="w-full text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 py-2 px-3 rounded transition-colors text-left"
        >
          {t('image.select')}
        </button>
      )}
    </div>
  );
}
