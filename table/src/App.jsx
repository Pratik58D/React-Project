import "./App.css";
// import Statictable from './component/Statictable'
import { useTable, useSortBy, usePagination } from "react-table";

import {data} from "./data.json"

// const data = [
//   { id: 1, name: "pratik devkota", age: 23 },
//   { id: 2, name: "prakash shahi", age: 22 },
//   { id: 3, name: "Aayush skp", age: 24 },
//   { id: 4, name: "Naren Magar", age: 24 },
// ];

const columns = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "name",
    accessor: "name",
  },
  {
    Header: "Age",
    accessor: "age",
  },
];

function App() {
  const { 
    getTableProps, 
    getTableBodyProps,
     headerGroups,
      page, 
      prepareRow,
      nextPage,
      previousPage, 
      canPreviousPage,
      canNextPage,
      state:{pageIndex},
      pageCount,
      gotoPage

    } = useTable(
        { 
          columns,
           data ,
           initialState :{pageSize : 11}
          }, 
          useSortBy,
           usePagination);

  return (
    <>
      {/* <Statictable /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render("Header")}
                  {
                    column.isSorted && <span>{column.isSortedDesc ? " ⬆️": " ⬇️"}</span>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button">
        <button disabled={pageIndex === 0} onClick={()=>gotoPage(0)}>first page</button>
        <button  disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
        <span>{pageIndex+1} Of {pageCount}</span>
        <button disabled={!canNextPage} onClick={nextPage}>Next</button>
        <button disabled={pageIndex === pageCount-1} onClick={()=> gotoPage(pageCount-1)}>last page</button>
      </div>
    </>
  );
}

export default App;
