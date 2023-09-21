import { useState, useEffect } from 'react'
import personsService from './services/persons'

const FilterForm = ({Filter, handleFilterChange}) =>{
  return(
    <form>
    <div>
      filter show with: <input
      value={Filter}
      onChange={handleFilterChange}
      />
    </div>
    </form>
  )
}

const DrawNotification = ({notification}) => {
  if (notification == null) {
    return null
  }
  return(
    <div className='notification'>
      {notification}
    </div>
  )
}

const DrawErrorNotification = ({ notification }) => {
  if (notification == null) {
    return null
  }
  return(
    <div className='error'>
      {notification}
    </div>
  )
}

const InfoForm = ({handleAdd, newName, handleNameChange, newNumber, handleNumberChange}) =>{
  return(
  <form onSubmit={handleAdd}>
  <div>
    name: <input 
    value={newName}
    onChange={handleNameChange}
    />
    <p>
    number: <input
    value={newNumber}
    onChange={handleNumberChange}
    />
    </p>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
  </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')
  const [errorNotificatoin, setErrorNotificatoin] = useState(null)
  const [normalNotification, setNotification] =useState(null)
  const [addOrChange, setaddOrChange] = useState("add")

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
    })
    console.log("effect ok")
  },[])

  const InfoDraw = ({ persons, filter }) =>{
    const drawThis = persons.filter(alkio => alkio.name.includes(filter))
    return(
    drawThis.map(alkio => <p key={alkio.name}>{alkio.name} {alkio.number} {drawDelete(alkio)}</p>)
    )
  }
  
  const drawDelete = (person) => {
    return(<button onClick={() => deletePerson(person)}> Delete </button>)
  }

  const deletePerson = (person) => {
    var everythingOK = true
    if (window.confirm(`Delete ${person.name}?`)){
      personsService
        .deletePerson(person.id).catch(error => {
          setErrorNotificatoin(`${person.name} has already been deleted from the server.`)
          setTimeout(() => { setErrorNotificatoin(null) }, 5000)
          everythingOK = false
        })
      personsService
        .getAll()
        .then(response => {
          setPersons(response)
      if (everythingOK){
      setErrorNotificatoin(`${person.name} has been deleted from the phonebook.`)
      setTimeout(() => { setErrorNotificatoin(null) }, 5000)}
      })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleChangeNumber = (newName) =>{
    setaddOrChange("change")
    const oldPerson = persons.find((element) => element.name==newName)
    console.log(oldPerson)
    personsService
      .deletePerson(oldPerson.id)
    personsService
      .getAll()
      .then(response => {
    setPersons(response)}) 
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const names = []
    persons.map(person => names.push(person.name))
    if (names.includes(newName)){
      if(window.confirm(`${newName} is already in the phonebook. Would you like to change his number to ${newNumber}?`)){
        handleChangeNumber(newName)
        }
      }
    else{setaddOrChange("add")}
    const objectToSend = {name: newName, number: newNumber}
    personsService
      .create(objectToSend)
      personsService
        .getAll().then(response => {setPersons(response)})
      if (addOrChange == "add"){
      setNotification(`${newName} has been added to the phonebook.`)}
      else{setNotification(`${newName}'s number has been changed.`)}
      setTimeout(() => { setNotification(null) }, 5000)
  
        setNewName('')
        setNewNumber('')
      
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <DrawNotification notification={normalNotification}/>
      <DrawErrorNotification notification={errorNotificatoin}/>
      <FilterForm Filter={Filter} handleFilterChange={handleFilterChange}/>
      <h1>add new</h1>
      <InfoForm handleAdd={handleAdd} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <InfoDraw persons={persons} filter={Filter}/>
    </div>
  )
}

export default App