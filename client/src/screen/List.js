import React, { useState } from 'react';
 import DisplayUsers from '../components/DisplayUsers';
import DisplayFilterMakale from '../components/DisplayFilterMakale'

function List() {
  const [selectedUserId, setSelectedUserId] = useState([]);  
  const [fullMakalelist, setFullMakalelist] = useState(false);

  return (
    <div className="App"  stlye={{    backgroundAttachment: 'fixed',  
    backgroundSize: 'cover' }} >
      <header className="App-header">
        List ApolloServer
        <div style={{ display: 'flex',flex:1 }}>
          <div style={{ marginRight: '15px' }}>
            <div style={{ paddingTop: '15px' }}>Kullanıcılar</div>
            <DisplayUsers onUserClick={setSelectedUserId} setFullMakale={setFullMakalelist} />
          </div>
         
          <div>
            <div style={{ paddingTop: '15px' }}>Filtrelenmiş Makaleler</div>
            <DisplayFilterMakale selectedUserId={selectedUserId} setFullMakale={setFullMakalelist} fullMakale={fullMakalelist} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default List;
