import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

 const CREATE_ARTICLE = gql`
  mutation makaleOlustur($baslik: String!, $icerik: String!) {
    makaleOlustur(baslik: $baslik, icerik: $icerik) {
      baslik
      icerik
    }
  }
`;

function Add() {
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');

  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_ARTICLE);

  const handleCreateArticle = async () => {
    try {
      const response = await mutateFunction({
        variables: { baslik, icerik },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
        className='input'
          type="text"
          placeholder="Başlık"
          value={baslik}
          onChange={(e) => setBaslik(e.target.value)}
        />
        <textarea
          className='textarea'
          placeholder="İçerik"
          value={icerik}
          onChange={(e) => setIcerik(e.target.value)}
        />
        <button className='button' onClick={handleCreateArticle}>Makale Oluştur</button>
        <div>
          {loading && <p>Yükleniyor...</p>}
          {error && <p>Hata: {error.message}</p>}
          {data && (
            <div>
              <p>Yeni Makale Başlığı: {data.makaleOlustur.baslik}</p>
              <p>Yeni Makale İçeriği: {data.makaleOlustur.icerik}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Add;
