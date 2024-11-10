import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const { error, content } = notification

  if (!content) return null

  if (error) {
    return <div className='error'>{content}</div>
  } else {
    return <div className='added'>{content}</div>
  }
}

export default Notification
