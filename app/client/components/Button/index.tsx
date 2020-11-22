import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { button, valid, invalid } from './index.scss';

export enum ButtonTypes {
    Default,
    Invalid,
    Valid,
}

type ButtonProps = {
    onClick(): void;
    text: string;
    enabled?: boolean;
    type?: ButtonTypes;
};

const Button: FunctionComponent<ButtonProps> = ({ onClick, text, type = ButtonTypes.Default, enabled = true }) => {
    return (
        <button
            className={classnames(button, {
                [valid]: type === ButtonTypes.Valid,
                [invalid]: type === ButtonTypes.Invalid,
            })}
            disabled={!enabled}
            onClick={() => onClick()}
        >
            {text}
        </button>
    );
};

export default Button;
