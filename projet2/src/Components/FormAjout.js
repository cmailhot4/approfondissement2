import React, { Component } from 'react';
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';

//CSS
import '../css/FormAjout.css';

class FormAjout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nom: '',
      cote: 0.0,
      nbSaisons: 0,
      description: '',
      plateforme: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Met à jour le state durant la saisie
  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  // Ajoute la série via l'API
  handleSubmit(event) {
    event.preventDefault();
    
    // data à envoyé à l'API
    let data = {
      nom: this.state.nom,
      cote: this.state.cote,
      nbSaisons: this.state.nbSaisons,
      plateforme: this.state.plateforme,
      description: this.state.description
    }

    console.log("Data: ", data);
    
    // call à l'API
    fetch('http://localhost:9000/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(data => {
        if(data.success) {
          // Affiche la liste des séries
          alert("Série ajoutée avec succès.");
          this.props.rafraichirListe();
        } else {
          // Affiche un message d'erreur
          alert("Attention: ", data.msg);
        }
      })
      .catch(err => err);
  }

  render() {
    return(
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <Row className="row">
              <label>Nom*</label>
              <input type="text" name="nom" placeholder="Entrez le nom" onChange={this.handleChange} />
            </Row>
            
            <Row>
              <label>Cote*</label>
              <input type="number" name="cote" placeholder="Entrez la cote" onChange={this.handleChange} />
            </Row>
            <Row>
              <label>Nombre de saisons*</label>
              <input type="number" name="nbSaisons" placeholder="Entrez le nb de saisons" onChange={this.handleChange} />
            </Row>
          
            <Row>
              <label>Plateforme*</label>
              <input type="text" name="plateforme" placeholder="Entrez la plateforme" onChange={this.handleChange} />
            </Row>
          
            <Row>
              <label>Description</label>
              <textarea name="description" rows="5" cols="100" placeholder="Entrez une description (facultatif)" onChange={this.handleChange} />
            </Row>
          </fieldset>
          <Button variant="primary" type="submit">Ajouter la série</Button>
        </form>
      </div>
    );
  }
}

export default FormAjout;