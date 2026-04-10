import { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import type { CommentData } from '../types';
import NodeHandles from './NodeHandles';

type CommentNode = Node<CommentData>;

function CommentNode({ data, selected }: NodeProps<CommentNode>) {
  return (
    <div
      className={`
        relative bg-[#2a2a3e] rounded shadow-lg border-2 min-w-[120px] max-w-[250px]
        transition-all duration-200
        ${selected ? 'border-yellow-400 shadow-yellow-400/30' : 'border-gray-500'}
      `}
    >
      <NodeHandles size="sm" />

      <div className="p-3">
        {data.label && (
          <div className="text-xs font-bold text-blue-300 mb-1">{data.label}</div>
        )}
        <div className="text-sm text-gray-200 whitespace-pre-wrap">{data.text}</div>
      </div>
    </div>
  );
}

export default memo(CommentNode);
