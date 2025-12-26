import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label = null,
    type = 'text',
    placeholder = '',
    error = null,
    icon = null,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">{label}</span>
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
                        {icon}
                    </span>
                )}
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={`input input-bordered w-full ${icon ? 'pl-10' : ''} ${error ? 'input-error' : ''
                        } ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
