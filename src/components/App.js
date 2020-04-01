import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }



  onFindPetsClick = () => {
    const petType = this.state.filters.type;
    const url = `/api/pets${petType === 'all' ? '' : '?type=' + petType}`;

      fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets }));
  }

  onChangeType = (event) => {
    console.log(event.target.value)
    this.setState({filters: {type: event.target.value}})
  }

  onAdoptPet = (petId) => {
    console.log('onAdoptPet', petId)

    const newPetsArray = this.state.pets.map(pet => {
      if (pet.id === petId) {
        return {...pet, isAdopted: true};
      }
      else {
        return pet
       }
    })
    
    this.setState({pets: newPetsArray});
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
