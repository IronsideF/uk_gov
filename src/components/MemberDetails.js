import React from 'react'


const MemberDetails = ({currentMember, currentMemberInterests, currentMemberContact, house, currentMemberSynopsis}) => {
  

    let currentMemberHouse;
    if (house === 1){currentMemberHouse='Commons'}else{currentMemberHouse='Lords'}
    let sourceOfSeat;
    if (currentMemberHouse === 'Commons'){
        sourceOfSeat = 'Constituency'
    } else {
        sourceOfSeat = 'Peerage'
    }
    
    
    return (
        <>
        <img src={currentMember.value.thumbnailUrl} alt="The selected MP" />
        <p dangerouslySetInnerHTML={{__html: currentMemberSynopsis}}></p>
        <ul>
        <li>Name: {currentMember.value.nameDisplayAs}</li>
        <li>{sourceOfSeat}: {currentMember.value.latestHouseMembership.membershipFrom}</li>
        <li>Party: {currentMember.value.latestParty.name}</li>
        <li>Gender: {currentMember.value.gender}</li>
        <li>House of {currentMemberHouse}</li>
        <h4>Contact Details</h4>
        {currentMemberContact}
        {/* <h5>Total Declared Interests: {currentMemberInterests.length}</h5> */}
        {currentMemberInterests}
    </ul></>
  )
}

export default MemberDetails