import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { EventsDataTable } from "../components/table/EventsDataTable.jsx";

const citySelectItems = [
  { name: "Victor Smorgan", code: "1" },
  { name: "L1", code: "2" },
  { name: "Coolabah", code: "3" },
  { name: "Schroders", code: "4" },
  { name: "Centaur", code: "5" },
];

let minDate = new Date();
// we started recording analytics in February
minDate.setDate(1);
minDate.setMonth(1);
minDate.setFullYear(2023);

let maxDate = new Date();
const Events = () => {
  const [pool, setPool] = useState(null);
  const [datesRange, setDatesRange] = useState(undefined);

  return (
    <>
      <div className="card">
        <div className="p-fluid grid grid-flow-row">
          <div className="col-12">
            <h1 className="pt-2 pl-5 text-3xl font-bold text-blue-600">
              Pool events export
            </h1>
          </div>
          <div className="pt-4 pl-3">
            <div className="flex">
              <div className="pl-4">
                <span className="p-float-label">
                  <Dropdown
                    inputId="pool"
                    value={pool}
                    className="w-16rem"
                    options={citySelectItems}
                    onChange={(e) => setPool(e.value)}
                    optionLabel="name"
                  />
                  <label htmlFor="pool">Pool</label>
                </span>
              </div>
              <div className="pl-3">
                <span className="p-float-label">
                  <Calendar
                    id="range"
                    value={datesRange}
                    className="w-14rem"
                    onChange={(e) => {
                      if (e && e.value) {
                        setDatesRange(e.value);
                      }
                    }}
                    selectionMode="range"
                    dateFormat="dd/mm/yy"
                    minDate={minDate}
                    maxDate={maxDate}
                    readOnlyInput
                  />
                  <label htmlFor="range">Date range</label>
                </span>
              </div>
            </div>
            <div className="p-4">
              <EventsDataTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
