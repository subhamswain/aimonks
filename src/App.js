import React, { useState } from 'react';
import './App.css'; // Add your CSS styles here
import { useTable } from 'react-table';

function DataTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Sn',
        accessor: 'sn',
      },
      {
        Header: 'Patient Name',
        accessor: 'patientName',
      },
      {
        Header: 'Doctor Name',
        accessor: 'doctorName',
      },
      {
        Header: 'Hospital Name',
        accessor: 'hospitalName',
      },
      {
        Header: 'Booking Status',
        accessor: 'bookingStatus',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <button onClick={() => handleViewDetails(row.original)}>View Details</button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const [selectedRowDetails, setSelectedRowDetails] = useState(null);

  const handleViewDetails = (data) => {
    setSelectedRowDetails(data);
  };

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedRowDetails && (
        <div className="modal">
          <div className="modal-content">
            <h2>Details</h2>
            <p>Patient Name: {selectedRowDetails.patientName}</p>
            <p>Doctor Name: {selectedRowDetails.doctorName}</p>
            <p>Hospital Name: {selectedRowDetails.hospitalName}</p>
            <p>Booking Status: {selectedRowDetails.bookingStatus}</p>
            <button onClick={() => setSelectedRowDetails(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const data = [
    {
      sn: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      hospitalName: 'City Hospital',
      bookingStatus: 'Confirmed',
    },
    {
      sn: 2,
      patientName: 'Jane Doe',
      doctorName: 'Dr. Johnson',
      hospitalName: 'Community Clinic',
      bookingStatus: 'Pending',
    },
    // Add more data objects here
  ];

  return (
    <div className="App">
      <h1>Patient Appointments</h1>
      <DataTable data={data} />
    </div>
  );
}

export default App;
