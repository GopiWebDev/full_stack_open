const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs ? blogs.reduce((prev, curr) => curr.likes + prev, 0) : 0
}

module.exports = {
  dummy,
  totalLikes,
}
