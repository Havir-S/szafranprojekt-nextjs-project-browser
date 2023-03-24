import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import DiskViewer from './DiskViewer'
const disks = [
  {
    capacity: '66',
    used: '613.33 GB',
    available: '317.58 GB',
    diskName: 'C'
  },
  {
    capacity: '68',
    used: '160.99 GB',
    available: '76.96 GB',
    diskName: 'E'
  }
]

const Form = ({ formId, projectForm, forNewProject = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

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

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update pet')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Nie udało się dodać projektu')
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

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Wymagana jest nazwa projektu'
    if (!form.owner_name) err.owner_name = 'Wymagana jest nazwa klienta'
    return err
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
      <form id={formId} onSubmit={handleSubmit}>
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

      <p>Folder będzie znajdował się w <span className='font-bold italic text-lg'>{form.project_disk}:/szafranprojekt/ NUMER ID</span></p>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
