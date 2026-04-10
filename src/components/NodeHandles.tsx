import { Handle, Position } from '@xyflow/react';

const POSITIONS = [
  { position: Position.Top, id: 'top' },
  { position: Position.Bottom, id: 'bottom' },
  { position: Position.Left, id: 'left' },
  { position: Position.Right, id: 'right' },
] as const;

interface NodeHandlesProps {
  size?: 'sm' | 'md';
}

export default function NodeHandles({ size = 'md' }: NodeHandlesProps) {
  const sizeClass = size === 'sm' ? '!w-2.5 !h-2.5' : '!w-3 !h-3';
  return (
    <>
      {POSITIONS.map(({ position, id }) => (
        <Handle key={`${id}-target`} type="target" position={position} id={`${id}-target`} className={`!bg-gray-400 ${sizeClass} !border-2 !border-gray-300`} />
      ))}
      {POSITIONS.map(({ position, id }) => (
        <Handle key={`${id}-source`} type="source" position={position} id={`${id}-source`} className={`!bg-gray-400 ${sizeClass} !border-2 !border-gray-300`} />
      ))}
    </>
  );
}
