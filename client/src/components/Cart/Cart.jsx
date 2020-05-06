import React, { Component } from "react";

class Cart extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="card mt-5">
          <div className="card-header">
            Cart{" "}
            <span className="float-right badge badge-primary">Walmart</span>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row">
                <div className="col">Product Name</div>
                <div className="col-2">
                  <small>1lb</small>
                </div>
                <div className="col-2">
                  <button className="btn btn-light btn-sm mr-1">-</button>2
                  <button className="btn btn-light btn-sm ml-1">+</button>
                </div>
                <div className="col-2">$22</div>
                <button className="btn btn-danger btn-sm float-right">X</button>
              </div>
            </li>

            <li className="list-group-item">
              <div className="row">
                <div className="col">Product Name</div>
                <div className="col-2">
                  <small>1lb</small>
                </div>
                <div className="col-2">
                  <button className="btn btn-light btn-sm mr-1">-</button>2
                  <button className="btn btn-light btn-sm ml-1">+</button>
                </div>
                <div className="col-2">$22</div>
                <button className="btn btn-danger btn-sm float-right">X</button>
              </div>
            </li>

            <li className="list-group-item">
              <div className="row text-right">
                <div className="col">Tax@9.25%</div>
                <div className="col-2 ">$23.12</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row text-right">
                <div className="col">convenience fee@0.5%</div>
                <div className="col-2 ">$2.2</div>
              </div>
            </li>
          </ul>
          <div className="card-body text-right">
            <h2 className="">Total $120</h2>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary btn-block">Place Order</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
