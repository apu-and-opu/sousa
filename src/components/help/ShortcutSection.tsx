import { Kbd } from './HelpHelpers';
import { useLanguage } from '../../translations';

export default function ShortcutSection() {
  const { t } = useLanguage();

  const shortcuts = [
    { keys: ['Delete'], desc: t('help.shortcut.delete') },
    { keys: ['Shift', t('help.shortcut.click')], desc: t('help.shortcut.multiSelect') },
    { keys: ['Esc'], desc: t('help.shortcut.escape') },
    { keys: ['Enter'], desc: t('help.shortcut.enter') },
    { keys: [t('help.shortcut.wheelKey')], desc: t('help.shortcut.wheel') },
  ];

  return (
    <>
      <p className="text-gray-300 text-sm leading-relaxed">
        {t('help.shortcut.intro')}
      </p>

      <div className="bg-[#0f0f23] rounded-lg border border-gray-700 divide-y divide-gray-700">
        {shortcuts.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-3.5">
            <div className="shrink-0 flex items-center gap-1 whitespace-nowrap">
              {item.keys.map((k, j) => (
                <span key={j} className="inline-flex items-center">
                  {j > 0 && <span className="text-gray-500 mx-0.5">+</span>}
                  <Kbd>{k}</Kbd>
                </span>
              ))}
            </div>
            <div className="text-gray-300 text-sm">{item.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
