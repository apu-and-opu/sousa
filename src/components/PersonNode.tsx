import { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import type { PersonData } from '../types';
import { ROLE_COLORS, type Role } from '../constants';
import NodeHandles from './NodeHandles';
import { useLanguage } from '../translations';

type PersonNode = Node<PersonData>;

function PersonNode({ data, selected }: NodeProps<PersonNode>) {
  const { t } = useLanguage();
  const roleColor = (data.role && data.role in ROLE_COLORS ? ROLE_COLORS[data.role as Role] : '#6b7280');

  return (
    <div
      className={`
        relative bg-[#16213e] rounded-lg shadow-lg border-2 w-[180px]
        transition-all duration-200
        ${selected ? 'border-yellow-400 shadow-yellow-400/30' : 'border-gray-600'}
      `}
    >
      <NodeHandles />

      {data.role && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white whitespace-nowrap"
          style={{ backgroundColor: roleColor }}
        >
          {t(`role.${data.role}`)}
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
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
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

export default memo(PersonNode);
