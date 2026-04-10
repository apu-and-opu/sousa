import { ColorBadge } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function OverviewSection() {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-gray-300 text-sm leading-relaxed">
        <strong className="text-white">{t('app.title')}</strong>{' '}
        {t('help.overview.intro')}
      </p>

      <div className="bg-[#0f0f23] rounded-lg p-4 border border-gray-700 space-y-3">
        <div className="text-white font-bold text-sm mb-2">{t('help.overview.screenLayout')}</div>
        <div className="flex gap-4">
          <div className="w-1/3 bg-[#16213e] rounded p-3 border border-gray-600">
            <div className="text-blue-300 font-bold text-xs mb-2">{t('help.overview.sidebarTitle')}</div>
            <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
              <li>{t('help.overview.sidebarItem1')}</li>
              <li>{t('help.overview.sidebarItem2')}</li>
              <li>{t('help.overview.sidebarItem3')}</li>
            </ul>
          </div>
          <div className="w-2/3 bg-[#12121f] rounded p-3 border border-gray-600">
            <div className="text-blue-300 font-bold text-xs mb-2">{t('help.overview.boardTitle')}</div>
            <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
              <li>{t('help.overview.boardItem1')}</li>
              <li>{t('help.overview.boardItem2')}</li>
              <li>{t('help.overview.boardItem3')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-white font-bold text-sm">{t('help.overview.cardTypes')}</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#16213e] rounded-lg p-3 border border-blue-800 text-center">
            <div className="text-2xl mb-1">👤</div>
            <div className="text-white font-bold text-sm">{t('help.overview.personCard')}</div>
            <div className="text-gray-400 text-xs mt-1">{t('help.overview.personCardDesc')}</div>
          </div>
          <div className="bg-[#1a1a2e] rounded-lg p-3 border border-amber-800 text-center">
            <div className="text-2xl mb-1">🔍</div>
            <div className="text-white font-bold text-sm">{t('help.overview.evidenceCard')}</div>
            <div className="text-gray-400 text-xs mt-1">{t('help.overview.evidenceCardDesc')}</div>
          </div>
          <div className="bg-[#2a2a3e] rounded-lg p-3 border border-gray-500 text-center">
            <div className="text-2xl mb-1">📝</div>
            <div className="text-white font-bold text-sm">{t('help.overview.commentCard')}</div>
            <div className="text-gray-400 text-xs mt-1">{t('help.overview.commentCardDesc')}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-white font-bold text-sm">{t('help.overview.colorCoding')}</div>
        <div className="flex flex-wrap">
          <ColorBadge color="#ef4444" label={t('help.overview.suspectRed')} />
          <ColorBadge color="#3b82f6" label={t('help.overview.victimBlue')} />
          <ColorBadge color="#f59e0b" label={t('help.overview.poiYellow')} />
          <ColorBadge color="#10b981" label={t('help.overview.witnessGreen')} />
        </div>
      </div>
    </>
  );
}
