import { useState, type ComponentType } from 'react';
import OverviewSection from './help/OverviewSection';
import AddSection from './help/AddSection';
import ConnectSection from './help/ConnectSection';
import EditSection from './help/EditSection';
import CanvasSection from './help/CanvasSection';
import SaveSection from './help/SaveSection';
import ShortcutSection from './help/ShortcutSection';
import { useLanguage } from '../translations';

interface HelpPageProps {
  onClose: () => void;
}

type SectionId = 'overview' | 'add' | 'connect' | 'edit' | 'canvas' | 'save' | 'shortcut';

interface Section {
  id: SectionId;
  icon: string;
  titleKey: string;
  component: ComponentType;
}

const sections: Section[] = [
  { id: 'overview', icon: '📖', titleKey: 'help.section.overview', component: OverviewSection },
  { id: 'add',      icon: '➕', titleKey: 'help.section.add',      component: AddSection },
  { id: 'connect',  icon: '🔗', titleKey: 'help.section.connect',  component: ConnectSection },
  { id: 'edit',     icon: '✏️', titleKey: 'help.section.edit',     component: EditSection },
  { id: 'canvas',   icon: '🖱️', titleKey: 'help.section.canvas',  component: CanvasSection },
  { id: 'save',     icon: '💾', titleKey: 'help.section.save',     component: SaveSection },
  { id: 'shortcut', icon: '⌨️', titleKey: 'help.section.shortcut', component: ShortcutSection },
];

export default function HelpPage({ onClose }: HelpPageProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const { t } = useLanguage();
  const current = sections.find(s => s.id === activeSection)!;
  const SectionContent = current.component;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#1a1a2e] border border-gray-600 rounded-xl shadow-2xl w-[820px] max-w-[95vw] h-[85vh] flex overflow-hidden"
      >
        {/* Left Nav */}
        <nav className="w-[200px] shrink-0 bg-[#0f0f23] border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-bold text-base flex items-center gap-2">
              <span className="text-xl">❓</span> {t('help.title').replace('❓ ', '')}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2
                  ${activeSection === s.id
                    ? 'bg-blue-600/20 text-blue-300 border-r-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
              >
                <span>{s.icon}</span>
                <span>{t(s.titleKey)}</span>
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm py-2 rounded transition-colors"
            >
              {t('help.close')}
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 bg-[#1a1a2e]/95 backdrop-blur border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              {current.icon} {t(current.titleKey)}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
          </div>

          <div className="p-6 space-y-5">
            <SectionContent />
          </div>
        </div>
      </div>
    </div>
  );
}
