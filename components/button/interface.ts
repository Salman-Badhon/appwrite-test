import { ICustomLink } from './../custom-link/interface';
import { VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import { customButtonVariants } from './variants-style';

interface IBaseButton extends PropsWithChildren {
  /** The color scheme of the button. */
  colorScheme: NonNullable<CustomButtonVariants['colorScheme']>;
  /** Disables the Button, preventing mouse event*/
  disabled: boolean;
  /** The aria-label of the button. */
  ariaLabel?: string;
  className?: string;
}

export interface IActionButton extends IBaseButton {
  /** Specifies the type of button as an action button. */
  type: 'action';
  /** Specifies whether the button is in a loading state. */
  loading?: boolean;
  /** The onclick attribute fires on a mouse click on the element. */
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ILinkButton
  extends IBaseButton,
    Omit<ICustomLink, 'label' | 'className'> {
  /** Specifies the type of button as a link button. */
  type: 'link';
}

export interface IFormButton
  extends IBaseButton,
    Pick<IActionButton, 'loading'> {
  /** Specifies the type of button as an form button. */
  type: 'submit' | 'reset';
}

export interface IInlineButton extends IBaseButton {
  /** Specifies the type of button as an inline button. */
  type: 'inline';
}

/** Type alias for a custom button that can be either an action button or a link button. */
export type ICustomButton =
  | IActionButton
  | ILinkButton
  | IFormButton
  | IInlineButton;

export type CustomButtonVariants = VariantProps<typeof customButtonVariants>;
