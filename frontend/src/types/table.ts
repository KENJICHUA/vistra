export interface TableRecord {
  id: string | number;
  [key: string]: unknown;
}

export interface ColumnConfig {
  key?: string;
  label: string;
  filterable?: boolean;
}

export type Column = string | ColumnConfig;

export interface ResolvedColumn {
  key?: string;
  label: string;
  filterable: boolean;
}