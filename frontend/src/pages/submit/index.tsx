import Layout from "@/components/layout"
import { Input, Button, Textarea } from '@/components/form'
import { useEffect, useState } from "react"
import { createPost } from "@/services/post"
import { useToasts } from 'react-toast-notifications'
import { useNavigate } from "react-router-dom"
import './index.css'

export default function() {

  const { addToast } = useToasts()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const navigate = useNavigate()

  const submitHandle = async () => {
    if (!title) {
      addToast('Please input title', {
        appearance: 'warning'
      })
      return 
    }
    if (!desc) {
      addToast('Please input desc', {
        appearance: 'warning'
      })
      return 
    }
    try {
      await createPost({ title, desc })
      addToast('Add post successed', {
        appearance: 'success'
      })
      navigate('/')
    } catch (err: any) {
      addToast(err.message, {
        appearance: 'error'
      })
    }
  }

  return (
    <Layout>
      <div className="create-post-wrapper">
        <form>
          <Input label="Title" onChange={setTitle}  />
          <Textarea label="Desc" onChange={setDesc}  />
          <Button onClick={submitHandle} />
        </form>
      </div>
    </Layout>
  )
}