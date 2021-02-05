import React, { Component } from "react";

class SerieItem extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { nom, cote, nbSaisons, description, plateforme } = this.props;
    return (
      <tr key={nom}>
        <td>{nom}</td>
        <td>{cote}</td>
        <td>{nbSaisons}</td>
        <td>{description}</td>
        <td>{plateforme}</td>
        <td>Boutons à mettre ici</td>
      </tr>
    );
  }
}

export default SerieItem;