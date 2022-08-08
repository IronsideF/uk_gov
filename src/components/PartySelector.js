import React from 'react'

const PartySelector = ({parties, onPartySelect}) => {
  
    const partyArray = [...parties]
    const partyNodes = partyArray.map((party, i) => <option className={party.abbreviation} value={party.name} key={i}>{party.name}</option>)
    const handleSelect = (event) => {
        onPartySelect(event.target.value)
    }
  
    return (
    <select onChange={handleSelect}>
        <option value='null' key='null'>None</option>
        {partyNodes}
    </select>
  )
}

export default PartySelector;