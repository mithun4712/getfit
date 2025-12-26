import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1, className = '' }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className={`card bg-base-200 shadow-xl ${className}`}>
                        <div className="card-body">
                            <div className="skeleton h-6 w-2/3 mb-2"></div>
                            <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-4/5"></div>
                        </div>
                    </div>
                );

            case 'text':
                return (
                    <div className={`space-y-2 ${className}`}>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-3/4"></div>
                    </div>
                );

            case 'avatar':
                return (
                    <div className={`flex items-center space-x-4 ${className}`}>
                        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            <div className="skeleton h-4 w-1/2"></div>
                            <div className="skeleton h-3 w-3/4"></div>
                        </div>
                    </div>
                );

            case 'image':
                return (
                    <div className={`skeleton h-48 w-full ${className}`}></div>
                );

            case 'stat':
                return (
                    <div className={`card bg-base-200 shadow-md ${className}`}>
                        <div className="card-body">
                            <div className="skeleton h-8 w-20 mb-2"></div>
                            <div className="skeleton h-5 w-32"></div>
                        </div>
                    </div>
                );

            default:
                return <div className={`skeleton h-20 w-full ${className}`}></div>;
        }
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={count > 1 ? 'mb-4' : ''}>
                    {renderSkeleton()}
                </div>
            ))}
        </>
    );
};

export default LoadingSkeleton;
