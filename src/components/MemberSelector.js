import React from 'react'

const MemberSelector = ({members, onMemberSelect}) => {
    
    const membersNodes = members.map((member, i) => {
        return <option key={i} value={i}>{member.value.nameListAs}</option>
    })

    const handleSelect = (event) => {
        onMemberSelect(members[event.target.value])
    }

    return (
    <select name="member-selector" id="member-selector" onChange={handleSelect}>
    <option value={null} key='null'>None</option>
    {membersNodes}
    </select>
  )
}

export default MemberSelector