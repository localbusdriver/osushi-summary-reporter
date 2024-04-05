import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

function DoubleOrders({ resultState, setResultState, fs }) {
  const [file, setFile] = useState(resultState);
  const [results, setResults] = useState(resultState);
  const [fontSize, setFontSize] = useState(fs);

  useEffect(() => {
    setFontSize(fs.toString() + "px");
  }, [fs]);

  const handleFileChange = (e) => {
    const fullFile = e.target.files[0];
    console.log("Reading File...");
    if (fullFile) {
      console.log("File", true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setFile(text);
      };
      reader.readAsText(fullFile);
    }
  };

  useEffect(() => {
    if (!file) setResults({ 1: { noDoubles: "Please Upload File" } });
    if (typeof file === "string" && file.trim().length > 0) {
      const lines = file.split("\n").map((line) => line.split(","));
      lines.shift();

      let res = {};
      // Member:0, Location:1, Item:6, Quantity:10, Organization:22
      lines.forEach((line, i) => {
        if (line[10] > 1) {
          const member = line[0];
          const location = line[1];
          const item = line[6];
          const quantity = line[10];
          const organization = line[22];
          res[i] = {
            member: member,
            roomNumber: location,
            item: item,
            quantity: quantity,
            organization: organization,
          };
        }
      });
      setResults(res);
      setResultState(res);
    }
  }, [file]);

  return (
    <div className="mt-5">
      <Row>
        <Col>
          <div className="left-content">
            <div className="double-orders">
              <label className="form-label fs-5" htmlFor="customFile">
                Upload a <span className="highlight">CSV</span> or{" "}
                <span className="highlight">Excel File</span> file&nbsp;
              </label>
              <br />
              <input
                type="file"
                id="customFile"
                className="form-control w-auto"
                accept=".csv, application/vnd.ms-excel, .xlsx, .xls"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </Col>
        <Col>
          <div className="results">
            <Card style={{ width: "80%", height: "50vh", overflow: "hidden" }}>
              <Card.Title
                style={{
                  textAlign: "center",
                  paddingTop: "2%",
                  fontWeight: "bold",
                }}
              >
                Results
                <hr />
              </Card.Title>
              <Card.Body
                style={{
                  height: "100%",
                  overflowY: "auto",
                  fontSize: fontSize,
                }}
              >
                {Object.entries(results).map(([key, result]) => (
                  <div key={key}>
                    <p>
                      {result.member ? (
                        <span>
                          <span className="fw-bold text-primary">
                            Member:&nbsp;
                          </span>
                          {result.member}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p>
                      {result.roomNumber ? (
                        <span>
                          <span className="fw-bold text-info">
                            Room no:&nbsp;
                          </span>
                          {result.roomNumber}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p>
                      {result.item ? (
                        <span>
                          <span className="fw-bold text-success">
                            Item:&nbsp;
                          </span>
                          {result.item}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p>
                      {result.organization ? (
                        <span>
                          <span className="fw-bold text-warning">
                            Organization:&nbsp;
                          </span>
                          {result.organization}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p>
                      {result.quantity ? (
                        <span>
                          <span className="fw-bold text-secondary">
                            Quantity:&nbsp;
                          </span>
                          {result.quantity}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    {result.noDoubles ? (
                      <h6
                        style={{
                          fontSize: "20px",
                          marginTop: "5%",
                          textAlign: "center",
                        }}
                      >
                        {result.noDoubles}
                      </h6>
                    ) : (
                      ""
                    )}
                    <hr />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DoubleOrders;
