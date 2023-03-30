import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

function DeleteModal({deleteProject, toggleDeleteModal, setDeleteProject, deleteModal}) {
    const router = useRouter()

    const completeDelete = async () => {
        console.log('ding')
        console.log(deleteProject._id)
        try {
          await fetch(`api/projects/delete/${deleteProject._id}`);
        } catch (e) {
          console.log(e)
        }
        router.reload(window.location.pathname)
    }

  return (
    <div className='fixed w-screen h-screen top-0 left-0 flex justify-center items-center' style={{background: 'rgba(0,0,0,.5)'}}>
        <div className=' bg-orange-100 border-4 border-orange-500 rounded-md w-2/3 h-1/3 absolute'>
            <p className='font-bold text-3xl bg-orange-200 w-2/3 shadow mx-auto mt-5 p-2 text-center'>Zaraz usuniesz projekt:</p>
            <p className='text-center my-5 text-3xl font-mono w-2/3 mx-auto p-2 bg-orange-50 border-2 border-orange-200'>{deleteProject?.project_number}-{deleteProject?.project_name} dla {deleteProject?.project_client}</p>

            <div className='flex justify-center gap-10'>
                <div className='cursor-pointer relative text-3xl font-bold border-4 border-red-500 rounded-lg bg-red-300 px-4 py-2'>
                    <span onClick={() => {completeDelete()}}>USUŃ</span>
                    <div className='deleteBlock'>BLOKADA</div>
                </div>
                <div onClick={() => {setDeleteProject({}), toggleDeleteModal(false)}} className='cursor-pointer text-3xl font-bold border-4 border-blue-500 rounded-lg bg-blue-300 px-4 py-2'>WRÓĆ</div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal