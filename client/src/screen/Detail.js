import React from 'react'
import { useQuery, gql } from '@apollo/client';

import { useParams } from 'react-router-dom';
 

const GET_FILTERMAKALE = gql`
  query makaleFiltreJustReact($ids: [ID!]!) {
    makaleFiltre(ids: $ids) {
      id
      baslik
      icerik
    }
  }
`;


function Detail() {

    const { itemId } = useParams();


    const { loading, error, data } = useQuery(GET_FILTERMAKALE, {
        variables: { ids: itemId  },
        pollInterval: 1000,
      });


      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

    return (
    <div>
      { 
         data?.makaleFiltre
            
            .map(({ id, baslik, icerik }) => (
              <div  style={{ backgroundColor: "#FFA07A", borderRadius: 20, marginTop:100 }} key={id}>
                <h3>{id}</h3>
                <h3>{baslik}</h3>
                <p>{icerik}</p>
                <br />
              </div>
            )) }

    </div>
  )
}

export default Detail
