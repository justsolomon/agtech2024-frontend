import Spinner from '../Spinner';
import styles from './button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Default behavior of the button. Defaults to `button` */
  type?: 'button' | 'reset' | 'submit';

  /** Classname to apply to button to override default styles */
  className?: string;

  /** Boolean showing the loading state of the button */
  isLoading?: boolean;

  /** Boolean showing the disabled state of the button */
  isDisabled?: boolean;

  /** Determines if the button is an icon button */
  iconButton?: boolean;

  /** Variant of the button. Defaults to `solid` */
  variant?: 'solid' | 'ghost' | 'transparent';

  /** Color scheme of the button. */
  colorScheme?: 'primary' | 'secondary' | 'none';

  leftIcon?: React.ReactNode;

  children: React.ReactNode;

  /** Callback to run when the button is clicked */
  onClick?: React.MouseEventHandler;
}

function Button({
  isDisabled,
  isLoading,
  children,
  className = '',
  iconButton,
  type = 'button',
  variant = 'solid',
  colorScheme = 'none',
  leftIcon,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles['button']} ${className} ${
        styles['button--' + variant]
      } ${styles['button--' + colorScheme]} ${
        iconButton ? styles['button--icon'] : ''
      } ${isLoading ? styles['button--loading'] : ''}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {leftIcon ? (
        <span className={styles['button__left-icon']}>{leftIcon}</span>
      ) : null}
      <>
        {isLoading ? (
          <Spinner
            size={iconButton ? '20px' : '24px'}
            color={iconButton ? '#11468f' : '#ffffff'}
          />
        ) : (
          children
        )}
      </>
    </button>
  );
}

export default Button;
