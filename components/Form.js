import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import DiskViewer from './DiskViewer'

const Form = ({ formId, projectForm, disks, }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState([])

  const [form, setForm] = useState({
    project_number: projectForm.project_number,
    project_name: projectForm.project_name,
    project_client: projectForm.project_client,
    project_filesNumber: projectForm.project_filesNumber,
    project_start: projectForm.project_start,
    project_termin: projectForm.project_termin,
    project_streets: projectForm.project_streets,
    project_price: projectForm.project_price,
    project_status: projectForm.project_status,
    project_disk: projectForm.project_disk
  })


  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    // formValidate();
    if (form.project_name && form.project_disk) {
        try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })

        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleChange = (e) => {
    
    const value = e.target.value
    const name = e.target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  

  const handleSubmit = (e) => {
    e.preventDefault()
    // const errs = formValidate()
    postData(form)
    // if (Object.keys(errs).length === 0) {
      
      
    // } else {
    //   console.log('dd')
    //   setErrors({ errs })
    // }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit} className='mb-5 relative'>
      <label htmlFor="project_number">Numer projektu</label>
        <input
          type="number"
          maxLength="6"
          name="project_number"
          value={form.project_number}
          onChange={handleChange}
          required
        />

      <label htmlFor="project_name">Nazwa projektu</label>
        <input
          type="string"
          name="project_name"
          value={form.project_name}
          onChange={handleChange}
          required
        />

      <label htmlFor="project_client">Nazwa klienta</label>
        <input
          type="string"
          name="project_client"
          value={form.project_client}
          onChange={handleChange}
        />

      <label htmlFor="project_start">Data startu Projektu</label>
        <input
          type="text"
          name="project_start"
          value={form.project_start}
          onChange={handleChange}
        />

      <label htmlFor="project_termin">Data terminu Projektu</label>
        <input
          type="text"
          name="project_termin"
          value={form.project_termin}
          onChange={handleChange}
        />

      <label htmlFor="project_streets">Ulice w projekcie:</label>
        <input
          type="text"
          name="project_streets"
          value={form.project_streets}
          onChange={handleChange}
        />

      <label htmlFor="project_price">Kwota</label>
        <input
          type="number"
          name="project_price"
          value={form.project_price}
          onChange={handleChange}
        />

      <label htmlFor="project_status">Status</label>
         <select onChange={handleChange} className="w-full bg-transparent rounded-md" name='project_status' value={form.project_status}>
             <option>Oczekuje</option>
             <option>W trakcie</option>
             <option>Skończony</option>
             <option>Zapłacone</option>
          </select>

      <label htmlFor="project_disk">Zapisać na którym dysku:</label>
      <DiskViewer disks={disks} handleChange={handleChange} />
      
      

      <p>Folder będzie znajdował się w <span className='font-bold italic text-lg'>{form.project_disk}:/szafranprojekt/{form.project_number}-{form.project_name}</span></p>

        <button type="submit" className="btn">
          DODAJ PROJEKT
        </button>

        {/* {errors.length > 0 && (
          <div className=' font-bold text-2xl border-orange-500 border-4 bg-orange-300 rounded-lg w-96 px-5 py-2 absolute top-0 left-full ml-5 mt-5'>
          {errors.map((err,id) => (
            <p key={id}>-{err}</p>
          ))}
          </div>
        )} */}
        
      </form>
    </>
  )
}

export default Form
