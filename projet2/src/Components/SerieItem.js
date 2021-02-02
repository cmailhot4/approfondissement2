import React, { Component } from "react";

class SerieItem extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { nom, cote, nbSaisons, description, plateforme } = this.props;
    return (
      <div>
        <span>{nom}</span>
        <span>{cote}</span>
      </div>
    );
  }
}

export default SerieItem;