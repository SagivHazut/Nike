import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

export default function WebUsers() {
  const [cardsArr, setCardsArr] = useState([]);
  const URL = "http://localhost:8181/api/users/";

  useEffect(() => {
    axios
      .get("/users/allUsers")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {});
  }, []);

  const handleDeleteCard = (id) => {
    axios.delete(`${URL}${id}`).then((res) => {
      const newCardsArr = cardsArr.filter((item) => item._id !== id);
      setCardsArr(newCardsArr);
    });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Users</h1>
      <table className="table">
        <thead className="table table-bordered table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Created At:</th>
            <th scope="col">Admin?</th>
            <th scope="col">Editing</th>
          </tr>
        </thead>
        <tbody>
          {cardsArr.map((item, index) => (
            <tr key={index}>
              <th scope="row" className="table-dark">
                {index}
              </th>
              <td>{item.name} </td>
              <td>{item.email} </td>
              <td>{item.password}</td>
              <td>{item.createdAt}</td>
              <td>{item.biz.toString()}</td>
              <td>
                <div>
                  <Button
                    style={{ marginTop: 2 }}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteCard(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
