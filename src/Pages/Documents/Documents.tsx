import { useEffect, useState } from "react"
import { Documents_, DocumentsHeader, SearchContainer, SearchInput } from "./styled"
import { GetData } from "../../functions"
import ListGroup from "./ListGroup/ListGroup"
import { ListDocuments } from "./ListDocuments/ListDocuments"
import Loading from "../../Components/Loading/Loading"
import H1 from "../../Components/H1/H1"
import { Search } from "lucide-react"

export interface DocumentGroup {
    id: number
    name: string
}

export interface Document {
    id: number
    name: string
    id_group: number
    src: string
}

const Documents = () => {
    const [groups, setGroups] = useState<DocumentGroup[]>();
    const [documents, setDocuments] = useState<Document[]>();
    const [selectedGroup, setSelectedGroup] = useState<DocumentGroup>();
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true);
        try {
            const groups_ = await GetData('documents_group');
            const documents_ = await GetData('documents');
            setGroups(groups_);
            setDocuments(documents_);
            setSelectedGroup(groups_[0]);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }



    const filteredDocuments = documents?.filter(document => {
        const matchesGroup = document.id_group === selectedGroup?.id;
        const matchesSearch = searchQuery === "" || 
            document.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGroup && matchesSearch;
    });

    return (
        <>
            <DocumentsHeader>
                <H1>Документы</H1>
                <SearchContainer>
                    <Search className="search-icon" style={{ width: 20, height: 20, color: '#28a745' }} />
                    <SearchInput
                        type="text"
                        placeholder="Поиск документов..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchContainer>
            </DocumentsHeader>
            <Documents_>
                {loading && <Loading />}
                {!loading && groups && documents && (
                    <>
                        <ListGroup
                            selectedGroup={selectedGroup}
                            groups={groups}
                            documents={documents}
                            searchQuery={searchQuery}
                            setSelectedGroup={setSelectedGroup}
                        />
                        <ListDocuments
                            documents={filteredDocuments}
                        />
                    </>
                )}
            </Documents_>
        </>
    )
}

export default Documents