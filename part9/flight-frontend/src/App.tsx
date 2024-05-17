import { useState, useEffect } from 'react';
import axios from 'axios';

import { DiaryEntry } from '../types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        setDiaries(response.data);
      });
  }, []);

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: newDate,
      weather: newWeather,
      comment: newComment,
      visibility: newVisibility,
    };
    try {
      const response = await axios.post<DiaryEntry>(
        'http://localhost:3000/api/diaries',
        newDiary
      );
      setDiaries([...diaries, response.data]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  return (
    <div>
      {errorMessage}
      <form onSubmit={submitForm}>
        <div>
          date
          <input
            type='date'
            value={newDate}
            onChange={event => setNewDate(event.target.value)}
          />
        </div>
        <div>
          weather sunny
          <input
            type='radio'
            value={newWeather}
            onChange={() => setNewWeather('sunny')}
          />
          rainy
          <input
            type='radio'
            value={newWeather}
            onChange={() => setNewWeather('rainy')}
          />
          cloudy
          <input
            type='radio'
            value={newWeather}
            onChange={() => setNewWeather('cloudy')}
          />
          stormy
          <input
            type='radio'
            value={newWeather}
            onChange={() => setNewWeather('stormy')}
          />
          windy
          <input
            type='radio'
            value={newWeather}
            onChange={() => setNewWeather('windy')}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={event => setNewComment(event.target.value)}
          />
        </div>
        <div>
          visibility great{' '}
          <input
            type='radio'
            value={newVisibility}
            onChange={() => setNewVisibility('great')}
          />
          good{' '}
          <input
            type='radio'
            value={newVisibility}
            onChange={() => setNewVisibility('good')}
          />
          ok{' '}
          <input
            type='radio'
            value={newVisibility}
            onChange={() => setNewVisibility('ok')}
          />
          poor{' '}
          <input
            type='radio'
            value={newVisibility}
            onChange={() => setNewVisibility('poor')}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <strong>{diary.date}</strong> {diary.weather} {diary.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
