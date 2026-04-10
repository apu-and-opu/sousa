import { useCallback } from 'react';
import { addEdge, reconnectEdge, type Connection, type Edge, type Node } from '@xyflow/react';
import type { BoardNodeData, PersonData, EvidenceData, CommentData, ArrowDirection } from '../types';
import { COLORS, EDGE_ARROW } from '../constants';

function getRandomPosition() {
  return {
    x: 300 + Math.random() * 600,
    y: 100 + Math.random() * 400,
  };
}

interface UseBoardActionsOptions {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  editingNode: Node | null;
  setEditingNode: (node: Node | null) => void;
  editingEdge: Edge | null;
  setEditingEdge: (edge: Edge | null) => void;
}

export function useBoardActions({ nodes, setNodes, setEdges, editingNode, setEditingNode, editingEdge, setEditingEdge }: UseBoardActionsOptions) {
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'default',
            label: '',
            style: { stroke: COLORS.EDGE, strokeWidth: 2 },
            markerEnd: EDGE_ARROW,
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((eds) => {
        const original = eds.find((e) => e.id === oldEdge.id);
        if (!original) return eds;
        return reconnectEdge(original, newConnection, eds);
      });
    },
    [setEdges],
  );

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setEditingNode(node);
  }, [setEditingNode]);

  const onEdgeDoubleClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setEditingEdge(edge);
  }, [setEditingEdge]);

  const handleAddPerson = useCallback(
    (label: string, role: string, image?: string, description?: string) => {
      const newNode: Node<PersonData> = {
        id: crypto.randomUUID(),
        type: 'person',
        position: getRandomPosition(),
        data: { category: 'person', label, role, image, description },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const handleAddEvidence = useCallback(
    (label: string, evidenceType: string, image?: string, description?: string) => {
      const newNode: Node<EvidenceData> = {
        id: crypto.randomUUID(),
        type: 'evidence',
        position: getRandomPosition(),
        data: { category: 'evidence', label, evidenceType, image, description },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const handleAddComment = useCallback(
    (label: string, text: string) => {
      const newNode: Node<CommentData> = {
        id: crypto.randomUUID(),
        type: 'comment',
        position: getRandomPosition(),
        data: { category: 'comment', label, text },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const handleNodeEditSave = useCallback(
    (data: BoardNodeData) => {
      if (!editingNode) return;
      setNodes((nds) =>
        nds.map((n) => (n.id === editingNode.id ? { ...n, data } : n)),
      );
      setEditingNode(null);
    },
    [editingNode, setNodes, setEditingNode],
  );

  const handleEdgeLabelSave = useCallback(
    (label: string) => {
      if (!editingEdge) return;
      setEdges((eds) =>
        eds.map((e) => (e.id === editingEdge.id ? { ...e, label } : e)),
      );
    },
    [editingEdge, setEdges],
  );

  const handleEdgeDirectionChange = useCallback((direction: ArrowDirection) => {
    if (!editingEdge) return;
    const arrow = EDGE_ARROW;
    const markers: Pick<Edge, 'markerStart' | 'markerEnd'> =
      direction === 'forward'  ? { markerStart: undefined, markerEnd: arrow } :
      direction === 'reverse'  ? { markerStart: arrow, markerEnd: undefined } :
      direction === 'both'     ? { markerStart: arrow, markerEnd: arrow } :
                                 { markerStart: undefined, markerEnd: undefined };
    setEdges((eds) =>
      eds.map((e) => (e.id === editingEdge.id ? { ...e, ...markers } : e)),
    );
    setEditingEdge({ ...editingEdge, ...markers });
  }, [editingEdge, setEdges, setEditingEdge]);

  const handleEdgeDelete = useCallback(() => {
    if (!editingEdge) return;
    setEdges((eds) => eds.filter((e) => e.id !== editingEdge.id));
  }, [editingEdge, setEdges]);

  const handleDeleteSelected = useCallback(() => {
    const selectedNodeIds = new Set(nodes.filter((n) => n.selected).map((n) => n.id));
    setNodes((nds) => nds.filter((n) => !n.selected));
    setEdges((eds) =>
      eds.filter(
        (e) => !e.selected && !selectedNodeIds.has(e.source) && !selectedNodeIds.has(e.target),
      ),
    );
  }, [nodes, setNodes, setEdges]);

  return {
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
  };
}
