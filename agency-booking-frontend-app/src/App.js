import React, { useCallback, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const data = [];

export const states = [
  'Pending',
  'Confirmed',
  'Declined'
];

function getCurrentDate() {
  let date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = String(date.getFullYear());
  return yyyy + "-" + mm + "-" + dd;
}

const handleUpdateReservation = async (values) => {
  try {
    let res = await fetch("http://localhost:8080/hotel-system/booking/update", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    await res.json();

    if (res.status === 200) {
      alert("Booking updated successfully");
    } else {
      alert("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};

function App() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState({});

  React.useEffect(() => {
    const loadReservations = async () => {
      const response = await fetch(
        'http://localhost:8080/hotel-system/booking/findAll');
      const data = await response.json();

      setTableData(data);
    }

    // Call the function
    loadReservations();
  }, []);

  const handleCreateNewRow = async (values) => {
    try {
      let res = await fetch("http://localhost:8080/hotel-system/booking/create", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      let resJson = await res.json();
      values.id = resJson.id;
      tableData.push(values);
      setTableData([...tableData]);

      if (res.status === 200) {
        alert("Booking created successfully");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      handleUpdateReservation(values);
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const showConfirm = (row) => { 
      setDeleteRow(row);
      setConfirmModalOpen(true);
  };

  const handleDeleteRow = async () => {
    try {
      let res = await fetch("http://localhost:8080/hotel-system/booking/delete", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deleteRow.original),
      });

      await res.json();

      tableData.splice(deleteRow.index, 1);
      setTableData([...tableData]);

      if (res.status === 200) {
        alert("Booking deleted successfully");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 10,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableColumnOrdering: false
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        size: 15,
        enableEditing: true, //disable editing on this column
        enableSorting: false,
        enableColumnOrdering: false,
        type: "date"
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        size: 15,
        enableColumnOrdering: false,
        type: "date"
      },
      {
        accessorKey: 'roomType',
        header: 'Room Type',
        size: 15,
        enableColumnOrdering: false
      },
      {
        accessorKey: 'nights',
        header: 'Nights',
        size: 10,
        enableColumnOrdering: false
      },
      {
        accessorKey: 'adults',
        header: 'Adults',
        enableColumnOrdering: false,
        size: 10
      },
      {
        accessorKey: 'children',
        header: 'Children',
        size: 10,
        enableColumnOrdering: false
      },
      {
        accessorKey: 'requests',
        header: 'Requests',
        size: 140,
        enableColumnOrdering: false
      },
      {
        accessorKey: 'requirements',
        header: 'Requirements',
        enableColumnOrdering: false,
        size: 140
      },
      {
        accessorKey: 'entryDate',
        header: 'Entry Date',
        enableColumnOrdering: false,
        size: 20
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableColumnOrdering: false,
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          )),
        },
      },
    ],
    [],
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Agency Hotel Reservations
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => showConfirm(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              New Reservation
            </Button>
          )}
        />
      </Box>
      <CreateNewReservationModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />

      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onSubmit={handleDeleteRow}
      />

    </>
  );
};

export const CreateNewReservationModal = ({ open, columns, onClose, onSubmit }) => {
  const [startDate, setStartDate] = React.useState(getCurrentDate());
  const [endDate, setEndDate] = React.useState(getCurrentDate());

  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here

    values.startDate = startDate;
    values.entryDate = getCurrentDate();
    values.endDate = endDate;
    values.status = "Pending";

    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">New Reservation</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <TextField fullWidth key={"startDate"} label="Start Date" type={"date"}
              variant="standard" margin='dense'
              name={"startDate"}
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />

            <TextField fullWidth key={"endDate"} label="End Date" type={"date"}
              variant="standard" margin='dense'
              name={"endDate"}
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />

            <TextField fullWidth key={"nights"} label="Nights" type={"number"}
              variant="standard" margin='dense'
              name={"nights"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }}
            />

            <FormControl variant="standard" sx={{ m: 1, minWidth: 520 }}>
              <InputLabel id="roomType">Room Type</InputLabel>
              <Select fullWidth
                labelId="roomType"
                id="roomType"
                key={"roomType"}
                //value={roomType}
                name={"roomType"}
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
                label="Room Type">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Double'}>Double</MenuItem>
                <MenuItem value={'Deluxe'}>Deluxe</MenuItem>
                <MenuItem value={'Standard'}>Standard</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth key={"adults"} label="Adults" type={"number"}
              variant="standard" margin='dense'
              name={"adults"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }}
            />

            <TextField fullWidth key={"children"} label="Children" type={"number"}
              variant="standard" margin='dense'
              name={"children"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }}
            />

            <TextField fullWidth key={"requests"} label="Special Requests" type={"text"}
              variant="standard" margin='dense'
              name={"requests"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }}
            />

            <TextField fullWidth key={"requirements"} label="Requirements" type={"text"}
              variant="standard" margin='dense'
              name={"requirements"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save Reservation
        </Button>
      </DialogActions>
    </Dialog>
  );
};



export const ConfirmModal = ({ open, onClose, onSubmit }) => {

  const handleDelete = () => {
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Confirm delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete reservation
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleDelete} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default App;
