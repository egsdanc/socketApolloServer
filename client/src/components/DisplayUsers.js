import React from 'react';
import { useQuery,useSubscription } from '@apollo/client';
import gql from 'graphql-tag';

import './css/DisplayUsers.css';

const GET_USERS = gql`
  query kullanicilarGetirJustReact {
    kullanicilarGetir {
      id
      Ad
      Soyad
      Tel
      Makaleid
    }
  }
`;

export default function DisplayUsers({ onUserClick, setFullMakale }) {
  const { loading, error, data } = useQuery(GET_USERS, {
     pollInterval: 1000
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-list">
      {data.kullanicilarGetir.map(({ id, Ad, Soyad, Tel, Makaleid }) => (
        <div
          onClick={() => {
            setFullMakale(false);
            onUserClick(Makaleid);
            localStorage.setItem('tiklanmismakale', Makaleid);
            console.log(`Kullanıcıya tıkladı: ${Makaleid}`);
          }}
          style={{ backgroundColor: '#FFB6C1', borderRadius: 20, cursor: 'pointer' }}
          key={id}
        >
          <h3>{id}</h3>
          <h3>{Ad}</h3>
          <p>{Soyad}</p>
          <h3>{Tel}</h3>
          <h3>{Makaleid.join(', ')}</h3> {/* Join Makaleid array into a comma-separated string */}
          <br />
        </div>
      ))}
    </div>
  );
}
