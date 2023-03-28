import Form from '../components/Form'
import { checkDrives } from '../lib/drives'

const NewProject = ({disks}) => {
  const projectForm = {
    project_number: 0,
    project_name: '',
    project_client: '',
    project_filesNumber: 0,
    project_start: '',
    project_termin: '',
    project_streets: '',
    project_price: 0,
    project_disk: '',
    project_files: [],
    project_status: 'Oczekuje',
  }


  return <Form formId="add-project-form" disks={disks} projectForm={projectForm} />
}


export async function getServerSideProps() {
  const disks = checkDrives()
  return { props: {disks}}
}

export default NewProject
