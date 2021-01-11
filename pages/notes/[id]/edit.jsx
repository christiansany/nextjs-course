/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useNote } from './hooks'

const NoteEdit = () => {
  const router = useRouter();
  const [title, setTitle] = useState('')

  // Somethimes this is empty when the page is rendered... how is this possible?
  console.log(router.query);

  // Unused currently
  const note = useNote(router.query.id)

  // Potentially dangerous, how can we do this?
  // if (note) {
  //   setTitle(note.title)
  // }

  const onSubmit = async (event) => {
    event.preventDefault()

    const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title })
    })

    if (res.ok) {
      // Should there be some kind of client side state management?
      
      const response = await res.json()
      router.push('/notes/' + response.data.id)
    }
  }

  return (
    <div sx={{ variant: 'containers.page' }}>
      {!note ? (<h1>Loading</h1>) : (
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" onChange={(event) => setTitle(event.target.value)} value={title} />
          <button type="submit">save</button>
        </form>
      )}
    </div>
  )
}

export default NoteEdit