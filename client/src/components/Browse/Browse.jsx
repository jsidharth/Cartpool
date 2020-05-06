import React, { Component } from "react";
import requireAuth from "../RequireAuth/RequireAuth";
import Card from "../Card/Card";

class Browse extends Component {
  state = {
    stores: [
      {
        id: "1",
        name: "Costco",
        desc: "101 San Fernando",
        imageUrl: "",
        buttonText: "Shop",
      },
      {
        id: "2",
        name: "Safeway",
        desc: "101 San Fernando",
        imageUrl: "",
        buttonText: "Shop",
      },
      {
        id: "3",
        name: "Walmart",
        desc: "101 San Fernando",
        imageUrl: "",
        buttonText: "Shop",
      },
    ],
  };
  goToStoreDetail = (id) => {
    this.props.history.push("/store/detail/");
  };

  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <h1 className="display-4">Stores</h1>
        <div className="row justify-content-around">
          {this.state.stores && this.state.stores.length
            ? this.state.stores.map((store) => {
                return (
                  <div className="col-3 float-left">
                    <Card {...store} buttonAction={this.goToStoreDetail} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Browse;
// export default requireAuth(Pool);
