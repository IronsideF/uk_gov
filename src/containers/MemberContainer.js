import React, { useEffect, useState } from 'react'
import MemberDetails from '../components/MemberDetails'
import MemberSelector from '../components/MemberSelector'
import HouseSelector from '../components/HouseSelector'
import InterestListItem from '../components/InterestListItem'
import ContactListItem from '../components/ContactListItem'
import PartySelector from '../components/PartySelector'

const MemberContainer = () => {
    
    const [house, setHouse] = useState(1)
    const [members, setMembers] = useState([])
    const [currentMember, setCurrentMember] = useState(null)
    const [currentMemberInterests, setcurrentMemberInterests] = useState(null)
    const [currentMemberContact, setCurrentMemberContact] = useState(null)
    const [currentMemberSynopsis, setCurrentMemberSynopsis] = useState(null)
    const [selectedParty, setSelectedParty] = useState(null)

    async function getMembers() {
        const limitPerPage = 20
        let skipNo = 0
        let mostRecentReturn = {}
        let results = []
        do {
        const response = await fetch(`http://localhost:8080/members-api.parliament.uk/api/Members/Search?IsCurrentMember=true&skip=${skipNo}&take=${limitPerPage}`);
        const data = await response.json();
        mostRecentReturn = data;
        results= results.concat(data.items);
        skipNo+=limitPerPage}
        while (mostRecentReturn.items.length === 20);
        setMembers(results);
    }
    getMembers()

    useEffect(() => {
        if (currentMember){
        fetch(`https://members-api.parliament.uk/api/Members/${currentMember.value.id}/RegisteredInterests`).then((response) => response.json().then((data) => setcurrentMemberInterests(data.value.map((interest, i) => <InterestListItem key = {i} interest={interest}/>))))
        fetch(`https://members-api.parliament.uk/api/Members/${currentMember.value.id}/contact`).then((resp)=>resp.json()).then((data)=> setCurrentMemberContact(data.value.map((contact, i)=> <ContactListItem key={i} contact={contact}/>)))
        fetch(`https://members-api.parliament.uk/api/Members/${currentMember.value.id}/synopsis`).then((resp)=>resp.json()).then((data)=> setCurrentMemberSynopsis(data.value))
        }
    },[currentMember])

    useEffect(() => {
        setCurrentMember(null)
    }, [house, selectedParty])
    
    const onHouseSelect = (house) => {
        setHouse(house)
    }
    const onMemberSelect = (member) => {
        setCurrentMember(member)
    }

    const onPartySelect = (party) => {
        if (party==='null'){
            setSelectedParty(null)
        } else {
        setSelectedParty(party)
        }
    }

    

    const membersInSelectedHouse = members.filter((member) => member.value.latestHouseMembership.house === house)
    const partyReference = []
    const parties = []
    membersInSelectedHouse.forEach((member) => {
        if (!partyReference.includes(member.value.latestParty.name)){
            partyReference.push(member.value.latestParty.name)
            parties.push(member.value.latestParty)
        }
    })
    // let uniqueParties = new Set(membersInSelectedHouse.map((member) => member.value.latestParty.name))
    // console.log(uniqueParties)
    // uniqueParties = [...uniqueParties]
    // const parties = membersInSelectedHouse.filter((member)=> !(uniqueParties.includes(member.value.latestParty.name))).map((member) => {return {name:member.value.latestParty.name, abbreviation:member.value.latestParty.abbreviation}})
    console.log(parties)
    // console.log(uniqueParties)

    const membersInSelectedParty = membersInSelectedHouse.filter((member)=> member.value.latestParty.name === selectedParty)
   

  
    return (
    <>
        <HouseSelector onHouseSelect={onHouseSelect}/>
        <PartySelector parties={parties} onPartySelect={onPartySelect}/>
        {selectedParty ? <MemberSelector members={membersInSelectedParty} onMemberSelect={onMemberSelect}/> : <MemberSelector members={membersInSelectedHouse} onMemberSelect={onMemberSelect}/>}
        {currentMember ? <MemberDetails currentMember={currentMember} currentMemberInterests={currentMemberInterests} currentMemberContact={currentMemberContact} house={house} currentMemberSynopsis={currentMemberSynopsis}/> : null}

    </>
  )
}

export default MemberContainer