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

module.exports = {
  totalLikes,
  favoriteBlog,
}
