import {
    ReactNode,
    useRef,
    MutableRefObject
  } from "react";
import Table, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Checkbox, IconButton, TableHead } from "@mui/material";
import LoadingTable from "../loadingTable/index";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmptyResponse from "../EmptyResponse/index";
import DropDownWrapper from "../DropDownWrapper";
import './style.scss'
import ErrorMsg from "../ErrorMsg";



type Props = {
    headCells: Array<{
      key: string;
      name: string;
    }>;
    isLoading?: Boolean;
    scrollX?: Boolean;
    scrollY?: Boolean;
    isError?: Boolean;
    maxHeight?: string;
    tableData?: any;
    showHead?: boolean;
    tableHeader?: ReactNode;
    handleClick?: any;
    emptyImg?: any;
    getRowIndex?: any;
    activeRowClass?: boolean;
  };

  const headCellTest = [
    {
      key: "name",
      name: "Full Name",
    },
    {
      key: "email",
      name: "Email Address",
    },
    {
      key: "number",
      name: "Phone Number",
    },
    {
      key: "links",
      name: "Links created",
    },
    {
      key: "date",
      name: "Date joined",
    },
  ];

  export default function TableComponent({
    tableData = Array(7)
      .fill("")
      .map((_, i) => ({
        name: "Jacob Jones",
        number: "(405) 555-0128",
        email: "deanna.curtis@example.com",
        role: "01/01/2020",
        action: "",
        id: `row_${i}`,
      })),
    showHead = true,
    headCells = headCellTest,
    handleClick,
    getRowIndex,
    activeRowClass,
    isError,
    isLoading,
    scrollX = true,
    scrollY = false,
    maxHeight = "350px",
    tableHeader,
    emptyImg,
    ...props
  }: Props & TableProps) {
    const tableRef = useRef() as MutableRefObject<HTMLDivElement>;
  

  
    if (isLoading) {
      return <LoadingTable />;
    }
    if (isError) {
        return <ErrorMsg error='Error!!' />;
      }
  
    return (
      <Box
        className="table-box"
        sx={{
          width: "100%",
          overflow: scrollY && !scrollX ? "hidden" : "auto",
        }}
      >
        <TableContainer
          className="scrollbar-style my-table"
          sx={{
            maxHeight: scrollY ? maxHeight : "unset",
            minWidth: tableData.length > 0 && scrollX ? 1000 : "unset",
          }}
          ref={tableRef}
        >
          {tableHeader}
          <Table {...props} aria-labelledby="tableTitle">
            {showHead && (
              <TableHead
                className="rounded-xl"
                sx={{
                  "& th:first-of-type": {
                    borderRadius: "4px 0 0 4px",
                  },
                  "& th:last-of-type": {
                    borderRadius: "0 4px 4px 0",
                    textAlign: "right",
                  },
                  "& th": {
                    border: "none",
                  },
                }}
              >
                <TableRow hover={false}>
               
                  {headCells.map((headCell, i) => (
                    <TableCell
                      className="truncate"
                      key={headCell.key}
                      align={"left"}
                      padding={"normal"}
                    >
                      {headCell.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {tableData.length <= 0 && (
                <TableRow hover={false}>
                  <TableCell colSpan={headCells.length + 1}>
                    <EmptyResponse message={"No record found"} image={emptyImg} />
                  </TableCell>
                </TableRow>
              )}
              {tableData?.map((row: any, rowIndex: number) => {
                return (
                  <TableRow
                    sx={{
                      "& td:last-child": {
                        textAlign: "right",
                      },
                    }}
                    tabIndex={-1}
                    key={`table-row-${rowIndex}`}
                    onClick={(e: any) => {
                      if (handleClick) {
                        if (e.target.tagName === "INPUT") {
                        } else {
                          handleClick(row, rowIndex);
                        }
                      }
                    }}
                  >
                 
                    {headCells
                      .filter((col) => col.key !== "actions")
                      .map((col, colIndex) => (
                        <TableCell
                          className={`${colIndex === 0 ? "pd-checkbox" : ""} ${
                            col.key === "action" ? "td-checkbox" : ""
                          } truncate`}
                          sx={{ fontWeight: 600, color: "inherit" }}
                          align="left"
                          key={`-row_${rowIndex}-col_${colIndex}`}
                        >
                          {row[col.key]}
                        </TableCell>
                      ))}
  
                    {row?.actions && (
                      <TableCell
                        sx={{
                          "& .MuiButton-root": {
                            color: "inherit",
                          },
                        }}
                        className="td-checkbox"
                      >
                        <DropDownWrapper
                          className="more-actions"
                          extraClick={() => {
                            setTimeout(() => {
                              tableRef.current.scroll({
                                top: tableRef.current.scrollHeight + 500,
                                left: tableRef.current.scrollWidth + 500,
                                behavior: "smooth",
                              });
                            }, 300);
                          }}
                          action={
                            <IconButton
                              className="more-action-btn"
                              aria-label="actions"
                            >
                              <MoreHorizIcon />
                            </IconButton>
                          }
                        >
                          {row?.actions}
                        </DropDownWrapper>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
       
        </TableContainer>
      </Box>
    );
  }
  