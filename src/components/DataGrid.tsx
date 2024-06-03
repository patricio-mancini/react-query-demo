import styled from 'styled-components';
import { colorPalette } from '../utils/theme';
import { formatNumber } from '../utils/formatting';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #333;
  font-size: .85rem;
`;

const Th = styled.th<{ width: string, $alignEnd?: boolean  }>`
  border-bottom: 2px solid ${colorPalette.lightGrey};
  padding: 1em;
  text-align: left;
  background-color: #f4f4f4;
  width: ${(props) => props.width};
  text-align: ${(props) => (props.$alignEnd ? 'end' : 'start')};
`;

const Td = styled.td<{ $alignEnd?: boolean }>`
  border-bottom: 1px solid ${colorPalette.lightGrey};
  padding: 1em;
  text-align: ${(props) => (props.$alignEnd ? 'end' : 'start')};
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${colorPalette.secondary};
  }
`;

interface Row {
  [key: string]: any;
}

interface DataGridProps {
  data: Row[];
}

const columns = [
  { header: 'Planet ID', width: '10%' },
  { header: 'Planet Name', width: '10%' },
  { header: 'Total ICS Transactions', width: '12%', alignEnd: true },
  { header: 'Total ICS Amount', width: '12%', alignEnd: true },
  { header: 'Cumulative Amount (ICS)', width: '18%', alignEnd: true },
  { header: 'Cumulative Amount (GCS)', width: '18%', alignEnd: true },
  { header: 'Rate', width: '12%', alignEnd: true },
];

export default function DataGrid({ data }: DataGridProps) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map(({ header, width, alignEnd }) => (
            <Th key={header} width={width} $alignEnd={alignEnd}>
              {header}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <Tr key={item.planet.id}>
            <Td>{item.planet.id}</Td>
            <Td>{item.planet.name}</Td>
            <Td $alignEnd>{formatNumber(item.totalICSTransactions, 4)}</Td>
            <Td $alignEnd>{formatNumber(item.totalICSAmount, 4)}</Td>
            <Td $alignEnd>{formatNumber(item.allTxTotalAmountInICS, 4)}</Td>
            <Td $alignEnd>{formatNumber(item.allTxTotalAmountInGCS, 4)}</Td>
            <Td $alignEnd>{formatNumber(item.rate, 4)}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};
