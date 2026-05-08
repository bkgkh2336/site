import { useState, useRef, useEffect } from "react";
import { Eye } from "lucide-react";
import AccessibilityPanel from "../AccessibilityPanel/AccessibilityPanel";
import { 
    Container, 
    AccessibilityButton
} from "./styled";

const FixedLanguageSelector = () => {
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsAccessibilityOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Container ref={containerRef}>
            <AccessibilityButton 
                onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
                aria-label="Версия для слабовидящих"
                title="Версия для слабовидящих"
            >
                <Eye size={20} />
            </AccessibilityButton>
            
            <AccessibilityPanel 
                isOpen={isAccessibilityOpen} 
                onClose={() => setIsAccessibilityOpen(false)} 
            />
        </Container>
    );
};

export default FixedLanguageSelector;
