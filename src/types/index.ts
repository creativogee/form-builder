export type FieldProp = {
  id: string
  type?: string;
  callback: (key: string) => void;
};

export type CheckedProp = {
  Required?: boolean;
  Underline?: boolean;
  Align?: 'Left' | 'Right' | 'Center',
}

export type ConfigProp = {
  id: number;
  attr: string;
  type: 'text' | 'checkbox';
  value?: string;
  checked?: boolean;
  info?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
