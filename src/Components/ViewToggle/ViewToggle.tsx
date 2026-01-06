import { LayoutGrid, Table } from "lucide-react";
import { ToggleContainer, ToggleButton } from "./styled";

interface ViewToggleProps {
    view: 'cards' | 'table';
    onViewChange: (view: 'cards' | 'table') => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
    return (
        <ToggleContainer>
            <ToggleButton 
                $active={view === 'cards'} 
                onClick={() => onViewChange('cards')}
            >
                <LayoutGrid style={{ width: 20, height: 20 }} />
                Карточки
            </ToggleButton>
            <ToggleButton 
                $active={view === 'table'} 
                onClick={() => onViewChange('table')}
            >
                <Table style={{ width: 20, height: 20 }} />
                Таблица
            </ToggleButton>
        </ToggleContainer>
    );
};

export default ViewToggle;