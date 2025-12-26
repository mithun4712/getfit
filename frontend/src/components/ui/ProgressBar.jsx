import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
    value,
    max = 100,
    type = 'linear',
    color = 'primary',
    size = 'md',
    label = null,
    showPercentage = true,
    className = '',
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colors = {
        primary: 'progress-primary',
        secondary: 'progress-secondary',
        accent: 'progress-accent',
        success: 'progress-success',
        warning: 'progress-warning',
        error: 'progress-error',
    };

    const sizes = {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
    };

    if (type === 'circular') {
        const circularSizes = {
            xs: 'w-12 h-12',
            sm: 'w-16 h-16',
            md: 'w-24 h-24',
            lg: 'w-32 h-32',
        };

        return (
            <div className={`flex flex-col items-center ${className}`}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative"
                >
                    <div
                        className={`radial-progress text-${color} ${circularSizes[size]}`}
                        style={{ '--value': percentage, '--size': '100%', '--thickness': '4px' }}
                    >
                        {showPercentage && <span className="text-sm font-bold">{Math.round(percentage)}%</span>}
                    </div>
                    <div className="pulse-ring absolute bg-primary/20"></div>
                </motion.div>
                {label && <p className="mt-2 text-sm font-medium">{label}</p>}
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            {(label || showPercentage) && (
                <div className="flex justify-between items-center mb-2">
                    {label && <span className="text-sm font-medium">{label}</span>}
                    {showPercentage && <span className="text-sm font-bold">{Math.round(percentage)}%</span>}
                </div>
            )}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
            >
                <progress
                    className={`progress ${colors[color]} ${sizes[size]} w-full`}
                    value={value}
                    max={max}
                />
            </motion.div>
        </div>
    );
};

export default ProgressBar;
