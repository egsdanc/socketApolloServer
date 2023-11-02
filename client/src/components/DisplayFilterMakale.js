import { useQuery, gql } from '@apollo/client';
import '../../src/App.css';
import { useNavigate  } from 'react-router-dom';

const GET_FILTERMAKALE = gql`
  query makaleFiltreJustReact($ids: [ID!]!) {
    makaleFiltre(ids: $ids) {
      id
      baslik
      icerik
    }
  }
`;

const GET_TUMMAKALE = gql`
  query makalelerGetir {
    makalelerGetir {
      id
      baslik
      icerik
    }
  }
`;

function DisplayFilterMakale({ selectedUserId,setFullMakale, fullMakale }) {
   const tiklanmismakale = localStorage.getItem("tiklanmismakale");
  const makaleIDs = tiklanmismakale ? tiklanmismakale.split(",") : [];
  
  const navigate = useNavigate ();

  const handleItemClick = (itemId) => {
     navigate(`/detay/${itemId}`);
  };
 
 
  const { loading, error, data } = useQuery(GET_FILTERMAKALE, {
    variables: { ids: makaleIDs },
    pollInterval: 1000,
  });

  const data1 = useQuery(GET_TUMMAKALE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button  className='fullmakale' style={{height:70,width:120 ,  backgroundColor: "#FFA07A", marginTop:18}}   onClick={() => setFullMakale(!fullMakale)}><div>Tüm Makaleler </div></button>

      {!fullMakale && data.makaleFiltre
        ? data.makaleFiltre
            .filter(({ id }) => selectedUserId && selectedUserId.includes(id))
            .map(({ id, baslik, icerik }) => (
              <div  onClick={() => handleItemClick(id)} style={{ backgroundColor: "#FFA07A", borderRadius: 20,cursor: "pointer" }} key={id}>
                <h3>{id}</h3>
                <h3>{baslik}</h3>
                <p>{icerik}</p>
                <br />
              </div>
            ))
        : data1.data.makalelerGetir.map(({ id, baslik, icerik }) => (
            <div   onClick={() => handleItemClick(id)} style={{ backgroundColor: "#FFA07A", borderRadius: 20,cursor: "pointer" }} key={id}>
              <h3>{id}</h3>
              <h3>{baslik}</h3>
              <p>{icerik}</p>
              <br />
            </div>
          ))}
    </div>
  );
}

export default DisplayFilterMakale;
