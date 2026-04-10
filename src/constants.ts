import { MarkerType } from '@xyflow/react';

export const ROLES = ['suspect', 'victim', 'person_of_interest', 'witness'] as const;
export type Role = (typeof ROLES)[number];

export const EVIDENCE_TYPES = ['physical', 'photo', 'video', 'document', 'weapon', 'dna', 'fingerprint'] as const;
export type EvidenceType = (typeof EVIDENCE_TYPES)[number];

export const RELATIONSHIP_PRESETS = [
  'accomplice', 'acquaintance', 'relative', 'colleague', 'partner', 'superior', 'subordinate',
  'witnessed', 'possessed', 'found_at', 'call_history', 'alibi',
  'related', 'contradiction', 'corroboration',
] as const;

export const ROLE_COLORS: Record<Role, string> = {
  suspect: '#ef4444',
  victim: '#3b82f6',
  person_of_interest: '#f59e0b',
  witness: '#10b981',
};

export const EVIDENCE_TYPE_ICONS: Record<EvidenceType, string> = {
  physical: '🔍',
  photo: '📷',
  video: '🎥',
  document: '📄',
  weapon: '🔪',
  dna: '🧬',
  fingerprint: '👆',
};

export const COLORS = {
  EDGE: '#64748b',
  BACKGROUND_DOTS: '#2a2a4a',
  MINIMAP_PERSON: '#3b82f6',
  MINIMAP_EVIDENCE: '#f59e0b',
  MINIMAP_COMMENT: '#6b7280',
  MINIMAP_DEFAULT: '#64748b',
} as const;

export const EDGE_ARROW = { type: MarkerType.ArrowClosed, color: COLORS.EDGE } as const;

export const MINIMAP_NODE_COLOR: Record<string, string> = {
  person: COLORS.MINIMAP_PERSON,
  evidence: COLORS.MINIMAP_EVIDENCE,
  comment: COLORS.MINIMAP_COMMENT,
};

// Legacy migration maps for loading old save files with Japanese keys
export const LEGACY_ROLE_MAP: Record<string, Role> = {
  '容疑者': 'suspect',
  '被害者': 'victim',
  '関係者': 'person_of_interest',
  '目撃者': 'witness',
};

export const LEGACY_EVIDENCE_TYPE_MAP: Record<string, EvidenceType> = {
  '物証': 'physical',
  '写真': 'photo',
  '映像': 'video',
  '文書': 'document',
  '凶器': 'weapon',
  'DNA': 'dna',
  '指紋': 'fingerprint',
};

export const LEGACY_RELATIONSHIP_MAP: Record<string, string> = {
  '共犯': 'accomplice',
  '知人': 'acquaintance',
  '親族': 'relative',
  '同僚': 'colleague',
  '恋人': 'partner',
  '上司': 'superior',
  '部下': 'subordinate',
  '目撃': 'witnessed',
  '所持': 'possessed',
  '発見場所': 'found_at',
  '通話履歴': 'call_history',
  'アリバイ': 'alibi',
  '関連': 'related',
  '矛盾': 'contradiction',
  '裏付け': 'corroboration',
};
