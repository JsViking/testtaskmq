import { PropsWithChildren } from 'react';
import classes from './button.module.scss';

export interface IButtonProps extends PropsWithChildren {
    onClick?: () => void
}

const Button = ({ children, onClick }: IButtonProps) => {
 return <div className={classes.Button} onClick={onClick}>{children}</div>;
};

export default Button;
