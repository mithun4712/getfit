import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({
    title,
    value,
    icon,
    trend = null,
    color = 'primary',
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
            <div className="card-body">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-base-content/70 text-sm font-medium mb-1">{title}</p>
                        <h3 className="text-3xl font-bold">{value}</h3>
                        {trend && (
                            <p className={`text-sm mt-2 ${trend > 0 ? 'text-success' : 'text-error'}`}>
                                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
                            </p>
                        )}
                    </div>
                    <div className={`${color === 'primary' ? 'text-primary bg-primary/10' :
                            color === 'accent' ? 'text-accent bg-accent/10' :
                                color === 'success' ? 'text-success bg-success/10' :
                                    color === 'warning' ? 'text-warning bg-warning/10' :
                                        color === 'info' ? 'text-info bg-info/10' :
                                            'text-gray-500 bg-gray-500/10'
                        } p-3 rounded-lg`}>
                        {icon}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
