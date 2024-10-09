const totalLikes = (blogs) => {
  return blogs ? blogs.reduce((prev, curr) => curr.likes + prev, 0) : 0
}

const favoriteBlog = (blogs) => {
  let max = blogs[0]

  for (let i = 0; i < blogs.length; i++) {
    if (max.likes < blogs[i].likes) {
      max = blogs[i]
    }
  }

  return {
    title: max.title,
    author: max.author,
    likes: max.likes,
  }
}

const mostBlogs = (blogs) => {
  const authors = {}
  for (let i = 0; i < blogs.length; i++) {
    authors[blogs[i].author] = 1 + (authors[blogs[i].author] || 0)
  }

  const author = Object.entries(authors).reduce((a, b) => (b[1] > a[1] ? b : a))
  return { author: author[0], blogs: author[1] }
}

const mostLikes = (blogs) => {
  const authors = {}
  for (let i = 0; i < blogs.length; i++) {
    if (authors[blogs[i].author]) {
      authors[blogs[i].author] += blogs[i].likes
    } else {
      authors[blogs[i].author] = blogs[i].likes
    }
  }

  const author = Object.entries(authors).reduce((a, b) => (b[1] > a[1] ? b : a))

  return { author: author[0], likes: author[1] }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
