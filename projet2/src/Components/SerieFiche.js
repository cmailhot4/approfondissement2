import React, { Component } from "react";

class SerieFiche extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serie: []
    }
  }

  // Appel à l'api pour sortir les données d'une série à l'aide de son id
  componentWillMount() {
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
    const {id, clickBouton} = this.props;
    const { nom, cote, nbSaisons, description, plateforme } = this.state.serie;

    return (
      <div className="fiche">
        <h1>{nom}</h1>
        <h4>Cote: {cote} - Nombre de saisons: {nbSaisons}</h4>
        <p>{description}</p>
        <h4>Disponible sur: {plateforme}</h4>
        <button className="bouton" onClick={clickBouton}>Revenir à la liste</button>
      </div>
    );
  }
}

export default SerieFiche;