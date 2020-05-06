import React, { Component } from "react";

class OrderDv extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            <span className="badge badge-success float-right">
              Order placed
            </span>
            <h5 className="card-title">Order #12412</h5>

            <h6 className="card-subtitle mb-2 text-muted">
              13:00hrs 30Jul2020 | Walmart | Total $120
            </h6>
            <table class="table mt-2">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Qnty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Milk</td>
                  <td>Kirkland</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Milk</td>
                  <td>Kirkland</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Milk</td>
                  <td>Kirkland</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
            <p className="card-subtitle text-muted float-left">
              Order Picked By Qwerty
            </p>
            <button className="btn btn-danger float-right ">
              Not delivered
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderDv;
