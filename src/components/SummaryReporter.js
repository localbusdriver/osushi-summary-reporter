import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SummaryReporter({ resultState, setResultState, fs }) {
  const [orders, setOrders] = useState("");
  const [results, setResults] = useState(resultState);
  const [fontSize, setFontSize] = useState(fs);

  useEffect(() => {
    setFontSize(fs.toString() + "px");
  }, [fs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orders.trim().length > 0) {
      let final = {};
      orders.split("\n").forEach((line, i) => {
        const parts = line.split("\t");
        if (parts.length > 1) {
          const numOfOrders = parseInt(parts.shift());
          const temp = parts[0].split("-");
          const item = temp[0].trim();
          const match = temp[1].match(/\d+/);
          const numOfPieces = match ? parseInt(match[0], 10) : 0;

          const pieces = numOfOrders * numOfPieces;
          const rolls = pieces / 10;

          if (final["Total Rolls"]) final["Total Rolls"] += rolls;
          else final["Total Rolls"] = rolls;

          if (final["Total Pieces"]) final["Total Pieces"] += pieces;
          else final["Total Pieces"] = pieces;

          if (final[item]) {
            final[item].rolls += rolls;
            final[item].pieces += pieces;
          } else {
            final[item] = { rolls: rolls, pieces: pieces };
          }
        }
      });

      console.log(final);
      setResults(final);
      setResultState(final);
    }
  };

  return (
    <div className="mt-5">
      <Row>
        <Col>
          <div className="left-content">
            <Form className="m-3">
              <Form.Label className="fs-5 fw-bold">Paste the Report</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Paste Report"
                rows={10}
                style={{ width: "80%", border: "1px solid #dee2e6" }}
                onChange={(e) => setOrders(e.target.value)}
              />
              <Button
                className="mt-4 w-25 fs-5"
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col>
          <div className="results">
            <br />
            <Card style={{ width: "80%", overflow: "hidden", margin: "10px" }}>
              <Card.Title
                style={{
                  textAlign: "center",
                  paddingTop: "2%",
                  marginBottom: 0,
                  fontWeight: "bold",
                }}
              >
                Results
                <hr />
              </Card.Title>

              <Card.Body
                style={{
                  overflowY: "auto",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Table
                  striped
                  bordered
                  hover
                  className="m-0"
                  style={{ fontSize: fontSize }}
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>Item</th>
                      <th>Rolls</th>
                      <th>Pieces</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(results).map(([item, obj]) =>
                      item !== "Total Rolls" && item !== "Total Pieces" ? (
                        <tr key={item}>
                          <td>{item ? item : ""}</td>
                          <td>
                            {obj.rolls ? Math.round(obj.rolls * 10) / 10 : ""}
                          </td>
                          <td>{obj.pieces ? obj.pieces : ""}</td>
                        </tr>
                      ) : (
                        ""
                      )
                    )}
                    <tr className="fw-bold">
                      <td>Total</td>
                      <td>
                        {results["Total Rolls"]
                          ? Math.round(results["Total Rolls"] * 10) / 10
                          : ""}
                      </td>
                      <td>
                        {results["Total Pieces"] ? results["Total Pieces"] : ""}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default SummaryReporter;
