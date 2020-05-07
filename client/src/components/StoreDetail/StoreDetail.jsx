import React, { Component } from "react";
import ProductCard  from './../ProductCard/ProductCard';

class StoreDetail extends Component {
  state = {
    products: [
        {
          id: "1",
          name: "Milk",
          desc: "2% Milk",
          price: 10,
          unit: "1lb",
          brand: "Kirkland"
        },
        {
            id: "2",
            name: "Milk 2",
            desc: "2% Milk",
            price: 10,
            unit: "1lb",
            brand: "Kirkland"
        },
        {
            id: "3",
            name: "Milk 3",
            desc: "2% Milk",
            price: 10,
            unit: "1lb",
            brand: "Kirkland"
        },
      ]

  };
  render() {
    return (
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-4">
            <img
              src="https://1.img-dpreview.com/files/p/E~C0x0S1012x759T1200x900~articles/1270164160/CostCo.jpeg"
              class="rounded float-left img-thumbnail"
              alt="..."
            />
          </div>
          <div className="col-8">
            <div className="row m-2">
              <label className="col-sm-4 col-form-label font-weight-bold">
                Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  disabled
                  className="form-control-plaintext"
                  id="staticEmail"
                  value="Costco"
                />
              </div>
            </div>
            <div className="row m-2">
              <label className="col-sm-4 col-form-label font-weight-bold">
                Street
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  disabled
                  className="form-control-plaintext"
                  id="staticEmail"
                  value="101 East"
                />
              </div>
            </div>
            <div className="row m-2">
              <label className="col-sm-4 col-form-label font-weight-bold">
                City
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  disabled
                  className="form-control-plaintext"
                  id="staticEmail"
                  value="San Jose"
                />
              </div>
            </div>
            <div className="row m-2">
              <label className="col-sm-4 col-form-label font-weight-bold">
                State
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  disabled
                  className="form-control-plaintext"
                  id="staticEmail"
                  value="California"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row m-3 justify-content-center font-weight-bold">
            Available products
        </div>
        <div className="row justify-content-around">
        {this.state.products && this.state.products.length
            ? this.state.products.map((product) => {
                return (
                  <div className="col-3 float-left">
                    <ProductCard {...product} storeId={this.props.store.id} storeName={this.props.storeName}/>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default StoreDetail;
