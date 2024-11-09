import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import UserEvent from '@testing-library/user-event'
import { beforeEach, describe, test, vi, expect } from 'vitest'

describe('Blog Test', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 18,
    id: '6707bb52828516e89e04b07a',
  }

  const likesMockHandler = vi.fn()

  beforeEach(() => {
    render(<Blog key={blog.id} blog={blog} updateLike={likesMockHandler} />)
  })

  test('renders only blog title and author', () => {
    expect(screen.getByText(blog.title)).toBeInTheDocument()
    expect(screen.getByText(blog.author)).toBeInTheDocument()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(blog.likes)).toBeNull()
  })

  test('url and likes are show when clicked', async () => {
    const user = UserEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(`likes: ${blog.likes}`)).toBeInTheDocument()
  })

  test('like button clicked twice', async () => {
    const user = UserEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likesMockHandler.mock.calls).toHaveLength(2)
  })
})
