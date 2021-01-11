/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault()

    const res = await fetch(`http://localhost:3000/api/notes/`, {
      method: 'POST',
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
    <div sx={{variant: 'containers.page'}}>
      <h1>Add Note</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" onChange={(event) => setTitle(event.target.value)} value={title} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default Page