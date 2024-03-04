import { useEffect, useState } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import { createDiaryEntry, getAllDiaryEntries } from './diaryService';


const App = () => {

  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({ date: "", visibility: "", weather: "", comment: "" });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    if (newDiaryEntry) {
      event.preventDefault()
      createDiaryEntry(newDiaryEntry)
        .then(data => {
          setDiaryEntries(diaryEntries.concat(data));
          setError("");
        })
        .catch(function (error): any {
          setError(error.response.data)
        })
    }


    setNewDiaryEntry({ date: "", visibility: "", weather: "", comment: "" })
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {error != "" && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={diaryEntryCreation}>
        <div>date<input type="date" value={newDiaryEntry?.date} onChange={(event) => setNewDiaryEntry({ ...newDiaryEntry, date: event.target.value })} /></div>
        <div>visibility
          great<input type="radio" name="filter1" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, visibility: "great" })} />
          good<input type="radio" name="filter1" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, visibility: "good" })} />
          ok<input type="radio" name="filter1" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, visibility: "ok" })} />
          poor<input type="radio" name="filter1" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, visibility: "poor" })} />
        </div>
        <div>weather
          sunny<input type="radio" name="filter2" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, weather: "sunny" })} />
          rainy <input type="radio" name="filter2" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, weather: "rainy" })} />
          cloudy<input type="radio" name="filter2" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, weather: "cloudy" })} />
          stormy<input type="radio" name="filter2" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, weather: "stormy" })} />
          windy<input type="radio" name="filter2" onChange={() => setNewDiaryEntry({ ...newDiaryEntry, weather: "windy" })} />
        </div>
        <div>comment<input value={newDiaryEntry?.comment} onChange={(event) => setNewDiaryEntry({ ...newDiaryEntry, comment: event.target.value })} /></div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      <ul>
        {diaryEntries.map(diaryEntry =>
          <div key={diaryEntry.id} >
            <h3>{diaryEntry.date}</h3>
            visibility: {diaryEntry.visibility} <br />
            weather: {diaryEntry.weather}
          </div>
        )}
      </ul>
    </div>
  )
}

export default App;