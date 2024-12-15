import { useEffect, useState } from 'react';
import { getDiaries, addDiary } from './diaryServices';
import { Diary, NewDiaryEntry, Weather, Visibility } from './types';
import zod from 'zod';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const [notify, setNotify] = useState<string | null>(null);

  useEffect(() => {
    getDiaries().then((res) => setDiaries(res));
  }, []);

  if (!diaries) return <div>Loading....</div>;

  const submitDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const object: NewDiaryEntry = {
        date,
        visibility: zod.nativeEnum(Visibility).parse(visibility),
        weather: zod.nativeEnum(Weather).parse(weather),
        comment,
      };

      const newDiary = await addDiary(object);
      setDiaries((diaries) => diaries.concat(newDiary));

      setDate('');
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment('');
    } catch (error: unknown) {
      if (error instanceof zod.ZodError) {
        showError(error.errors.map((e) => e.message).join(', '));
      } else if (axios.isAxiosError(error)) {
        showError(
          error.response?.data?.message ||
            'An error occurred while submitting the diary.'
        );
      } else {
        showError('An unexpected error occurred.');
      }
    }
  };

  const showError = (errorMessage: string) => {
    setNotify(errorMessage);

    setTimeout(() => {
      setNotify(null);
    }, 5000);
  };

  const filterSelected = (val: Visibility) => {
    setVisibility(val);
  };

  const changeWeather = (val: Weather) => {
    setWeather(val);
  };

  return (
    <div>
      <form onSubmit={submitDiary}>
        <h2>Add new entry</h2>
        <div style={{ color: 'red' }}>
          <h3>{notify}</h3>
        </div>
        <div>
          <label htmlFor='date'>date</label>
          <input
            type='date'
            id='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility {'      '}
          <label htmlFor='great'>great</label>
          <input
            type='radio'
            name='visibility'
            id='great'
            onChange={() => filterSelected(Visibility.Great)}
            defaultChecked
          />
          <label htmlFor='good'>good</label>
          <input
            type='radio'
            name='visibility'
            id='good'
            onChange={() => filterSelected(Visibility.Good)}
          />
          <label htmlFor='ok'>ok</label>
          <input
            type='radio'
            name='visibility'
            id='ok'
            onChange={() => filterSelected(Visibility.Ok)}
          />
          <label htmlFor='poor'>poor</label>
          <input
            type='radio'
            name='visibility'
            id='poor'
            onChange={() => filterSelected(Visibility.Poor)}
          />
        </div>
        {/* Weather Radio Button */}
        <div>
          weather {'                 '}
          <label htmlFor='sunny'>sunny</label>
          <input
            type='radio'
            name='weather'
            id='sunny'
            onChange={() => changeWeather(Weather.Sunny)}
            defaultChecked
          />
          <label htmlFor='rainy'>rainy</label>
          <input
            type='radio'
            name='weather'
            id='rainy'
            onChange={() => changeWeather(Weather.Rainy)}
          />
          <label htmlFor='cloudy'>cloudy</label>
          <input
            type='radio'
            name='weather'
            id='cloudy'
            onChange={() => changeWeather(Weather.Cloudy)}
          />
          <label htmlFor='stormy'>stormy</label>
          <input
            type='radio'
            name='weather'
            id='stormy'
            onChange={() => changeWeather(Weather.Stormy)}
          />
          <label htmlFor='windy'>windy</label>
          <input
            type='radio'
            name='weather'
            id='windy'
            onChange={() => changeWeather(Weather.Windy)}
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
