import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';

class FormModifier extends Component {
  constructor(props) {
    super(props)

    const { nom, cote, nbSaisons, plateforme, description } = this.props;

    this.state = {
      nom: nom,
      cote: cote,
      nbSaisons: nbSaisons,
      plateforme: plateforme,
      description: description
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Met à jour le state durant la saisie
  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val })
  }

  // Modifie la série via l'API
  handleSubmit(event) {
    event.preventDefault();

    // data à envoyer à l'API
    let data = {
      id: this.props.id,
      nom: this.state.nom,
      cote: this.state.cote,
      nbSaisons: this.state.nbSaisons,
      plateforme: this.state.plateforme,
      description: this.state.description
    }

    const url = 'http://localhost:9000/api/' + this.props.id;

    //TODO: Vérification côté client ici
    console.log("Data: ", data);
    const dataValide = this.verificationData(data);

    // Si les informations sont valides
    if(dataValide) {
      // call à l'API
      fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json())
        .then(data => {
          if(data.success) {
            // Affiche la liste des séries
            alert("Série modifiée avec succès.");
            this.props.rafraichirListe();
          } else {
            // Affiche un message d'erreur
            alert("Attention: ", data.msg);
          }
        })
        .catch(err => err);
    } else {
      alert("Une ou plusieurs informations sont invalides, veuillez réessayer.")
    }
  }

  // Fonction qui permet de vérifier les champs du formulaire de modification
  // retourne true si toutes les valeurs sont valides
  verificationData(data) {
    // Vérification du nom
    if(!data.nom) {
      // si le nom est vide
      return false;
    } else {
      if(data.nom.length > 100) {
        // si le nom est trop long
        return false;
      }
    }

    // Vérification de la cote
    if(!data.cote) {
      // si la cote est vide
      return false;
    } else {
      if(data.cote > 10 || data.cote < 0) {
        // si la cote est plus grande que 10.0 ou plus petite que 0
        return false;
      }
    }

    // Vérification du nombre de saisons
    if(!data.nbSaisons) {
      // si le nombre de saisons est vide
      return false;
    } else {
      if(data.nbSaisons > 30 || data.nbSaisons < 1) {
        // si le nombre de saisons est négatif ou plus grand que 30
        return false;
      }
    }

    // Vérification de la plateforme
    if(data.plateforme.length > 255) {
      // si la longueur de la plateforme est plus grande que 255
      return false;
    }

    // Vérification de la description
    if(data.description.length > 16777215) {
      // si la description est plus grande que le max accordé par un mediumtext
      return false;
    }

    // si tous les champs sont valides
    return true;
  }

  render() {
    const { nom, cote, nbSaisons, plateforme, description, clickBoutonRetour } = this.props;

    return (
      <div className="wrapper">
        <Row>
          <Button variant="danger" onClick={clickBoutonRetour}>Annuler</Button>
        </Row>
        <form onSubmit={this.handleSubmit}>
        <fieldset>
            <Row>
              <h2>Modifier la série {this.props.nom}</h2>
            </Row>

            <Row className="row">
              <label>Nom*</label>
              <input type="text" maxLength="100" name="nom" placeholder="Entrez le nom" defaultValue={nom} onChange={this.handleChange} required />
            </Row>
            
            <Row>
              <label>Cote*</label>
              <input type="number" step="0.1" min="0" max="10" name="cote" placeholder="0.0" defaultValue={cote} onChange={this.handleChange} required />
            </Row>
            <Row>
              <label>Nombre de saisons*</label>
              <input type="number" name="nbSaisons" min="1" max="30" placeholder="1" defaultValue={nbSaisons} onChange={this.handleChange} required />
            </Row>
          
            <Row>
              <label>Plateforme</label>
              <input type="text" name="plateforme" maxLength="255" placeholder="Netflix" defaultValue={plateforme} onChange={this.handleChange} />
            </Row>
          
            <Row>
              <label>Description</label>
              <textarea name="description" rows="5" cols="100" maxLength="16777215" placeholder="Entrez une description (facultatif)" defaultValue={description ? description : ""} onChange={this.handleChange} />
            </Row>
          </fieldset>
          <Row>
            <Button variant="primary" type="submit">Modifier la série</Button>
          </Row>
        </form>
      </div>
    );
  }
}

export default FormModifier;