import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface EditableContentProps {
    id: string;
    type: 'text' | 'image' | 'heading';
    initialValue: string;
    onSave?: (value: string) => void;
    className?: string;
    children?: React.ReactNode;
}

export default function EditableContent({
    id,
    type,
    initialValue,
    onSave,
    className = '',
    children,
}: EditableContentProps) {
    const { isEditing } = useAuth();
    const [isLocalEditing, setIsLocalEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        onSave?.(value);
        setIsLocalEditing(false);
        localStorage.setItem(`content_${id}`, value);
    };

    const handleCancel = () => {
        setValue(initialValue);
        setIsLocalEditing(false);
    };

    if (!isEditing) {
        if (type === 'text' || type === 'heading') {
            return <div className={className}>{value || children}</div>;
        }
        if (type === 'image') {
            return <img src={value} alt="" className={className} />;
        }
        return null;
    }

    if (isLocalEditing) {
        return (
            <div className="editable-content-editor" data-content-id={id}>
                {(type === 'text' || type === 'heading') && (
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="editable-textarea"
                        style={{ minHeight: type === 'heading' ? '50px' : '100px' }}
                    />
                )}
                {type === 'image' && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter image URL"
                        className="editable-input"
                    />
                )}
                <div className="editable-buttons">
                    <button onClick={handleSave} className="editable-save">
                        Save
                    </button>
                    <button onClick={handleCancel} className="editable-cancel">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`editable-content ${className}`}
            data-content-id={id}
            onDoubleClick={() => setIsLocalEditing(true)}
        >
            {type === 'text' || type === 'heading' ? (
                <div className="editable-text-wrapper">
                    {value || children}
                    <span className="edit-hint">double-click to edit</span>
                </div>
            ) : (
                <div className="editable-image-wrapper">
                    <img src={value} alt="" className={className} />
                    <span className="edit-hint">double-click to edit</span>
                </div>
            )}
        </div>
    );
}
