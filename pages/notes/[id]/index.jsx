/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useNote } from './hooks'

// export async function getServerSideProps({params, req, res}) {
//   const response = await fetch(`http://localhost:3000/api/notes/${params.id}`)

//   // so much power!
//   if (!response.ok) {
//     res.writeHead(302, { Location: '/notes' })
//     res.end()
//     return { props: {} }
//   }

//   const {data} = await response.json()
  
//   if (data) {
//     return {
//       props: {note: data}
//     }
//   }
// }

const NoteDetail = () => {
  const router = useRouter();

  // Somethimes this is empty when the page is rendered... how is this possible?
  console.log(router.query);

  // Unused currently
  const note = useNote(router.query.id)

  return (
    <div sx={{ variant: 'containers.page' }}>
      {!note ? (<h1>Loading</h1>) : (
        <h1>Note: {note.title} </h1>
      )}
    </div>
  )
}

export default NoteDetail