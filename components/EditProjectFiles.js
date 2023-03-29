import React, { useRef, useEffect, useState } from 'react'
import checkSize from '../lib/checkSize';

function EditProjectFiles({currentEditingProject, setCurrentEditingProject, }) {

    ///* INPUT *///
    const inputRef = useRef(null)

    ///THIS ARRAY IS USED TO SHOW THE USER THE ROWS WITH FILES
    const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);

    const [filesToBeSentToForm, setFilesToBeSentToForm] = useState([])

    ///THIS OBJECT IS USED TO MAKE SURE ALL OBJECTS ARE TRANSFERRED BEFORE THE UPLOAD TO THE SERVER. - It will soon have the properties of filesUploaded and filesNeededToUpload
    const [filesNumber, setFilesNumber] = useState({})

    ///ONCE ALL FILES HAVE BEEN THROUGH THE FILEREADER, UPLOAD THEM INTO THE CurrentEditingProject FORM
    useEffect(() => {
        
        if (filesNumber?.filesUploaded === filesNumber?.filesNeededToUpload) {
            // console.log('ready to go')
            setCurrentEditingProject(prevState => ({
                ...prevState,
                project_files: filesToBeSentToForm,
            }))
        }
    }, [filesNumber])



    ///ON CLICK EVENT STARTS HERE
    const addFile = (e) => {

        ///1.It resets the array showing files on the upload event, and enables the FilesNumber variable to show and tell user about the upload process.
        ///2.It creates new rows based on user's input.
        ///3.It reads the uploaded files as BinaryString, on every load


        /////reset the uploaded files -dev
        // setSelectedFilesInfo([])
        

        ////THIS IS THE SECURITY THAT ALLOWS US TO TELL IF EVERYTHING HAS BEEN UPLOADED
        setFilesNumber(prevState => ({
            filesUploaded: prevState?.filesUploaded || 0,
            filesNeededToUpload: (prevState?.filesNeededToUpload ? prevState?.filesNeededToUpload + e.target.files.length : e.target.files.length)
        }))

        /////////////
        ///////////// ADD FILES INTO THE FORM
        /////////////

        //////FOR EVERY FILE, use FILEREADER and add data to the newSelectedFiles
        Object.keys(e.target.files).forEach(item => {
            ///reader
            const reader = new FileReader();
            ///THE UPLOADED FILE
            const file = e.target.files[item];
            
            ////NEW ROW TO THE FILES ROW
            setSelectedFilesInfo(prevState => ([...prevState, {
                name: file.name,
                size: checkSize(file.size)
            }]))

            /////READ IT AS BINARY
            // reader.readAsBinaryString(file);

            /////READ IT AS DataURL
            reader.readAsDataURL(file);

            /////ONLOAD - add +1 number to the filesNumber.filesUploaded, if filesUploaded === filesNeededToUpload, allow user to upload files
            reader.onload = (e) => {

              ////PUSH THE NEW FILE TO THE filesToBeSentToForm array - once it's safe and okay we will attach it to the form
              setFilesToBeSentToForm(prevState => ([
                ...prevState,
                {
                    name: file.name,
                    size: checkSize(file.size),
                    file: reader.result
                  }
              ]))

              /////ADD +1 TO filesNumber.filesUploaded, ONCE THE LOADING IS COMPLETE
              setFilesNumber(prevState => ({
                ...prevState,
                filesUploaded: prevState.filesUploaded + 1
              }))
            }
          })
    }

    ///THIS IS THE FUNCTION THAT
    const deleteFile = async (file, server) => {
      // console.log(currentEditingProject, file)

      ///////////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      ////IF THIS IS A FILE THAT ALREADY EXISTS ON THE SERVER, CALL API TO DELETE IT TOO
      if (server) {
        console.log('From Server')
      //USE API TO DELETE FILE FROM SERVER
        await fetch(`/api/filedelete`, {
          method: 'POST',
          body: JSON.stringify({
            project: currentEditingProject,
            fileToDelete: file
          })
        })


        console.log('aaa', currentEditingProject)
        // await fetch(`/api/projects/update/${currentEditingProject._id}`, {
        //   method: 'POST',
        //   body: JSON.stringify(newProjectFilesInfo)
        // })

        const newProjectFiles = currentEditingProject.project_files.filter(item => (item.name !== file.name && item.size !== file.size));
        const newProjectFilesInfo = currentEditingProject.project_filesInfo.filter(item => (item.name !== file.name && item.size !== file.size));
        console.log(newProjectFilesInfo, currentEditingProject)

        ///also
        await fetch(`/api/fileupdate/${currentEditingProject._id}`, {
          method: 'PUT',
          body: JSON.stringify(newProjectFilesInfo)
        })


        setCurrentEditingProject(prevState => ({
          ...prevState,
          project_files: newProjectFiles,
          project_filesInfo: newProjectFilesInfo
        }))

        ///DELETE THE file Rows from the current editing project
      
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      ///THIS IS JUST A FILE THAT WE UPLOADED RIGHT NOW, NO NEED TO CALL THE SERVER
      } else {
        console.log('From Form')

        //DELETE IT FROM THE FORM
        console.log(filesToBeSentToForm)
        const newProjectFiles = filesToBeSentToForm.filter(item => (item.name !== file.name && item.size !== file.size));
        console.log(newProjectFiles, filesToBeSentToForm)


        setFilesToBeSentToForm(newProjectFiles)


        //DELETE IT FROM THE selectedFilesInfo
        const newSelectedFilesInfo = selectedFilesInfo.filter(item => (item.name !== file.name && item.size !== file.size))
        setSelectedFilesInfo(newSelectedFilesInfo)

        ///BUGFIX, filesUploaded AND filesNeededToUpload cannot reach 0 / 0
        if(newSelectedFilesInfo.length === 0) {
          setFilesNumber({})
        } else {
          setFilesNumber(prevState => ({
            filesUploaded: prevState.filesUploaded -1,
            filesNeededToUpload: prevState.filesNeededToUpload -1
          }))
        }

        
      }
      
    }

  return (
    <div className='w-1/2 mt-2 px-2 border-l-2 border-gray-500'>

        {/* FILES MENU */}
        <div className='flex justify-between items-center my-2 mx-2 border-b-4 border-gray-500 pb-3'>
            <p className='text-xl font-bold'>PLIKI: <span>{filesNumber?.filesUploaded} / {filesNumber?.filesNeededToUpload} </span></p>
            <div>
                <button onClick={() => {inputRef.current.click()}} className='mr-2 border-4 cursor-pointer rounded-lg font-bold p-2 bg-green-200 border-green-400 hover:bg-green-300'>Dodaj</button>
                <button onClick={() => {}} className='border-4 cursor-pointer rounded-lg font-bold p-2 bg-red-200 border-red-400 hover:bg-red-300'>Usuń</button>
                <input name='project_files' onChange={addFile} hidden ref={inputRef} type='file' multiple />
            </div>
        </div>
        <p className='font-bold text-center'>Zmiany na plikach zachodzą OD RAZU !!!</p>

        {/* /////* WARNING TO WAIT FOR THE FILES TO UPLOAD */}
        <p className='text-xl font-bold text-center text-blue-500'>{filesNumber?.filesUploaded !== filesNumber?.filesNeededToUpload ? 'Poczekaj aż pliki się wgrają.' : ''}</p>

        {/* FILES ROW */}
        <div className='flex flex-col gap-2 overflow-y-auto h-103 overflow-x-hidden'>

        {/* FILE ROWS FROM THE CURRENT PROJECT */}
            {currentEditingProject?.project_filesInfo?.map((file, id) => (
              <div key={id} className='fileRow group bg-gray-300'>
                    <img src='greenmark.svg' className='h-4' alt='' />
                    <p className='break-all text-green-900'>{file.name} <span className='text-gray-60 break-normal'>- ({file.size})</span></p>
                    <div onClick={() => {deleteFile(file, true)}} className='hidden group-hover:block border cursor-pointer rounded-lg font-bold p-1 bg-red-100 text-black active:bg-red-300 active:border-red-600 border-red-400 hover:bg-red-200'>
                        USUŃ
                    </div>
              </div>
            ))}

        {/* FILE ROWS FROM ADDING NEW FILES */}
            {selectedFilesInfo.map((file, id) => (
                <div key={id} className='fileRow group'>
                    <img src='bluemark.svg' className='h-4' alt='' />
                    <p className='break-all'>{file.name} <span className='text-gray-60 break-normal'>- ({file.size})</span></p>
                    <div onClick={() => {deleteFile(file, false)}}  className='hidden group-hover:block border cursor-pointer rounded-lg font-bold p-1 bg-red-100 text-black active:bg-red-300 active:border-red-600 border-red-400 hover:bg-red-200'>
                        USUŃ
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EditProjectFiles