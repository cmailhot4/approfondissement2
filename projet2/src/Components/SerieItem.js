import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

// css
import '../css/SerieItem.css';

class SerieItem extends Component {
  // Call la méthode onClickSerie du composant App.js
  handleClick = () => {
    this.props.clickSerie(this.props.id);
  }

  // Call la méthode onClickModifier du composant App.js
  handleModifier = () => {
    this.props.clickModifier(this.props.id);
  }

  // Call la méthode onClickSupprimer du composant App.js
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
        <td>
          <Button className="boutonAction" variant="success" onClick={this.handleModifier}>Modifier</Button>
          <Button className="boutonAction" variant="danger" onClick={this.handleSupprimer}>Supprimer</Button>
        </td>
      </tr>
    );
  }
}

export default SerieItem;