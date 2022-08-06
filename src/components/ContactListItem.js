import React from 'react'

const ContactListItem = ({contact}) => {
  
    let contactDisplay = null
    if (contact.type==='Website'){
        contactDisplay = <li><a href={contact.line1}>Visit the members Website</a></li>
    } else if (contact.type === 'Twitter'){
        contactDisplay = <li><a href={contact.line1}>Twitter</a></li>
    }
  
    return (
    <>
    {contact.typeDescription ? <><h5>{contact.typeDescription}</h5> <ul><li>{contact.line1}</li>{contact.line2 ? <li>{contact.line2}</li> : null}{contact.postcode ? <li>{contact.postcode}</li> : null}{contact.phone ? <li>Phone: {contact.phone}</li> : null}{contact.email ? <li>Email: {contact.email}</li> : null}</ul></> : null}
    {contactDisplay ? <p>{contactDisplay}</p> : null}
    </>
    
  )
}

export default ContactListItem