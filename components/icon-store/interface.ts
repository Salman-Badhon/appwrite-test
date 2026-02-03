export const icons = [
  'tick',
  'view',
  'hide',
  'spinner-circle',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'menu',
  'error',
  'brand-large',
  'brand-small',
] as const;

export type IconName = (typeof icons)[number];

export interface IIconStore {
  /**
   * Specifies the name of the icon to be displayed.
   */
  iconName: IconName;
  className?: string;
}
