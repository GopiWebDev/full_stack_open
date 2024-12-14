import { useEffect, useState } from 'react';
import { getDiaries } from './diaryServices';
import { Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getDiaries().then((res) => setDiaries(res));
  }, []);

  if (!diaries) return <div>Loading....</div>;

  return (
    <div>
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
