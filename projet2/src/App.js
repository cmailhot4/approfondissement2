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

  componentWillMount() {
    /*fetch('http://localhost:9000/api')
      .then(res => res.json())
      .catch(err => err);*/
    this.setState({
      series: [
        {nom: "The Office", cote: 10.0, nbSaisons: 9, description: "", plateforme: "Netflix"},
        {nom: "Breaking Bad", cote: 9.0, nbSaisons: 5, description: "", plateforme: "Netflix"}
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Projet d'appronfondissement 2</h1>
        { 
          this.state.series.map(serie => {
            return (
              <SerieItem key={serie.nom} {...serie} />
            );
          })
        }
      </div>
    )
  }
}
/*{ 
  this.state.series.map(serie => {
    return (
      <SerieItem key={serie.nom} {...serie} />
    );
  })
}*/

export default App;
