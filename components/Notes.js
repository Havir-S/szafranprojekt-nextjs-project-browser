import { useRouter } from 'next/router'
import React, { useState } from 'react'
import NewNote from './NewNote'


function Notes({notes}) {
    const [newNote, toggleNewNote] = useState(false)
    console.log(notes)
    const router = useRouter()

    const deleteNote = async (id) => {
      console.log(id)
      await fetch('/api/notes', {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
    })
    router.reload(window.location.pathname)
    }
  return (
    <>
    <div className=' relative w-3/4 mx-auto'>
        <div className='w-full relative shadow-md border-2 rounded-lg rounded-br-none border-sky-300 bg-sky-100 mx-auto mt-5 p-1 h-60 overflow-y-scroll '>
            <p className='font-bold text-3xl text-center'>Notatki</p>
            {notes.map((note,i) => (
                <div key={i} className='flex flex-row gap-2 text-xl py-1 px-2'>
                    <p className='p-1 flex-1  bg-blue-200 rounded-md border border-blue-300'>- {note.note_text}</p>
                    <div onClick={() => {deleteNote(note._id)}} className='cursor-pointer text-red-500 font-bold text-3xl py-2 px-5 border-orange-500 bg-orange-100 hover:border-orange-700 hover:bg-orange-200 rounded-2xl border-2'>X</div>
                </div>))}
            
            
        </div>
        {newNote && <NewNote toggleNewNote={toggleNewNote} />}
        <div onClick={() => {toggleNewNote(!newNote)}} className='cursor-pointer shadow-md font-bold text-3xl absolute -right-0.5 top-full border-2 border-green-500 bg-green-200 hover:border-green-600 hover:bg-green-300 py-2 px-4 rounded-b-lg'>Dodaj</div>
    </div>
    
    </>
  )
}

export default Notes