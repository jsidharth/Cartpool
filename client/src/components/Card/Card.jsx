import React, { Component } from "react";
import poolLogo from "./../../assets/carpool.jpg";

class Card extends Component {
  state = {};
  render() {
    const { id, name, desc, count, logoUrl, buttonText } = this.props;
    return (
      <div className="card poolcard shadow">
        <img
                  src={logoUrl}
                  className="card-img"
                  max-width="100%"
                  height="180px"
                  alt="..."
                />
        {/* <img src={logoUrl || poolLogo} className="card-img-top" alt="..." /> */}
        <div className="card-body">
          {name ? <h5 className="card-title">{name}</h5> : null}
          {desc ? (
            <h6 className="card-subtitle mb-2 text-muted">
              {desc}
            </h6>
          ) : null}
          {count ? <p className="card-text">{count}</p> : null}
          {buttonText ? (
            <button
              type="button"
              className="btn btn-primary float-right"
              onClick={() => this.props.buttonAction(id, name)}
            >
              {buttonText || "Click me"}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Card;
