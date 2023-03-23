import Form from '../components/Form'

const NewProject = () => {
  const projectForm = {
    project_number: 0,
    project_name: '',
    project_client: '',
    project_filesNumber: 0,
    project_start: '',
    project_termin: '',
    project_streets: '',
    project_price: 0,
    project_disk: 'C',
    project_status: 'Oczekuje',
  }


  return <Form formId="add-project-form" projectForm={projectForm} />
}

export default NewProject
