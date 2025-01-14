import React, { useState } from "react";
import data from "./data";
import './style.css'

const Accordian = () => {
  const [single, setSingle] = useState(null);
  const [multi, setMulti] = useState([]);
  const [btnMultiSelection, setbtnMultiSelection] = useState(false);

  const handleSingleSelection = (currentId) => {
    console.log(currentId);

    setSingle(currentId === single ? null : currentId);
  };

  const handleMultipleSelection = (currentId) => {
    let cpyMulti = [...multi];
    const index_of = cpyMulti.indexOf(currentId);

    console.log('Current Multi Selection Before:', cpyMulti); // Debugging state
    if (index_of === -1) {
      cpyMulti.push(currentId);
    } else {
      cpyMulti.splice(index_of, 1);
    }
    console.log('Current Multi Selection After:', cpyMulti); // Debugging state

    setMulti(cpyMulti);
  };

  return (
    <div>
      <button onClick={() => setbtnMultiSelection(!btnMultiSelection)}>
        Enable Multi Selection
      </button>
      {data && data.length > 0 ? (
        data.map((dataItem, Index) => (
          <div key={Index} className="item">
            <div
              onClick={
                btnMultiSelection
                  ? () => handleMultipleSelection(dataItem.id)
                  : () => handleSingleSelection(dataItem.id)
              }
              className={`title ${btnMultiSelection && multi.includes(dataItem.id) ? 'active' : ''} ${!btnMultiSelection && single === dataItem.id ? 'active' : ''}`}
            >
              <h3>{dataItem.question}</h3>
              <span>+</span>
            </div>
            {single === dataItem.id || (btnMultiSelection && multi.includes(dataItem.id)) ? <div>{dataItem.answer}</div> : null}
          </div>
        ))
      ) : (
        <div>No Data Found!</div>
      )}
    </div>
  );
};

export default Accordian;
