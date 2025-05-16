import React from 'react';

type DrawerWaveProps = {
    className?: string;
    fill?: string;
};

const DrawerWave: React.FC<DrawerWaveProps> = ({
                                                   className = 'w-full h-auto',
                                                   fill = '#6BCBA0',
                                               }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="317"
        height="133"
        viewBox="0 0 317 133"
        fill="none"
        aria-hidden="true"
        focusable="false"
    >
        <path
            d="M57.7978 19.9908C34.6411 27.7102 15.8505 38.1591 -6.10352e-05 50.3829V133H317V20.8819C236.861 -4.55409 144.592 -8.94247 57.7978 19.9908Z"
            fill={fill}
        />
    </svg>
);

export default DrawerWave;