import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { EventsService } from "../../service/EventsService";
import { FilterMatchMode, FilterOperator } from "primereact/api";
export const EventsDataTable = () => {
  const [events, setEvents] = useState([]);

  const dt = useRef(null);

  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [filters1, setFilters1] = useState(null);

  const columns = [
    {
      field: "eventType",
      header: "Event type",
    },
    {
      field: "timestamp",
      header: "Date and time",
    },
    {
      field: "firstName", //access nested data with dot notation
      header: "First name",
    },
    {
      field: "lastName",
      header: "Last name",
    },
    {
      field: "email", //normal field
      header: "Email",
    },

    {
      field: "productName",
      header: "Product name",
    },
    {
      field: "mediaTitle",
      header: "Media title",
    },
    {
      field: "attachmentLabel",
      header: "Attachment",
    },
    {
      field: "pageName",
      header: "Page name",
    },
    {
      field: "campaignName",
      header: "Campaign",
    },
  ];
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        sortable
        header={col.header}
        filter
      />
    );
  });

  useEffect(() => {
    EventsService.getEvents().then((data) => setEvents(data));
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      eventType: { value: null, matchMode: FilterMatchMode.CONTAINS },
      timestamp: { value: null, matchMode: FilterMatchMode.CONTAINS },
      firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
      lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      productName: { value: null, matchMode: FilterMatchMode.CONTAINS },
      mediaTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
      attachmentLabel: { value: null, matchMode: FilterMatchMode.CONTAINS },
      pageName: { value: null, matchMode: FilterMatchMode.CONTAINS },
      campaignName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1("");
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(events);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  useEffect(() => {
    EventsService.getEvents().then((data) => {
      setEvents(data);
      setLoading1(false);
    });
    initFilters1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const header = (
    <div className="grid grid-flow-row justify-content-between">
      <div className="grid grid-flow-row gap-2 m-2">
        <div>
          <Button
            type="button"
            label="CSV"
            icon="pi pi-file"
            onClick={exportCSV}
          />
        </div>
        <div>
          <Button
            type="button"
            label="Excel"
            icon="pi pi-file-excel"
            className="p-button-success"
            onClick={exportExcel}
          />
        </div>
      </div>
      <div className="grid grid-flow-row justify-end gap-2 m-2 left-0">
        <div>
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear filters"
            className="p-button-outlined mr-2"
            onClick={clearFilter1}
          />
        </div>
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue1}
              onChange={onGlobalFilterChange1}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card">
      <DataTable
        value={events}
        className="text-sm"
        size="small"
        ref={dt}
        // dataKey=""
        filters={filters1}
        filterDisplay="menu"
        globalFilterFields={[
          "eventType",
          "timestamp",
          "firstName",
          "lastName",
          "email",
          "productName",
          "mediaTitle",
          "attachmentLabel",
          "pageName",
          "campaignName",
        ]}
        emptyMessage="No events found."
        loading={loading1}
        header={header}
        // showGridlines
        paginator
        removableSort
        sortMode="multiple"
        responsiveLayout="stack"
        breakpoint="1577px"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};
