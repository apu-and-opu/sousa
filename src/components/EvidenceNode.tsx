import { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import type { EvidenceData } from '../types';
import { EVIDENCE_TYPE_ICONS, type EvidenceType } from '../constants';
import NodeHandles from './NodeHandles';
import { useLanguage } from '../translations';

type EvidenceNode = Node<EvidenceData>;

function EvidenceNode({ data, selected }: NodeProps<EvidenceNode>) {
  const { t } = useLanguage();
  const icon = (data.evidenceType && data.evidenceType in EVIDENCE_TYPE_ICONS ? EVIDENCE_TYPE_ICONS[data.evidenceType as EvidenceType] : '📋');

  return (
    <div
      className={`
        relative bg-[#1a1a2e] rounded-lg shadow-lg border-2 w-[180px]
        transition-all duration-200
        ${selected ? 'border-yellow-400 shadow-yellow-400/30' : 'border-amber-700'}
      `}
    >
      <NodeHandles />

      {data.evidenceType && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white bg-amber-700 whitespace-nowrap">
          {icon} {t(`evidence.${data.evidenceType}`)}
        </div>
      )}

      <div className="p-2 pt-3">
        {data.image ? (
          <div className="w-full aspect-[4/3] rounded overflow-hidden mb-2 bg-black/30">
            <img
              src={data.image}
              alt={data.label}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ) : (
          <div className="w-full aspect-[4/3] rounded mb-2 bg-gray-700/50 flex items-center justify-center">
            <span className="text-4xl">{icon}</span>
          </div>
        )}

        <div className="text-center">
          <div className="text-sm font-bold text-white truncate">{data.label}</div>
          {data.description && (
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">{data.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(EvidenceNode);
