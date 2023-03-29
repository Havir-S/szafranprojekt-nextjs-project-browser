export const deleteProject = async (num) => {
    console.log('ding')
    try {
      const res = await fetch('/api/projects/deletemany', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(num),
      })
    } catch (err) {
      console.log('Z', err)
    }
    
  }