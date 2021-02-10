import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

class SerieItem extends Component {
  handleClick = () => {
    this.props.clickSerie(this.props.id);
  }

  handleSupprimer = () => {
    this.props.clickSupprimer(this.props.id);
  }

  render() {
    const { id, nom, cote, nbSaisons, plateforme} = this.props;
    return (
      <tr key={id}>
        <td className="nom" onClick={this.handleClick}>{nom}</td>
        <td>{cote}</td>
        <td>{nbSaisons}</td>
        <td>{plateforme}</td>
        <td><Button variant="danger" onClick={this.handleSupprimer}>Supprimer</Button></td>
      </tr>
    );
  }
}

export default SerieItem;