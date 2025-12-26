import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const Modal = ({
    isOpen,
    onClose,
    title = null,
    children,
    actions = null,
    size = 'md',
    className = '',
}) => {
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <div className="modal modal-open z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`modal-box ${sizes[size]} ${className}`}
                        >
                            {title && (
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-2xl">{title}</h3>
                                    <button
                                        onClick={onClose}
                                        className="btn btn-sm btn-circle btn-ghost"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <div className="py-4">
                                {children}
                            </div>

                            {actions && (
                                <div className="modal-action">
                                    {actions}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
