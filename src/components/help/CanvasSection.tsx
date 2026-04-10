import { ColorBadge } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function CanvasSection() {
  const { t } = useLanguage();

  const controls = [
    { action: t('help.canvas.zoom'), how: t('help.canvas.zoomHow'), icon: '🔍' },
    { action: t('help.canvas.scroll'), how: t('help.canvas.scrollHow'), icon: '✋' },
    { action: t('help.canvas.fitView'), how: t('help.canvas.fitViewHow'), icon: '⊞' },
    { action: t('help.canvas.zoomIn'), how: t('help.canvas.zoomInHow'), icon: '➕' },
    { action: t('help.canvas.zoomOut'), how: t('help.canvas.zoomOutHow'), icon: '➖' },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="bg-[#0f0f23] rounded-lg border border-gray-700 divide-y divide-gray-700">
          {controls.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <span className="text-xl shrink-0 w-8 text-center">{item.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">{item.action}</div>
                <div className="text-gray-400 text-sm">{item.how}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-white font-bold text-sm">{t('help.canvas.minimapTitle')}</div>
        <p className="text-gray-300 text-sm">
          {t('help.canvas.minimapDesc')}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <ColorBadge color="#3b82f6" label={t('help.canvas.minimapPerson')} />
          <ColorBadge color="#f59e0b" label={t('help.canvas.minimapEvidence')} />
          <ColorBadge color="#6b7280" label={t('help.canvas.minimapComment')} />
        </div>
      </div>
    </>
  );
}
