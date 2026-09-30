import { 
    TableContainer,
    StyledTable,
    TableHeaderRow,
    TableHeader,
    TableRow,
    TableCell
} from "./styled";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableRow = Record<string, any>;

interface TableColumn {
    header: string;
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, row: TableRow) => React.ReactNode;
}

interface TableProps {
    columns: TableColumn[];
    data: TableRow[];
}

const Table = ({ columns, data }: TableProps): React.ReactElement => {
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