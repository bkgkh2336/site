import { ReactNode } from "react";
import { TableWrapper, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from "./styled";

interface InfoTableProps {
    headers: string[];
    rows: ReactNode[][];
}

const InfoTable = ({ headers, rows }: InfoTableProps) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHeaderCell key={index}>{header}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};

export default InfoTable;