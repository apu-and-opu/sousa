import { RELATIONSHIP_PRESETS } from '../../constants';
import { StepBox, Diagram, FakeNode, FakeArrow } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function ConnectSection() {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-gray-300 text-sm leading-relaxed">
        {t('help.connect.intro')}
      </p>

      <div className="space-y-4">
        <StepBox step={1} title={t('help.connect.step1Title')}>
          {t('help.connect.step1Desc')}
        </StepBox>
        <StepBox step={2} title={t('help.connect.step2Title')}>
          {t('help.connect.step2Desc')}
        </StepBox>
        <StepBox step={3} title={t('help.connect.step3Title')}>
          {t('help.connect.step3Desc')}
        </StepBox>
      </div>

      <Diagram>
        <FakeNode label={t('help.connect.diagramPerson1')} color="#3b82f6" />
        <FakeArrow label={t('help.connect.diagramLabel')} />
        <FakeNode label={t('help.connect.diagramPerson2')} color="#ef4444" />
      </Diagram>

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.connect.labelTitle')}</div>
        <StepBox step={1} title={t('help.connect.labelStep1Title')}>
          {t('help.connect.labelStep1Desc')}
        </StepBox>
        <StepBox step={2} title={t('help.connect.labelStep2Title')}>
          {t('help.connect.labelStep2Desc')}
        </StepBox>
      </div>

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.connect.directionTitle')}</div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {t('help.connect.directionDesc')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="text-white font-bold text-sm">{t('help.connect.reconnectTitle')}</div>
        <StepBox step={1} title={t('help.connect.reconnectStep1Title')}>
          {t('help.connect.reconnectStep1Desc')}
        </StepBox>
        <StepBox step={2} title={t('help.connect.reconnectStep2Title')}>
          {t('help.connect.reconnectStep2Desc')}
        </StepBox>
      </div>

      <div className="bg-[#0f0f23] rounded-lg p-3 border border-gray-700 mt-2">
        <div className="text-xs text-gray-400 mb-2">{t('help.connect.presetsLabel')}</div>
        <div className="flex flex-wrap gap-1.5">
          {RELATIONSHIP_PRESETS.map(r => (
            <span key={r} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{t(`rel.${r}`)}</span>
          ))}
        </div>
      </div>
    </>
  );
}
