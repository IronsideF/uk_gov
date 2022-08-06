import React from 'react'

const InterestListItem = ({interest}) => {
  
    const interestsNodes = interest.interests.map((interest, i) => <><li key={i}>{interest.interest}</li>{interest.childInterests ? <ul>
        {interest.childInterests.map((child, i)=> <li key={i}>{child.interest}</li>)}</ul> : null}</>)

    return (
        <>
        <h5>{interest.name}</h5>
        <ul>
            {interestsNodes}
        </ul>
        </>
    )
}

export default InterestListItem;