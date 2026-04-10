import { StepBox } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function SaveSection() {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.save.saveTitle')}</div>
        <StepBox step={1} title={t('help.save.saveStep1Title')}>
          {t('help.save.saveStep1Desc')}
        </StepBox>
        <StepBox step={2} title={t('help.save.saveStep2Title')}>
          {t('help.save.saveStep2Desc')}
        </StepBox>
      </div>

      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
        <div className="text-blue-300 text-sm font-bold">{t('help.save.sizeTitle')}</div>
        <div className="text-gray-300 text-sm mt-1 leading-relaxed">
          {t('help.save.sizeDesc')}
        </div>
      </div>

      <hr className="border-gray-700" />

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.save.loadTitle')}</div>
        <StepBox step={1} title={t('help.save.loadStep1Title')}>
          {t('help.save.loadStep1Desc')}
        </StepBox>
        <StepBox step={2} title={t('help.save.loadStep2Title')}>
          {t('help.save.loadStep2Desc')}
        </StepBox>
      </div>

      <hr className="border-gray-700" />

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.save.clearTitle')}</div>
        <p className="text-gray-300 text-sm">
          {t('help.save.clearDesc')}
        </p>
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
          <div className="text-red-300 text-sm font-bold">{t('help.save.clearWarningTitle')}</div>
          <div className="text-red-200 text-sm mt-1">
            {t('help.save.clearWarningDesc')}
          </div>
        </div>
      </div>
    </>
  );
}
