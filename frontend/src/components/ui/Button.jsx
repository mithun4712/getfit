import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon = null,
    onClick,
    type = 'button',
    disabled = false,
    loading = false,
    className = '',
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        outline: 'btn-outline',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
    };

    const sizes = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            className={`btn ${variants[variant]} ${sizes[size]} ${className} ${variant === 'primary' ? 'btn-glow' : ''
                }`}
            {...props}
        >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            {icon && !loading && <span className="mr-2">{icon}</span>}
            {children}
        </motion.button>
    );
};

export default Button;
