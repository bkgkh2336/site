interface FlagSvgProps {
    country: 'ru' | 'by' | 'gb';
    style?: React.CSSProperties;
}

const FLAGS: Record<string, React.ReactElement> = {
    ru: (
        <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="200" fill="#FFFFFF" />
            <rect y="200" width="900" height="200" fill="#0039A6" />
            <rect y="400" width="900" height="200" fill="#D52B1E" />
        </svg>
    ),
    by: (
        <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="400" fill="#C8313E" />
            <rect y="400" width="900" height="200" fill="#4AA657" />
        </svg>
    ),
    gb: (
        <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="600" fill="#012169" />
            <path d="M0,0 L900,600 M900,0 L0,600" stroke="#FFFFFF" strokeWidth="120" />
            <path d="M0,0 L900,600 M900,0 L0,600" stroke="#C8102E" strokeWidth="80" />
            <path d="M450,0 L450,600 M0,300 L900,300" stroke="#FFFFFF" strokeWidth="200" />
            <path d="M450,0 L450,600 M0,300 L900,300" stroke="#C8102E" strokeWidth="120" />
        </svg>
    ),
};

const FlagSvg = ({ country, style }: FlagSvgProps) => {
    return (
        <div style={{ width: '24px', height: '18px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0, ...style }}>
            {FLAGS[country]}
        </div>
    );
};

export default FlagSvg;
