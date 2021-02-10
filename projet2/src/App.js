import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import './App.css';

import SerieItem from './Components/SerieItem';
import SerieFiche from './Components/SerieFiche';
import FormAjout from './Components/FormAjout';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      series: [],
      afficherFiche: false,
      indexFiche: 1
    }

    this.onClickSerie = this.onClickSerie.bind(this);
    this.onClickBouton = this.onClickBouton.bind(this);
    this.onClickSupprimer = this.onClickSupprimer.bind(this);
    this.onClickFormAjout = this.onClickFormAjout.bind(this);
    this.onClickAjouterSerie = this.onClickAjouterSerie.bind(this);
  }

  // Lorsque le composant App.js est ajouté au DOM, on va chercher les données de l'API
  // et on met à jour le state avec les données de l'API.
  componentDidMount() {
    fetch('http://localhost:9000/api')
      .then((res) => res.json())
      .then(res => {
        this.setState({
          series: res.data,
          afficherFiche: false,
          afficherFormAjout: false,
          indexFiche: 1
        });
      })
      .catch(err => err);
  }

  // Gère les click sur les noms des séries dans le tableau
  onClickSerie(index) {
    this.setState({
      series: this.state.series,
      afficherFiche: true,
      afficherFormAjout: false,
      indexFiche: index
    });
  }

  // Affiche la liste des séries
  onClickBouton() {
    console.log("bouton click");
    this.setState({
      series: this.state.series,
      afficherFiche: false,
      afficherFormAjout: false,
      indexFiche: 1
    });
  }

  // Appel l'API pour supprimer la série
  onClickSupprimer(id) {
    const url = 'http://localhost:9000/api/' + id;
    fetch(url, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        if(data.success) {
          // Va chercher toute les série pour rafraichir la liste
          this.componentDidMount();
        } else {
          //TODO: Affiche un message d'erreur
          console.log("Erreur lors de la suppression")
        }
      })
      .catch(err => err);
  }

  // Affiche le formulaire d'ajout
  onClickFormAjout() {
    this.setState({
      series: this.state.series,
      afficherFiche: false,
      afficherFormAjout: true,
      indexFiche: 1
    });
  }

  // Ajoute la série
  onClickAjouterSerie() {
    this.componentDidMount();
    this.setState({
      series: this.state.series,
      afficherFiche: false,
      afficherFormAjout: false,
      indexFiche: 1
    });
  }

  render() {
    // Affichage par défaut (tableau contenant toute les séries)
    let affichage = (
      <div className="affichage">
        <table className="tableConsultation">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Cote</th>
              <th>Nombre de saisons</th>
              <th>Plateforme</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.series.map(serie => {
              return (
                <SerieItem key={serie.id} {...serie} clickSerie={this.onClickSerie} clickSupprimer={this.onClickSupprimer} />
              );
            })
          }
          </tbody>
        </table>
        <Button variant="primary" onClick={this.onClickFormAjout}>Ajouter une série</Button>
      </div>
    );

    // Si le nom d'une série a été cliquée, on change ce qui est affiché pour afficher seulement la série en question
    if (this.state.afficherFiche) {
      affichage = <SerieFiche key={this.state.indexFiche} id={this.state.indexFiche} clickBouton={this.onClickBouton}/>
    }

    // Si le bouton pour ajouter une série a été cliqué, on affiche le formulaire d'ajout
    if (this.state.afficherFormAjout) {
      affichage = (
        <FormAjout rafraichirListe={this.onClickAjouterSerie}/>
      );
    }

    // Ce qui est affiché
    return (
      <div className="App">
        <h1 className="mainTitle">Projet d'appronfondissement 2</h1>
        {affichage}
      </div>
    );
  }
}

export default App;
