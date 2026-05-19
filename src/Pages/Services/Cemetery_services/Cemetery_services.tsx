import { FileText, Download } from "lucide-react";
import H1 from "../../../Components/H1/H1";
import { 
    CemeteryContainer,
    CemeteryHeader,
    SearchContainer,
    SearchInput,
    DocumentsList,
    DocumentCard,
    DocumentIcon,
    DocumentInfo,
    DocumentName,
    DocumentMeta,
    DocumentAction
} from "./styled";
import { useState } from "react";

interface CemeteryFile {
    id: number;
    name: string;
    path: string;
    type: string;
}

const cemeteryFiles: CemeteryFile[] = [
    {
        id: 1,
        name: "Гражданские кладбища",
        path: "/cemetries/гражданские кладбища.docx",
        type: "DOCX документ"
    },
    {
        id: 2,
        name: "График удаления коммунальных отходов (Приложение 3.1)",
        path: "/cemetries/график удаления коммуналоьных отходов Приложение 3.1.docx",
        type: "DOCX документ"
    },
    {
        id: 3,
        name: "Карта-схема мест временного хранения коммунальных отходов (Приложение 4)",
        path: "/cemetries/Приложение 4  Карта-схема мест временного хранения коммунальных отходов карта.xlsx",
        type: "XLSX документ"
    },
    {
        id: 4,
        name: "Описание схемы",
        path: "/cemetries/Описание схемы.docx",
        type: "DOCX документ"
    },
    {
        id: 5,
        name: "Приложение 4.4 Сведения о конкретных днях и промежутках времени следования специального транспорта, осуществляющего вывоз коммунальных отходов на объекты сортировки по каждому населенному пункту (месту временного хранения),садоводческому товариществу, дачному и гаражному кооперативу",
        path: "/cemetries/Приложение 4.4.docx",
        type: "DOCX документ"
    },
    {
        id: 6,
        name: "Приложение 4.5 Сведения о конкретных днях и промежутках времени следования специального транспорта, осуществляющего вывоз коммунальных отходов на объект захоронения",
        path: "/cemetries/Приложение 4.5.docx",
        type: "DOCX документ"
    }
];

const Cemetery_services = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleDownload = (e: React.MouseEvent, path: string, name: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        const link = document.createElement('a');
        link.href = path;
        link.download = name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredFiles = cemeteryFiles.filter(file =>
        searchQuery === "" || file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <CemeteryHeader>
                <H1>Документы по обращению с отходами</H1>
                <SearchContainer>
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <SearchInput
                        type="text"
                        placeholder="Поиск документов..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchContainer>
            </CemeteryHeader>
            <CemeteryContainer>
                <DocumentsList>
                    {filteredFiles.map((file) => (
                        <DocumentCard 
                            key={file.id} 
                            href={file.path} 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DocumentIcon>
                                <FileText />
                            </DocumentIcon>
                            <DocumentInfo>
                                <DocumentName>{file.name}</DocumentName>
                                <DocumentMeta>{file.type}</DocumentMeta>
                            </DocumentInfo>
                            <DocumentAction onClick={(e) => handleDownload(e, file.path, file.name)}>
                                <Download />
                            </DocumentAction>
                        </DocumentCard>
                    ))}
                </DocumentsList>
            </CemeteryContainer>
        </>
    );
};

export default Cemetery_services;
