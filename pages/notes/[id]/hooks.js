import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'

export const useNote = (noteId) => {
  const router = useRouter()
  const [note, setNote] = useState(null)

  useMemo(() => {
    (async function () {
      if (noteId) {
        const response = await fetch(`http://localhost:3000/api/notes/${noteId}`)
  
        // so much power!
        if (!response.ok) {
          // Produce potential side effect here
          router.push('/notes');
          return;
        }
  
        const { data } = await response.json()
  
        if (data) {
          setNote(data)
        }
      }
    })()
  }, [noteId])

  // useEffect(() => {
  //   (async function () {
  //     if (loading) {
  //       const response = await fetch(`http://localhost:3000/api/notes/${noteId}`)
  
  //       // so much power!
  //       if (!response.ok) {
  //         // Produce potential side effect here
  //         router.push('/notes');
  //         return;
  //       }
  
  //       const { data } = await response.json()
  
  //       if (data) {
  //         setLoading(false)
  //         setNote(data)
  //       }
  //     }
  //   })()
  // });

  return note;
}

export default {
  useNote,
}