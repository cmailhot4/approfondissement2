import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

class SerieFiche extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serie: []
    }
  }

  // Appel à l'api pour sortir les données d'une série à l'aide de son id
  componentDidMount() {
    const url = 'http://localhost:9000/api/' + this.props.id;
    fetch(url)
      .then((res) => res.json())
      .then(res => {
        this.setState({
          serie: res.data[0],
        });
      })
      .catch(err => err);
  }

  render() {
    const { clickBoutonRetour } = this.props;
    const { nom, cote, nbSaisons, description, plateforme } = this.state.serie;

    return (
      <div className="fiche">
        <h1>{nom}</h1>
        <h5>Cote: {cote}</h5>
        <h5>Saisons: {nbSaisons}</h5>
        <p className="resume">{description}</p>
        <h5>Disponible sur: {plateforme}</h5>
        <Button variant="primary" onClick={clickBoutonRetour}>Revenir à la liste</Button>
      </div>
    );
  }
}

export default SerieFiche;