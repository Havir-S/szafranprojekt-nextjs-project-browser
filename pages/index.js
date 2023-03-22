import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Pet from '../models/Pet'

const TEMPLATE_PROJECT = {
  project_number: 5,
  project_name: 'PROJEKT SIEMIANOWICE',
  project_client: 'SIGNICO',
  project_streets: 'Siemianowice, Nowohucka, Akademii Hutniczo Górniczej',
  project_filesNumber: 6,
  project_start: '16.05.1999',
  project_termin: '22.06.2000',
  project_price: '400zł',
  project_status: 'Oczekuje'
}

const TEMPLATE_PROJECT_FINISHED = {
  project_number: 2,
  project_name: 'PROJEKT SIEMIANOWICE',
  project_client: 'SIGNICO',
  project_streets: 'Siemianowice, Nowohucka, Akademii Hutniczo Górniczej',
  project_filesNumber: 6,
  project_start: '16.05.1999',
  project_termin: '22.06.2000',
  project_price: '400zł',
  project_status: 'Skończony'
}

const TEMPLATE_PROJECT_WTRAKCIE= {
  project_number: 2,
  project_name: 'PROJEKT SIEMIANOWICE',
  project_client: 'SIGNICO',
  project_streets: 'Siemianowice, Nowohucka, Akademii Hutniczo Górniczej',
  project_filesNumber: 6,
  project_start: '16.05.1999',
  project_termin: '22.06.2000',
  project_price: '400zł',
  project_status: 'W trakcie'
}

const TEMPLATE_PROJECT_ZAPLACONE= {
  project_number: 2,
  project_name: 'PROJEKT SIEMIANOWICE',
  project_client: 'SIGNICO',
  project_streets: 'Siemianowice, Nowohucka, Akademii Hutniczo Górniczej',
  project_filesNumber: 6,
  project_start: '16.05.1999',
  project_termin: '22.06.2000',
  project_price: '400zł',
  project_status: 'Zapłacone'
}


{/* <option>Oczekuje</option>
<option>W trakcie</option>
<option>Skończony</option>
<option>Zapłacone</option> */}

const TEMPLATE_PROJECTS = new Array(
  ...new Array(5).fill(TEMPLATE_PROJECT), 
  ...new Array(5).fill(TEMPLATE_PROJECT_FINISHED), 
  ...new Array(5).fill(TEMPLATE_PROJECT_WTRAKCIE),
  ...new Array(5).fill(TEMPLATE_PROJECT_ZAPLACONE),
  )
// TEMPLATE_PROJECTS.push(TEMPLATE_PROJECT)

const Index = ({ pets }) => (
  <div className='mb-24 '>
    <div className='bg-white w-fit mx-auto border-2 mt-16  rounded-md'>
      <p className='text-6xl text-center font-bold my-5'>Projekty</p>
      <div className=' flexHolder  w-fit mx-auto'>

      {/* /////// ZROBIĆ KWADRACIK NA NOTKI CO ZROBIĆ ITP */}



        <div className='flexRow flexRowFirst '>
          <div className='flexCell flexNumber flexCellBorder'>Numer</div>
          <div className='flexCell flexName flexCellBorder'>Nazwa</div>
          <div className='flexCell flexClient flexCellBorder'>Klient</div>
          <div className='flexCell flexStreets flexCellBorder'>Ulice</div>
          <div className='flexCell flexFiles flexCellBorder'>Pliki</div>
          <div className='flexCell flexDate flexCellBorder'>Start</div>
          <div className='flexCell flexDate flexCellBorder'>Termin</div>
          <div className='flexCell flexNumber flexCellBorder'>Kwota</div>
          <div className='flexCell flexStatus '>Status</div>
        </div>

        {TEMPLATE_PROJECTS.map((projekt, id) => {

          return (
          <div className={`flexRow ${projekt.project_status === 'Zapłacone' ? 'flexRowZaplacone' : 'flexRowDefault'}  group `}>
            <div className='flexCell flexNumber flexCellBorder text-center'>{projekt.project_number}</div>
            <div className='flexCell flexName flexCellBorder truncate hover:text-clip'>{projekt.project_name}</div>
            <div className='flexCell flexClient flexCellBorder truncate hover:text-clip'>{projekt.project_client}</div>
            <div className='flexCell flexStreets flexCellBorder truncate hover:text-clip'>{projekt.project_streets}</div>
            <div className='flexCell flexFiles flexCellBorder'>{projekt.project_filesNumber}</div>
            <div className='flexCell flexDate flexCellBorder'>
            {projekt.project_start}
            </div>
            <div className='flexCell flexDate flexCellBorder'>
            {projekt.project_termin}
            </div>
            <div className='flexCell flexNumber flexCellBorder'>{projekt.project_price}</div>
            <div className='flexCell flexStatus '>
            {projekt.project_status}
            </div>
            <div className='flexRowOptions hidden group-hover:block'>
              <button className=' cursor-pointer ml-5 font-extrabold shadow-md bg-sky-200 hover:bg-sky-300 text-gray-900 hover:text-black rounded-xl  border-4 border-blue-500 px-4 py-2'>
                Edytuj
              </button>
              
            </div>
          </div>
          )
        }
        )}

        {/* <div className='flexRow flexRowDefault '>
          <div className='flexCell flexNumber flexCellBorder text-center'>1</div>
          <div className='flexCell flexName flexCellBorder truncate hover:text-clip'>PROJEKT SIEMIANOWICE</div>
          <div className='flexCell flexClient flexCellBorder truncate hover:text-clip'>Klient</div>
          <div className='flexCell flexStreets flexCellBorder truncate hover:text-clip'>Ulice</div>
          <div className='flexCell flexFiles flexCellBorder'>6</div>
          <div className='flexCell flexDate flexCellBorder'>
            22.06.2000
          </div>
          <div className='flexCell flexDate flexCellBorder'>
            16.05.1999
          </div>
          <div className='flexCell flexNumber flexCellBorder'>Kwota</div>
          <div className='flexCell flexStatus '>
           
            Oczekuje
          </div>
          <div className='flexRowOptions'>
            Edytuj
          </div>
        </div> */}
 {/* <select className="w-full bg-transparent rounded-md">
             <option>Oczekuje</option>
             <option>W trakcie</option>
             <option>Skończony</option>
             <option>Zapłacone</option>
            </select> */}
       

      </div>
    </div>
  </div>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Pet.find({})
  const pets = result.map((doc) => {
    const pet = doc.toObject()
    pet._id = pet._id.toString()
    return pet
  })

  return { props: { pets: pets } }
}

export default Index


// {/* {pets.map((pet) => (
//       <div key={pet._id}>
//         <div className="card">
//           <img src={pet.image_url} />
//           <h5 className="pet-name">{pet.name}</h5>
//           <div className="main-content">
//             <p className="pet-name">{pet.name}</p>
//             <p className="owner">Owner: {pet.owner_name}</p>

//             {/* Extra Pet Info: Likes and Dislikes */}
//             <div className="likes info">
//               <p className="label">Likes</p>
//               <ul>
//                 {pet.likes.map((data, index) => (
//                   <li key={index}>{data} </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="dislikes info">
//               <p className="label">Dislikes</p>
//               <ul>
//                 {pet.dislikes.map((data, index) => (
//                   <li key={index}>{data} </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="btn-container">
//               <Link href="/[id]/edit" as={`/${pet._id}/edit`} legacyBehavior>
//                 <button className="btn edit">Edit</button>
//               </Link>
//               <Link href="/[id]" as={`/${pet._id}`} legacyBehavior>
//                 <button className="btn view">View</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))} */}