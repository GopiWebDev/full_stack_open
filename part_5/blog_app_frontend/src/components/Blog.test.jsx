import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import UserEvent from '@testing-library/user-event'

test('renders only blog title and author', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 18,
    id: '6707bb52828516e89e04b07a',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  const toggleable = container.querySelector('.toggleable')
  expect(div).toHaveTextContent('Go To Statement Considered Harmful')
  expect(toggleable).toHaveStyle('display : none')
})

test('blogs/s url and likes are shown when clicked', () => {
  const user = UserEvent.setup()
})
