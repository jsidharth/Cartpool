import React, { Component } from "react";
import Card from "../Card/Card";

class BrowsePool extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    showJoinPoolOptModal: false,
    pools: [
      {
        id: "1",
        name: "Pool 1",
        desc: "101 San Fernando",
        count: "3 members",
        imageUrl: "",
        buttonText: "Join Pool",
      },
      {
        id: "2",
        name: "Pool 2",
        desc: "101 San Fernando",
        count: "4 members",
        imageUrl: "",
        buttonText: "Join Pool",
      },
      {
        id: "3",
        name: "Pool 3",
        desc: "101 San Fernando",
        count: "4 members",
        imageUrl: "",
        buttonText: "Join Pool",
      },
    ],
  };
  render() {
    return (
      <div>
        {/* TODO: Style this heading */}
        <h1 className="display-4">Pools</h1>
        <div className="row justify-content-around">
          {this.state.pools && this.state.pools.length
            ? this.state.pools.map((pool) => {
                return (
                  <div className="col-3 float-left">
                    <Card {...pool} buttonAction={this.handleJoinClick}/>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default BrowsePool;
