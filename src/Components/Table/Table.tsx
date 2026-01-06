import { 
    TableContainer,
    StyledTable,
    TableHeaderRow,
    TableHeader,
    TableRow,
    TableCell
} from "./styled";

interface TableColumn {
    header: string;
    key: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
    columns: TableColumn[];
    data: any[];
}

const Table = ({ columns, data }: TableProps) => {
    return (
        <TableContainer>
            <StyledTable>
                <TableHeaderRow>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHeader key={index}>{column.header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHeaderRow>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex}>
                                    {column.render 
                                        ? column.render(row[column.key], row) 
                                        : row[column.key]
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default Table;