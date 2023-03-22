import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

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
    project_price: projectForm.project_price,
    project_status: projectForm.project_status,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
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
      const res = await fetch('/api/pets', {
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
      setMessage('Failed to add pet')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = target.name

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
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewProject ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
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
          required
        />

      <label htmlFor="project_start">Data startu Projektu</label>
        <input
          type="date"
          name="project_start"
          value={form.project_start}
          onChange={handleChange}
          required
        />

      <label htmlFor="project_termin">Data terminu Projektu</label>
        <input
          type="date"
          name="project_termin"
          value={form.project_termin}
          onChange={handleChange}
          required
        />

      <label htmlFor="project_price">Kwota</label>
        <input
          type="number"
          name="project_price"
          value={form.project_price}
          onChange={handleChange}
          required
        />

      <label htmlFor="project_status">Status</label>
         <select onChange={handleChange} className="w-full bg-transparent rounded-md" name='project_price' value={form.project_status}>
             <option>Oczekuje</option>
             <option>W trakcie</option>
             <option>Skończony</option>
             <option>Zapłacone</option>
            </select>

     

        {/* <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="owner_name">Owner</label>
        <input
          type="text"
          maxLength="20"
          name="owner_name"
          value={form.owner_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">Species</label>
        <input
          type="text"
          maxLength="30"
          name="species"
          value={form.species}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="poddy_trained">Potty Trained</label>
        <input
          type="checkbox"
          name="poddy_trained"
          checked={form.poddy_trained}
          onChange={handleChange}
        />

        <label htmlFor="diet">Diet</label>
        <textarea
          name="diet"
          maxLength="60"
          value={form.diet}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="likes">Likes</label>
        <textarea
          name="likes"
          maxLength="60"
          value={form.likes}
          onChange={handleChange}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          name="dislikes"
          maxLength="60"
          value={form.dislikes}
          onChange={handleChange}
        /> */}

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
