import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper
  } from "@material-ui/core";

export default function DataGrid(props) {
    const {columns, rows, totalData, rowsPerPage, page, setPage, setRowsPerPage} = props
    return (
        <div style={{ height: "100%", width: '100%' }} className="dataGrid">
            <TableContainer component={Paper} style={{height: "100%"}}>
                <Table aria-label="simple table">
                    <TableHead className="tableHead">
                        <TableRow>
                        {columns.map((row) => {
                            return <TableCell className="table-cell" align={row.align || "left"}>{row.headerName}</TableCell>
                        })}
                        </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {rows.map((res, i) => {
                        return (  
                          <TableRow key={1}>
                            {columns.map(row => {
                              if(row.renderCell){
                                return (
                                  <TableCell component="th" scope="row" align={row.align}>
                                    {row.renderCell(res)}
                                  </TableCell>
                                  )
                              } else {
                                return <TableCell component="th" scope="row">{res[row.field]}</TableCell>
                              }
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!props.disablePannging && <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalData}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(e, val) => setPage(val)}
              onChangeRowsPerPage={(e) => setRowsPerPage(e.target.value)}
            />}
        </div>
    )
}

DataGrid.defaultProps = {
    columns : [],
    rows : [],
    totalData : 0,
    rowsPerPage : 1,
    page : 1,
    setPage : null,
    setRowsPerPage : null
}