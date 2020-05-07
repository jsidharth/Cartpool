import React, { Component } from "react";

class OrderConfirmed extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="card shadow">
            <div className="card-body">
              <span className="badge badge-success float-right">
                Order placed
              </span>
              <h5 className="card-title">Order #12412</h5>

              <h6 className="card-subtitle mb-2 text-muted">
                13:00hrs 30Jul2020 | Walmart | Total $120
              </h6>
              <hr />
              <div className="row">
                <div className="col-3 float-left ">
                  <div className="card ">
                    <div className="card-header">#1232</div>
                    <div className="card-body ">
                      <h5 className="card-title">walmart</h5>
                      <p className="card-text">
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-3 float-left ">
                  <div className="card ">
                    <div className="card-header">#1232</div>
                    <div className="card-body ">
                      <h5 className="card-title">walmart</h5>
                      <p className="card-text">
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-3 float-left ">
                  <div className="card ">
                    <div className="card-header">#1232</div>
                    <div className="card-body ">
                      <h5 className="card-title">walmart</h5>
                      <p className="card-text">
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                        <span className="badge badge-info m-1">Milk</span>
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div className="row mt-4">
                <div className="col">
                  <button className="btn btn-secondary btn-block">
                    Place your order in pool
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-primary btn-block">
                    Pickup your order along with 4 orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default OrderConfirmed;
