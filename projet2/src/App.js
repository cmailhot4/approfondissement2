import React, { Component } from "react";
import './App.css';

import SerieItem from './Components/SerieItem';
import SerieFiche from './Components/SerieFiche';

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
      indexFiche: index
    });
  }

  // Affiche la liste des séries
  onClickBouton() {
    console.log("bouton click");
    this.setState({
      series: this.state.series,
      afficherFiche: false,
      indexFiche: 1
    });
  }

  render() {
    // Affichage par défaut (tableau contenant toute les séries)
    let affichage = (
      <table className="tableConsultation">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Cote</th>
            <th>Nombre de saisons</th>
            <th>Plateforme</th>
            <th>Modifier/Supprimer</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.series.map(serie => {
            return (
              <SerieItem key={serie.id} {...serie} clickSerie={this.onClickSerie} />
            );
          })
        }
        </tbody>
      </table>
    );

    // Si le nom d'une série a été cliquée, on change ce qui est affiché pour afficher seulement la série en question
    if (this.state.afficherFiche) {
      affichage = <SerieFiche key={this.state.indexFiche} id={this.state.indexFiche} clickBouton={this.onClickBouton}/>
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
