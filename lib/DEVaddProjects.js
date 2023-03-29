
const status = ['Oczekuje','W trakcie', 'Skończony', 'Zapłacone']

export const addProjects = async (num) => {
  
  
  try {
    for (let i = 0; i < num; i++) {
        console.log(i)

        const form = {
            project_number: Math.floor(Math.random() * 500),
            project_name: (Math.random() + 1).toString(36).substring(2),
            project_status: status[Math.floor(Math.random() * status.length)],
            project_disk: 'C'
          }

        await fetch('/api/projects', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          })
      }
  } catch (error) {
    console.log(error)
  }

}