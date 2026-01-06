import { FileText, Download, FileX } from "lucide-react";
import { Document } from "../Documents";
import { 
    ListDocuments_, 
    DocumentCard, 
    DocumentIcon, 
    DocumentInfo, 
    DocumentName, 
    DocumentMeta, 
    DocumentAction,
    EmptyState 
} from "./styled";

interface ListDocumentsProps {
    documents: Document[] | undefined;
}

export const ListDocuments = (props: ListDocumentsProps) => {
    const handleDownload = (e: React.MouseEvent, src: string, name: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        const link = document.createElement('a');
        link.href = src;
        link.download = name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!props.documents || props.documents.length === 0) {
        return (
            <ListDocuments_ style={{height: '100%', margin: 'auto'}}>
                <EmptyState>
                    <FileX />
                    <h3>Документы не найдены</h3>
                    <p>В этой категории пока нет документов</p>
                </EmptyState>
            </ListDocuments_>
        );
    }

    return (
        <ListDocuments_>
            {props.documents.map((document, i) => (
                <DocumentCard 
                    key={i} 
                    href={document.src} 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <DocumentIcon>
                        <FileText />
                    </DocumentIcon>
                    <DocumentInfo>
                        <DocumentName>{document.name}</DocumentName>
                        <DocumentMeta>PDF документ</DocumentMeta>
                    </DocumentInfo>
                    <DocumentAction onClick={(e) => handleDownload(e, document.src, document.name)}>
                        <Download />
                    </DocumentAction>
                </DocumentCard>
            ))}
        </ListDocuments_>
    )
}