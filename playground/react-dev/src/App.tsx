import './App.css';
import { SdTable, type SdTableColumn } from '@stencil-test/react';

interface TableRow {
 id: number;
 name: string;
 age: number;
 location: string;
}

function App() {
 const TABLE_COLUMNS: SdTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'center', width: '80px' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  {
   name: 'age',
   label: 'Age',
   field: 'age',
   align: 'right',
   format: (value: number) => `${value} years`,
  },
  { name: 'location', label: 'Location', field: 'location', align: 'left' },
  {
   name: 'actions',
   label: 'Actions',
   field: '',
   align: 'center',
   width: '150px',
  },
 ];

 const TABLE_ROWS: TableRow[] = [
  { id: 1, name: 'Alice', age: 30, location: 'New York' },
  { id: 2, name: 'Bob', age: 25, location: 'San Francisco' },
  { id: 3, name: 'Charlie', age: 35, location: 'Chicago' },
  { id: 4, name: 'Diana', age: 28, location: 'Los Angeles' },
  { id: 5, name: 'Ethan', age: 32, location: 'Seattle' },
 ];

 return (
  <>
   {/* <div style={{ margin: '20px 0' }}>
     <SdButton label="Click Me" />
    </div>

    <div style={{ margin: '20px 0' }}>
     <SdInput placeholder="Enter text..." />
    </div>

    <div style={{ margin: '20px 0' }}>
     <SdCheckbox label="Check me" />
    </div> */}
   <div className="table">
    <SdTable
     columns={TABLE_COLUMNS}
     rows={TABLE_ROWS}
     bodyCellRenderer={(column, row) => {
      if (column.name === 'name') {
       return `<b>${row.name}</b>`;
      }
     }}
     resizable
     pagination={{
      page: 2,
      rowsPerPage: 50,
      lastPage: 10,
     }}
    ></SdTable>
   </div>
  </>
 );
}

export default App;
