import { useEffect, useState } from 'react';

interface DisplayContentProps {
    id: string;
    type: 'text' | 'image';
    defaultValue: string;
    className?: string;
}

export default function DisplayContent({
    id,
    type,
    defaultValue,
    className = ''
}: DisplayContentProps) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem(`content_${id}`);
        if (saved) {
            setValue(saved);
        }
    }, [id]);

    if (type === 'text') {
        return <div className={className}>{value}</div>;
    }

    if (type === 'image') {
        return <img src={value} alt="" className={className} />;
    }

    return null;
}
