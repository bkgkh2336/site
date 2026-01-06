import { Folder } from "lucide-react";
import H2 from "../../../Components/H2/H2";
import { DocumentGroup, Document } from "../Documents";
import { ListGroup_, GroupButton, DocumentCount } from "./styled";

interface ListGroupProps {
    groups: DocumentGroup[];
    documents: Document[];
    searchQuery: string;
    selectedGroup: DocumentGroup | undefined;
    setSelectedGroup: (group: DocumentGroup) => void;
}

const ListGroup = (props: ListGroupProps) => {
    const getDocumentCount = (groupId: number) => {
        return props.documents.filter(doc => {
            const matchesGroup = doc.id_group === groupId;
            const matchesSearch = props.searchQuery === "" || 
                doc.name.toLowerCase().includes(props.searchQuery.toLowerCase());
            return matchesGroup && matchesSearch;
        }).length;
    };

    return (
        <ListGroup_>
            <H2>Категории</H2>
            {props.groups && props.groups.map((group, i) => {
                const count = getDocumentCount(group.id);
                return (
                    <GroupButton
                        key={i}
                        $isActive={props.selectedGroup?.id === group.id}
                        onClick={() => props.setSelectedGroup(group)}
                    >
                        <Folder style={{ width: 20, height: 20 }} />
                        <span>{group.name}</span>
                        <DocumentCount $isActive={props.selectedGroup?.id === group.id}>
                            {count}
                        </DocumentCount>
                    </GroupButton>
                );
            })}
        </ListGroup_>
    )
}

export default ListGroup
