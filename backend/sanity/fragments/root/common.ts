export interface ISanitySlug {
  current: string;
}

export interface ISanityCode {
  _key: string;
  _type: 'code';
  language: string;
  highlightedLines?: number[];
  code: string;
  filename: string;
  markDefs: undefined | [] | null;
}
