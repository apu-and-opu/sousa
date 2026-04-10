export type NodeCategory = 'person' | 'evidence' | 'comment';

export type ArrowDirection = 'forward' | 'reverse' | 'both' | 'none';

interface NodeDataBase {
  [key: string]: unknown;
}

export interface PersonData extends NodeDataBase {
  category: 'person';
  label: string;
  image?: string;
  role?: string;
  description?: string;
}

export interface EvidenceData extends NodeDataBase {
  category: 'evidence';
  label: string;
  image?: string;
  evidenceType?: string;
  description?: string;
}

export interface CommentData extends NodeDataBase {
  category: 'comment';
  label: string;
  text: string;
}

export type BoardNodeData = PersonData | EvidenceData | CommentData;

export function isCommentData(data: BoardNodeData): data is CommentData {
  return data.category === 'comment';
}
