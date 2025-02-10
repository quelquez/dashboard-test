import React, { useState, useEffect, useMemo, } from "react";
import { AllCommunityModule, colorSchemeDark, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const usersTable = () => {
  const [rowData, setRowData] = useState([]);

  const [colDefs] = useState([
    { field: "id", headerName: "ID",},
    { field: "username",  headerName: "Логин"},
    { field: "name", headerName: "Имя" },
    { field: "birth_date", headerName: "Дата рождения"},
    { field: "registration_date", headerName: "Дата регистрации" },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/users/")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const defaultColDef = useMemo(() => ({
    filter: true,
    editable: true,
  }));

    return (
        <div style={{width: "100%", height: "100%" }}>
      <AgGridReact
        theme={colorSchemeDark}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
      />
    </div>
    );
};

export default usersTable;