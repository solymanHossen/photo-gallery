import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useRef,
} from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

export default forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
        const localRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                type={type}
                className={
                    'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                    className
                }
                ref={ref || localRef}
            />
        );
    }
);
