import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
}
export function Label({ text, ...props }: LabelProps) {
    return (
        <label {...props} className="font-semibold">
            {text}
        </label>
    );
}
