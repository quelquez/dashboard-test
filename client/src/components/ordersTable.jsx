import React, { useState, useEffect, useMemo, } from "react";
import { AllCommunityModule, colorSchemeDark, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const ordersTable = () => {
  const [rowData, setRowData] = useState([]);

  const [colDefs] = useState([
    { field: "id", headerName: "ID",},
    { field: "user_id",  headerName: "ID пользователя"},
    { field: "total", headerName: "Итого" },
    { field: "created_at", headerName: "Дата создания заказа"},
    { field: "status", headerName: "Статус заказа" },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/orders/")
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

export default ordersTable;
