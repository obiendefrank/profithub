import React, { useState, useEffect } from 'react';
import './profit-hub-loader.scss';

const ProfitHubLoader = () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        'Connecting to Deriv API',
        'Initializing market data',
        'Setting up data from servers',
        'Connecting accounts',
        'Finalizing setup',
    ];

    useEffect(() => {
        let stepTimer: NodeJS.Timeout;
        let progressTimer: NodeJS.Timeout;

        const updateStep = (stepIndex: number) => {
            setCurrentStep(stepIndex);

            // Calculate target progress for this step
            const targetProgress = Math.floor(((stepIndex + 1) / steps.length) * 100);

            // Animate progress to target
            progressTimer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= targetProgress) {
                        clearInterval(progressTimer);
                        return targetProgress;
                    }
                    return prev + 2;
                });
            }, 30);
        };

        // Start first step immediately
        updateStep(0);

        // Progress through remaining steps
        let currentStepIndex = 0;
        stepTimer = setInterval(() => {
            currentStepIndex++;
            if (currentStepIndex >= steps.length) {
                clearInterval(stepTimer);
                setProgress(100);
            } else {
                updateStep(currentStepIndex);
            }
        }, 1200);

        return () => {
            clearInterval(stepTimer);
            clearInterval(progressTimer);
        };
    }, []);

    return (
        <div className='profit-hub-loader'>
            <div className='profit-hub-loader__content'>
                {/* Logo and Title */}
                <div className='profit-hub-loader__header'>
                    <div className='profit-hub-loader__logo'>
                        <div className='profit-hub-loader__logo-icon'>
                            <span className='profit-hub-loader__dollar'>$</span>
                        </div>
                    </div>
                    <h1 className='profit-hub-loader__title'>Profit Hub</h1>
                    <p className='profit-hub-loader__subtitle'>
                        Smart Analysis, High Accuracy Signals, Trading Automation
                    </p>
                    <p className='profit-hub-loader__status'>Setting up your trading environment...</p>
                </div>

                {/* Progress Bar */}
                <div className='profit-hub-loader__progress-container'>
                    <div className='profit-hub-loader__progress-bar'>
                        <div
                            className='profit-hub-loader__progress-fill'
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className='profit-hub-loader__progress-percentage'>{progress}%</div>
                </div>

                {/* Initialization Progress */}
                <div className='profit-hub-loader__steps'>
                    <h3 className='profit-hub-loader__steps-title'>Initialization Progress</h3>
                    <div className='profit-hub-loader__steps-list'>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`profit-hub-loader__step ${index <= currentStep ? 'profit-hub-loader__step--active' : ''
                                    } ${index < currentStep ? 'profit-hub-loader__step--complete' : ''}`}
                            >
                                <div className='profit-hub-loader__step-icon'>
                                    {index < currentStep ? (
                                        <svg width='16' height='16' viewBox='0 0 16 16'>
                                            <path
                                                d='M13.5 4L6 11.5L2.5 8'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                fill='none'
                                            />
                                        </svg>
                                    ) : (
                                        <div className='profit-hub-loader__step-spinner' />
                                    )}
                                </div>
                                <span className='profit-hub-loader__step-text'>{step}</span>
                                {index === currentStep && <span className='profit-hub-loader__step-loading'>Loading...</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact & Support */}
                <div className='profit-hub-loader__footer'>
                    <h3 className='profit-hub-loader__footer-title'>Contact & Support</h3>
                    <div className='profit-hub-loader__contact'>
                        <div className='profit-hub-loader__contact-item'>
                            <span className='profit-hub-loader__contact-label'>Email</span>
                            <a href='mailto:franglineobiende@gmail.com' className='profit-hub-loader__contact-link'>
                                franglineobiende@gmail.com
                            </a>
                        </div>
                        <div className='profit-hub-loader__contact-item'>
                            <span className='profit-hub-loader__contact-label'>WhatsApp</span>
                            <a href='https://wa.me/+254115549500' className='profit-hub-loader__contact-link'>
                                +254115549500
                            </a>
                        </div>
                    </div>
                    <p className='profit-hub-loader__support'>24/7 Support Available</p>
                    <div className='profit-hub-loader__branding'>
                        <span className='profit-hub-loader__powered-by'>Powered By</span>
                        <span className='profit-hub-loader__deriv'>Deriv</span>
                    </div>
                    <p className='profit-hub-loader__disclaimer'>
                        © 2026-2027 Profit Hub. All rights reserved.
                        <br />
                        Trading involves risk. Use signals responsibly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfitHubLoader;
