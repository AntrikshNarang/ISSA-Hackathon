import React from 'react'

const Card = ({note}) => {
  return (
    <div>
        <div>
            {note.title}
        </div>
        <div>
            {note.description}
        </div>
    </div>
  )
}

export default Card