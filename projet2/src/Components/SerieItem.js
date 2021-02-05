import React, { Component } from "react";

class SerieItem extends Component {
  handleClick = () => {
    this.props.clickSerie(this.props.id);
  }

  render() {
    const { id, nom, cote, nbSaisons, description, plateforme} = this.props;
    return (
      <tr key={id}>
        <td className="nom" onClick={this.handleClick}>{nom}</td>
        <td>{cote}</td>
        <td>{nbSaisons}</td>
        <td>{plateforme}</td>
        <td>Boutons à mettre ici</td>
      </tr>
    );
  }
}

export default SerieItem;