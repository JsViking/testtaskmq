import { PropsWithChildren } from 'react';
import classes from './button.module.scss';

export interface IButtonProps extends PropsWithChildren {
    onClick?: () => void
    disabled?: boolean
}

const Button = ({ children, onClick, disabled }: IButtonProps) => {
    return (
        <div 
            className={`${classes.Button} ${disabled ? classes.disabled : ''}`} 
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Button;
