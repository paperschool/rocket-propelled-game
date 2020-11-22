import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { input, valid, invalid } from './index.scss';

export enum InputTypes {
    Default,
    Invalid,
    Valid,
}

export type InputProps = {
    onChange(event: string): void;
    placeholder?: string;
    type?: InputTypes;
    value?: string;
};

const Input: FunctionComponent<InputProps> = ({ placeholder, onChange, type = InputTypes.Default, value }) => {
    return (
        <input
            className={classnames(input, {
                [valid]: type === InputTypes.Valid,
                [invalid]: type === InputTypes.Invalid,
            })}
            type={'text'}
            value={value}
            placeholder={placeholder}
            onChange={({ target: { value } }) => onChange(value)}
        />
    );
};

export default Input;
