import React, { useRef } from 'react'
import { useRouter } from 'next/router'

function EditProject({currentEditingProject, setCurrentEditingProject, toggleEditor}) {
    console.log(currentEditingProject)
    const router = useRouter()
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setCurrentEditingProject({
            ...currentEditingProject,
         [name]: value,
        })
    }

    const submitChange = async () => {
        try {
            const res = await fetch(`/api/projects/update/${currentEditingProject._id}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(currentEditingProject),
            })
      
            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
              throw new Error(res.status)
            }
      
            router.push('/');
            toggleEditor(false);
          } catch (error) {
            console.log('Coś poszło nie tak i nie udało się nadpisać projektu', error)
          }
    }


  return (
    <div className='absolute px-3 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 h-5/6 border-8 border-sky-800 rounded-lg shadow-2xl bg-gray-200'>
        <div className='flex py-1 text-3xl justify-between items-center'>
            <div className='flex flex-col'>
                <p className='font-bold mr-2'>Edytujesz projekt:</p>
            </div>
            <div className='flex gap-5'>
                <button onClick={() => {submitChange()}} className='border-4 cursor-pointer rounded-lg py-2 font-bold px-5 bg-green-200 border-green-400 hover:bg-green-300'>Zapisz</button>
                <div onClick={() => {toggleEditor(false)}} className='border-4 cursor-pointer rounded-lg py-2 font-bold px-5 bg-red-200 border-red-400 hover:bg-red-300'>Zamknij</div>
            </div>
        </div>
        <p className='font-sans shadow-xl text-xl font-bold border-b-2 border-gray-500'> aa {currentEditingProject?.project_number}-{currentEditingProject?.project_name}-{currentEditingProject?.project_client}</p>

        <form className='text-left p-0 m-0 text-xl '>
            <div>
                <label htmlFor='project_number'>NUMER PROJEKTU:</label>
                <input type='number' name='project_number' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_number} />
            </div>
            <div>
                <label htmlFor='project_name'>NAZWA PROJEKTU:</label>
                <input type='text' name='project_name' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_name} />
            </div>
            <div>
                <label htmlFor='project_client'>KLIENT:</label>
                <input type='text' name='project_client' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_client} />
            </div>
            <div>
                <label htmlFor='project_streets'>ULICE:</label>
                <input type='text' name='project_streets' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_streets} />
            </div>
            <div>
                <label htmlFor='project_start'>DATA START:</label>
                <input type='text' name='project_start' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_start} />
            </div>
            <div>
                <label htmlFor='project_termin'>DATA TERMIN:</label>
                <input type='text' name='project_termin' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_termin} />
            </div>
            <div>
                <label htmlFor='project_price'>KWOTA:</label>
                <input type='number' name='project_price' onChange={(e) => {handleChange(e)}} value={currentEditingProject.project_price} />
            </div>
            <div>
                <label htmlFor='project_status'>STATUS:</label>
                <select onChange={(e) => {handleChange(e)}} className="w-full bg-transparent rounded-md" name='project_status' value={currentEditingProject.project_status}>
                    <option>Oczekuje</option>
                    <option>W trakcie</option>
                    <option>Skończony</option>
                    <option>Zapłacone</option>
                </select>
            </div>
            <div>
                <p>Ścieżka do folderu:</p>
                <p className='font-bold italic'>{currentEditingProject.project_disk}:/szafranprojekt/{currentEditingProject.project_number}-{currentEditingProject.project_name}</p>
            </div>
        </form>
        <div>
            
        </div>
    </div>
  )
}

export default EditProject