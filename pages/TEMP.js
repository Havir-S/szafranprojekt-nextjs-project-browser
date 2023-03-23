
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
  const TEMPLATE_PROJECTS = new Array(
    ...new Array(5).fill(TEMPLATE_PROJECT), 
    ...new Array(5).fill(TEMPLATE_PROJECT_WTRAKCIE),
    ...new Array(5).fill(TEMPLATE_PROJECT_FINISHED), 
    ...new Array(5).fill(TEMPLATE_PROJECT_ZAPLACONE),
    )

  export default TEMPLATE_PROJECTS