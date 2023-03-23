import React from 'react'



function DiskViewer({disks, handleChange}) {
  return (
    <>
        {disks?.length > 0 && disks.map(disk => (
            <div key={disk.diskName} className='flex flex-col border-4 border-gray-400 bg-gray-200 rounded-lg mt-2 p-2'>
                <div className='flex flex-row'>
                <input type="radio" value={disk.diskName} onChange={handleChange} name="project_disk" className="w-5 h-5  text-blue-600 bg-gray-100 border-2 border-gray-900 checked:border-black checked:bg-sky-600" />
                <p className="text-xl ml-2">Dysk {disk.diskName}: </p>
                </div>
                <div className='w-full border-2 border-gray-600 bg-gray-200 h-6'>
                    <div className=' h-full bg-sky-400' style={{width: `${disk.capacity}%`}}/>
                </div>
                <p>{disk.available} wolnych z {disk.used}</p>
            </div>
        ))}
    </>
  )
}

export default DiskViewer