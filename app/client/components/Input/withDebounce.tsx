import React, { FunctionComponent, ComponentType, EventHandler } from "react";
import Input, { InputProps } from "./index";

interface InputWithDebounce extends InputProps {
    onDebounce(inputText: string): void
}

const withDebounce = (
    debounceTimeout: number
): FunctionComponent<InputWithDebounce> => {

    let typeDebounce: NodeJS.Timeout = null;

    return (props: InputWithDebounce) => (
        <Input {...props} onChange={(value: string) => {
            props.onChange(value)
            clearTimeout(typeDebounce);
            typeDebounce = setTimeout(() => {
                props.onDebounce(value);
            }, debounceTimeout);
        }} />
    )
}

export default withDebounce;