interface Props {
    text: string;
    htmlFor: string;
    id: string;
    name: string;
    placeholder: string;
    type: string;
}

import { Label } from "./Label/Label";
import { Input } from "./Input/Input";

const Text = (props: Props) => {
    return (
        <>
            <Label text={props.text} htmlFor={props.htmlFor} />
            <Input
                id={props.id}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
            />
        </>
    );
};
const Field = { Text };

export default Field;
