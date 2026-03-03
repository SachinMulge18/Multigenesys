/* eslint-disable no-unused-vars */
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo, useState } from "react";

const EmployeeTable = ({
  employees = [],
  getCountryName,
  onDelete,
  onEdit,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Paginated Data
  const paginatedEmployees = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return employees.slice(startIndex, startIndex + rowsPerPage);
  }, [employees, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const openDeleteDialog = (id) => {
    setToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    if (toDeleteId != null) onDelete?.(toDeleteId);
    closeDeleteDialog();
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: "none",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        padding: 1,
      }}
    >
      <TableContainer sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
                Mobile
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
                Country
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <TableRow
                  key={emp.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ py: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.light", fontSize: 12,   }}>
                        {emp.name
                          ?.split(" ")
                          .map((n) => n?.[0])
                          .filter(Boolean)
                          .slice(0, 2)
                          .join("")}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 ,}}>{emp.name}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 0.8 }}>
                    <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                      {emp.email}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 0.8 }}>
                    <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                      {emp.mobile}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 0.8 }}>
                    <Chip
                      label={emp.country}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 12 }}
                    />
                  </TableCell>

                  <TableCell sx={{ py: 0.8 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => onEdit(emp.id)}
                        sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => openDeleteDialog(emp.id)}
                        sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Employees Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={employees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={confirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EmployeeTable;

// const EmployeeTable = ({ employees, getCountryName, onDelete, onEdit }) => {
//   return (
//     <>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Mobile</TableCell>
//                 <TableCell>Country</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {employees?.map((emp) => (
//                 <TableRow key={emp.id}>
//                   <TableCell>{emp.name}</TableCell>
//                   <TableCell>{emp.email}</TableCell>
//                   <TableCell>{emp.mobile}</TableCell>
//                   <TableCell>{emp.country}</TableCell>

//                   <TableCell>
//                     <Button onClick={() => onEdit(emp.id)}>Edit</Button>
//                     <Button color="error" onClick={() => onDelete(emp.id)}>
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </>
//   );
// };

// export default EmployeeTable;
