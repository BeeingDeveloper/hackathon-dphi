import React from 'react'
import { useParams } from 'react-router-dom'


const ContestPage = () => {

    const {name, description, startDate, endDate, level, imageURL, id} = useParams();
    



    return (
        <div>
            {/* <h2>match.params.name</h2> */}
            {/* <h2>{name}</h2>
            <h2>{description}</h2>
            <h2>{startDate}</h2>
            <h2>{endDate}</h2>
            <h2>{level}</h2>
            <h2>{decodedIMG}</h2>
            {/* <img
                className='h-20 w-40'
                src={reverseImage}
                alt='img'
            /> */} 
        </div>
  )
}

export default ContestPage

// https://firebasestorage.googleapis.com/v0/b/hackathon-649c2.appspot.com/o/Images%1675201057772-Linkin-Park.jpg?alt=media&token=86492cde-a6a7-4a47-961f-a581f21fe6a2
// https://firebasestorage.googleapis.com/v0/b/hackathon-649c2.appspot.com/o/Images%2F1675201057772-Linkin-Park.jpg?alt=media&token=86492cde-a6a7-4a47-961f-a581f21fe6a2