import React, { Component } from "react";
import './App.css';

import SerieItem from './Components/SerieItem';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      series: []
    }
  }

  // Lorsque le composant App.js est ajouté au DOM, on va chercher les données de l'API
  // et on met à jour le state avec les données de l'API.
  componentDidMount() {
    fetch('http://localhost:9000/api')
      .then((res) => res.json())
      .then(res => {
        this.setState({ series: res.data });
      })
      .catch(err => err);
  }

  render() {
    return (
      <div className="App">
        <h1>Projet d'appronfondissement 2</h1>
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
                <SerieItem key={serie.nom} {...serie} />
              );
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
