import type { ReactNode } from 'react';

export function StepBox({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
        {step}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-sm mb-1">{title}</div>
        <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-block px-2 py-0.5 bg-gray-700 border border-gray-500 rounded text-xs text-gray-200 font-mono mx-0.5">
      {children}
    </kbd>
  );
}

export function ColorBadge({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 mr-3 mb-1">
      <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-sm text-gray-300">{label}</span>
    </span>
  );
}

export function Diagram({ children }: { children: ReactNode }) {
  return (
    <div className="my-3 p-4 bg-[#12121f] rounded-lg border border-gray-700 flex items-center justify-center gap-3 select-none">
      {children}
    </div>
  );
}

export function FakeNode({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="rounded-lg border-2 text-center text-white font-bold px-4 py-3 text-sm"
      style={{ borderColor: color, backgroundColor: '#16213e' }}
    >
      {label}
    </div>
  );
}

export function FakeArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {label && <span className="text-[10px] text-yellow-300 whitespace-nowrap">{label}</span>}
      <div className="flex items-center text-gray-400">
        <div className="w-12 h-0.5 bg-gray-500" />
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-gray-500" />
      </div>
    </div>
  );
}
