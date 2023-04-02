import React, { useRef } from 'react'
import { useRouter } from 'next/router'

function NewNote({toggleNewNote}) {
    const inputRef = useRef(null)
    const router = useRouter()

    const createNewNote = async () => {
        if (!inputRef.current.value) return;

        console.log(inputRef.current.value)

        await fetch('/api/notes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(inputRef.current.value),
        })
        router.reload(window.location.pathname)
    }

  return (
    <div className='fixed w-full top-0 left-0 z-10 h-full' style={{background: 'rgba(0,0,0,.5)'}}>
        <div className='p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/4 z-10 rounded-lg shadow-lg  border-2 bg-gray-100 border-green-500'>
            <div className='flex justify-between items-center'>
                <p className='text-3xl font-bold'>Nowa notatka:</p>
                <div className='flex gap-10'>
                    <div onClick={() => {createNewNote()}} className='cursor-pointer font-bold text-2xl py-2 px-5 border-blue-500 bg-blue-100 hover:blue-orange-700 hover:bg-blue-200 rounded-2xl border-2'>Zapisz</div>
                    <div onClick={() => {toggleNewNote(false)}} className='cursor-pointer text-red-500 font-bold text-2xl py-2 px-5 border-orange-500 bg-orange-100 hover:border-orange-700 hover:bg-orange-200 rounded-2xl border-2'>Zamknij</div>
                </div>
            </div>
            <textarea ref={inputRef} type='text' placeholder='Treść notatki...' className='mt-3 text-2xl h-32' />
        </div>
    </div>
  )
}

export default NewNote