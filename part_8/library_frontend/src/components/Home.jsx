import Authors from './Authors'

const Home = ({ token }) => {
  return (
    <>
      <h1>Home</h1>
      <Authors token={token} />
    </>
  )
}

export default Home
