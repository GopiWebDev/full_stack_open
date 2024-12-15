import { useEffect, useState } from 'react';
import { getDiaries, addDiary } from './diaryServices';
import { Diary, NewDiaryEntry, Weather, Visibility } from './types';
import zod from 'zod';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getDiaries().then((res) => setDiaries(res));
  }, []);

  if (!diaries) return <div>Loading....</div>;

  const submitDiary = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const object: NewDiaryEntry = {
      date,
      visibility: zod.nativeEnum(Visibility).parse(visibility),
      weather: zod.nativeEnum(Weather).parse(weather),
      comment,
    };
    console.log(object);

    addDiary(object).then((d) => setDiaries(diaries.concat(d)));
  };

  return (
    <div>
      <form onSubmit={submitDiary}>
        <h2>Add new entry</h2>
        <div style={{ color: 'red' }}></div>
        <br />
        <div>
          <label htmlFor='date'>date</label>
          <input
            type='text'
            id='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='visibility'>visibility</label>
          <input
            type='text'
            name='visibility'
            id='visibility'
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='weather'>weather</label>
          <input
            type='text'
            name='weather'
            id='weather'
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='comment'>comment</label>
          <input
            type='text'
            name='comment'
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
      <h1>Diary Entries</h1>
      {diaries &&
        diaries.map((diary, i) => {
          return (
            <div key={`${diary}${i}`}>
              <h2>{diary.date}</h2>
              <div>
                <p>visibility: {diary.visibility}</p>
                <p>weather: {diary.weather}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
