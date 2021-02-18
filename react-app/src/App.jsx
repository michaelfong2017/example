import React, { lazy, Suspense, useState, useEffect } from "react";
import "./styles/app.scss";
import * as d3 from "d3";

const NavBar = lazy(() => import("./components/NavBar"))

const Scatterplot = lazy(() => import("./components/Scatterplot"));

const App = (props) => {
  // React hooks with common state values for all components
  const [dataUrl, setDataUrl] = useState(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_jiTlHFOZzByz7pPiBiho4jhtoYTIAXm4VZJz3mnSSjI7fo-wv0eB1GKVos3XsK-HOoqhw876N0CP/pub?gid=1897012944&single=true&output=csv"
  );
  const [data, setData] = useState(null);
  const [selectedLegislator, setSelectedLegislator] = useState(null);

  //function that will hook into the state to change it
  function updateLegislator(legislator) {
    setSelectedLegislator(legislator);
  }

  const updateDataUrl = () => {
    setDataUrl(document.getElementById("data_url").value);
  };

  const fetchData = (dataUrl) => {
    if (process.env.NODE_ENV !== 'production') {
      // not for production
      console.log("yoyo")
    }
    d3.csv(dataUrl, function (error, d) {
      if (error) {
        console.log(error);
        setData([]);
        console.log(data);
      } else {
        setData(d); // set State
        console.log(data);
      }
    });
  };

  useEffect(() => {
    fetchData(dataUrl);
  }, [dataUrl]);

  return (
    <div class="column">
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </Suspense>

      <input id="data_url" type="text" placeholder="Data url" />
      <button style={{ marginBottom: "5px" }} onClick={updateDataUrl}>
        Submit data url
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <Scatterplot data={data} onChangeLegislator={updateLegislator} />
      </Suspense>
      <p>{data && selectedLegislator && data[selectedLegislator] ? "Legislator " + data[selectedLegislator]['name_ch'] : data ? "No legislator selected" : "Loading..."}</p>
    </div>
  );
};

export default App;
