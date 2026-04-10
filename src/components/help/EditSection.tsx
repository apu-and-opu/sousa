import { StepBox, Kbd } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function EditSection() {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.edit.changeTitle')}</div>
        <StepBox step={1} title={t('help.edit.step1Title')}>
          {t('help.edit.step1Desc')}
        </StepBox>
        <StepBox step={2} title={t('help.edit.step2Title')}>
          {t('help.edit.step2Desc')}
        </StepBox>
      </div>

      <hr className="border-gray-700" />

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.edit.moveTitle')}</div>
        <p className="text-gray-300 text-sm">
          {t('help.edit.moveDesc')}
        </p>
      </div>

      <hr className="border-gray-700" />

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.edit.deleteTitle')}</div>

        <div className="bg-[#0f0f23] rounded-lg p-4 border border-gray-700 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-lg">1️⃣</span>
            <div className="text-sm text-gray-300">
              <strong className="text-white">{t('help.edit.deleteSingleLabel')}</strong>
              {t('help.edit.deleteSingleDesc')} <Kbd>Delete</Kbd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">2️⃣</span>
            <div className="text-sm text-gray-300">
              <strong className="text-white">{t('help.edit.deleteMultiLabel')}</strong>
              <Kbd>Shift</Kbd> {t('help.edit.deleteMultiDesc')} <Kbd>Delete</Kbd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">3️⃣</span>
            <div className="text-sm text-gray-300">
              <strong className="text-white">{t('help.edit.deleteLineLabel')}</strong>
              {t('help.edit.deleteLineDesc')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
