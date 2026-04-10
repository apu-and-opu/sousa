import { useCallback, useRef } from 'react';
import type { Node, Edge } from '@xyflow/react';
import { LEGACY_ROLE_MAP, LEGACY_EVIDENCE_TYPE_MAP, LEGACY_RELATIONSHIP_MAP } from '../constants';
import { useLanguage } from '../translations';

interface UseFileIOOptions {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

function migrateNode(node: Record<string, unknown>): Record<string, unknown> {
  const data = node.data as Record<string, unknown> | undefined;
  if (!data) return node;

  const category = data.category as string | undefined;

  if (category === 'person' && typeof data.role === 'string') {
    const migrated = LEGACY_ROLE_MAP[data.role];
    if (migrated) {
      return { ...node, data: { ...data, role: migrated } };
    }
  }

  if (category === 'evidence' && typeof data.evidenceType === 'string') {
    const migrated = LEGACY_EVIDENCE_TYPE_MAP[data.evidenceType];
    if (migrated) {
      return { ...node, data: { ...data, evidenceType: migrated } };
    }
  }

  return node;
}

function migrateEdge(edge: Record<string, unknown>): Record<string, unknown> {
  if (typeof edge.label === 'string' && edge.label in LEGACY_RELATIONSHIP_MAP) {
    return { ...edge, label: LEGACY_RELATIONSHIP_MAP[edge.label] };
  }
  return edge;
}

const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

function getDefaultFileName(): string {
  const now = new Date();
  const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return `sousa-${localDate}.json`;
}

export function useFileIO({ nodes, edges, setNodes, setEdges }: UseFileIOOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleSave = useCallback(async () => {
    const json = JSON.stringify({ nodes, edges });

    if (isTauri) {
      try {
        const { save } = await import('@tauri-apps/plugin-dialog');
        const { writeTextFile } = await import('@tauri-apps/plugin-fs');
        const path = await save({
          defaultPath: getDefaultFileName(),
          filters: [{ name: 'JSON', extensions: ['json'] }],
        });
        if (!path) return;
        await writeTextFile(path, json);
        alert(t('fileio.saved').replace('{path}', path));
      } catch {
        alert(t('fileio.saveError'));
      }
    } else {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getDefaultFileName();
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [nodes, edges, t]);

  const handleLoad = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileLoad = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onerror = () => {
        alert(t('fileio.loadError'));
      };
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (!Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
            alert(t('fileio.invalidFormat'));
            return;
          }
          const validNodes = data.nodes.every(
            (n: Record<string, unknown>) =>
              typeof n.id === 'string' &&
              typeof n.type === 'string' &&
              n.position != null &&
              n.data != null,
          );
          const validEdges = data.edges.every(
            (e: Record<string, unknown>) =>
              typeof e.id === 'string' &&
              typeof e.source === 'string' &&
              typeof e.target === 'string',
          );
          if (!validNodes || !validEdges) {
            alert(t('fileio.corruptFile'));
            return;
          }
          const migratedNodes = data.nodes.map(migrateNode);
          const migratedEdges = data.edges.map(migrateEdge);
          setNodes(migratedNodes as Node[]);
          setEdges(migratedEdges as Edge[]);
        } catch {
          alert(t('fileio.loadError'));
        }
      };
      reader.readAsText(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [setNodes, setEdges, t],
  );

  const handleClear = useCallback(() => {
    if (nodes.length === 0 && edges.length === 0) return;
    if (confirm(t('fileio.confirmClear'))) {
      setNodes([]);
      setEdges([]);
    }
  }, [nodes, edges, setNodes, setEdges, t]);

  return { fileInputRef, handleSave, handleLoad, handleFileLoad, handleClear };
}
