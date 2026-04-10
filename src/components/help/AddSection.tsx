import { StepBox } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function AddSection() {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-gray-300 text-sm leading-relaxed">
        {t('help.add.intro')}
      </p>

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.add.addPerson')}</div>
        <div className="space-y-4">
          <StepBox step={1} title={t('help.add.step1Title')}>
            {t('help.add.step1Desc')}
          </StepBox>
          <StepBox step={2} title={t('help.add.step2Title')}>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li><strong>{t('help.add.step2Name')}</strong></li>
              <li><strong>{t('help.add.step2Role')}</strong></li>
              <li><strong>{t('help.add.step2Photo')}</strong></li>
              <li><strong>{t('help.add.step2Desc')}</strong></li>
            </ul>
          </StepBox>
          <StepBox step={3} title={t('help.add.step3Title')}>
            {t('help.add.step3Desc')}
          </StepBox>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
        <div className="text-blue-300 text-sm font-bold">{t('help.add.compressionTitle')}</div>
        <div className="text-gray-300 text-sm mt-1 leading-relaxed">
          {t('help.add.compressionDesc')}
        </div>
      </div>

      <hr className="border-gray-700" />

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.add.addEvidence')}</div>
        <p className="text-gray-300 text-sm">
          {t('help.add.addEvidenceDesc')}
        </p>
      </div>

      <hr className="border-gray-700" />

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.add.addComment')}</div>
        <p className="text-gray-300 text-sm">
          {t('help.add.addCommentDesc')}
        </p>
      </div>
    </>
  );
}
