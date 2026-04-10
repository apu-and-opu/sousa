import { useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Edge,
  type Node,
  type NodeTypes,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import PersonNode from './components/PersonNode';
import EvidenceNode from './components/EvidenceNode';
import CommentNode from './components/CommentNode';
import Sidebar from './components/Sidebar';
import EditModal from './components/EditModal';
import EdgeLabelModal from './components/EdgeLabelModal';
import HelpPage from './components/HelpPage';
import type { BoardNodeData, ArrowDirection } from './types';
import { COLORS, MINIMAP_NODE_COLOR } from './constants';
import { useFileIO } from './hooks/useFileIO';
import { useBoardActions } from './hooks/useBoardActions';
import { useLanguage, translateEdgeLabel } from './translations';

function getEdgeDirection(edge: Edge): ArrowDirection {
  const hasEnd = !!edge.markerEnd;
  const hasStart = !!edge.markerStart;
  if (hasEnd && hasStart) return 'both';
  if (hasStart) return 'reverse';
  if (hasEnd) return 'forward';
  return 'none';
}

const nodeTypes: NodeTypes = {
  person: PersonNode,
  evidence: EvidenceNode,
  comment: CommentNode,
};

const defaultEdgeOptions = {
  style: { stroke: COLORS.EDGE, strokeWidth: 2 },
  animated: false,
  labelStyle: { fontSize: 14, fontWeight: 500, fill: '#1f2937' },
  labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95, rx: 4, ry: 4 },
  labelBgPadding: [10, 6] as [number, number],
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [editingEdge, setEditingEdge] = useState<Edge | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const { t } = useLanguage();

  const { fileInputRef, handleSave, handleLoad, handleFileLoad, handleClear } = useFileIO({
    nodes, edges, setNodes, setEdges,
  });

  const {
    onConnect,
    onReconnect,
    onNodeDoubleClick,
    onEdgeDoubleClick,
    handleAddPerson,
    handleAddEvidence,
    handleAddComment,
    handleNodeEditSave,
    handleEdgeLabelSave,
    handleEdgeDirectionChange,
    handleEdgeDelete,
    handleDeleteSelected,
  } = useBoardActions({
    nodes, setNodes, setEdges,
    editingNode, setEditingNode,
    editingEdge, setEditingEdge,
  });

  // Translate preset edge labels for display; free-text labels pass through unchanged
  const translatedEdges = useMemo(
    () => edges.map(e => {
      if (!e.label || typeof e.label !== 'string') return e;
      return { ...e, label: translateEdgeLabel(e.label, t) };
    }),
    [edges, t],
  );

  return (
    <div className="flex h-screen w-screen">
      <Sidebar
        onAddPerson={handleAddPerson}
        onAddEvidence={handleAddEvidence}
        onAddComment={handleAddComment}
        onSave={handleSave}
        onLoad={handleLoad}
        onClear={handleClear}
        onHelp={() => setShowHelp(true)}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileLoad}
        className="hidden"
      />

      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={translatedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onReconnect={onReconnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          minZoom={0.15}
          fitView
          fitViewOptions={{ maxZoom: 1, padding: 0.2 }}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          className="bg-[#12121f]"
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color={COLORS.BACKGROUND_DOTS}
          />
          <Controls
            className="!bg-[#1a1a2e] !border-gray-700 !shadow-lg [&>button]:!bg-[#1a1a2e] [&>button]:!border-gray-700 [&>button]:!text-gray-300 [&>button:hover]:!bg-gray-700"
          />
          <MiniMap
            className="!bg-[#1a1a2e] !border-gray-700"
            nodeColor={(node) => MINIMAP_NODE_COLOR[node.type ?? ''] ?? COLORS.MINIMAP_DEFAULT}
          />
          <Panel position="top-right">
            <div className="flex gap-2">
              <button
                onClick={handleDeleteSelected}
                className="bg-red-800/80 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded shadow transition-colors"
              >
                {t('app.deleteSelected')}
              </button>
            </div>
          </Panel>
          <Panel position="top-center">
            <div className="text-gray-500 text-xs select-none">
              {t('app.canvasHint')}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {editingNode && (
        <EditModal
          data={editingNode.data as BoardNodeData}
          onSave={handleNodeEditSave}
          onClose={() => setEditingNode(null)}
        />
      )}

      {showHelp && (
        <HelpPage onClose={() => setShowHelp(false)} />
      )}

      {editingEdge && (
        <EdgeLabelModal
          currentLabel={(editingEdge.label as string) || ''}
          currentDirection={getEdgeDirection(editingEdge)}
          onSave={handleEdgeLabelSave}
          onDirectionChange={handleEdgeDirectionChange}
          onDelete={handleEdgeDelete}
          onClose={() => setEditingEdge(null)}
        />
      )}
    </div>
  );
}
