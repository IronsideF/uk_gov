import React from 'react'

const HouseSelector = ({onHouseSelect}) => {

  
    return (
        <>
    <label htmlFor="commons">Commons</label>
    <input type="radio" name="house" id="commons" onClick={() => onHouseSelect(1)} selected />
    <label htmlFor="lords">Lords</label>
    <input type="radio" name="house" id="lords" onClick={() => onHouseSelect(2)} />
    </>
  )
}

export default HouseSelector