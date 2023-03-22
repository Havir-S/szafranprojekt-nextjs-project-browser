import Form from '../components/Form'

const NewProject = () => {
  const projectForm = {
    project_number: '',
    project_name: '',
    project_client: '',
    project_filesNumber: 0,
    project_start: Date,
    project_termin: Date,
    project_price: '',
    project_status: [],
  }

  return <Form formId="add-project-form" projectForm={projectForm} />
}

export default NewProject
