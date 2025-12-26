import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    title = null,
    subtitle = null,
    image = null,
    actions = null,
    hover = true,
    glass = false,
    className = '',
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {}}
            transition={{ duration: 0.3 }}
            className={`card bg-base-100 shadow-xl ${glass ? 'glass-card' : ''} ${className}`}
            {...props}
        >
            {image && (
                <figure>
                    <img src={image} alt={title || 'Card image'} className="w-full h-48 object-cover" />
                </figure>
            )}
            <div className="card-body">
                {title && <h2 className="card-title">{title}</h2>}
                {subtitle && <p className="text-base-content/70">{subtitle}</p>}
                {children}
                {actions && <div className="card-actions justify-end mt-4">{actions}</div>}
            </div>
        </motion.div>
    );
};

export default Card;
