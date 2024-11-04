import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    dispatch(filterChange(e.target.value))
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor='filter'>filter</label>
      <input onChange={handleChange} type='text' id='filter' name='filter' />
    </div>
  )
}

export default Filter
