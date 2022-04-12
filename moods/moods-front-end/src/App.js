import './App.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [dateDataRaw, setDateData] = useState([
    {
        "dateString": "Mon Mar 21 2022",
        "moodRank": 29
    },
    {
        "dateString": "Tue Mar 22 2022",
        "moodRank": 43
    },
    {
        "dateString": "Wed Mar 23 2022",
        "moodRank": 57
    },
    {
        "dateString": "Thu Mar 24 2022",
        "moodRank": 71
    },
    {
        "dateString": "Fri Mar 25 2022",
        "moodRank": 71
    },
    {
        "dateString": "Sat Mar 26 2022",
        "moodRank": 57
    },
    {
        "dateString": "Sun Mar 27 2022",
        "moodRank": 43
    },
    {
        "dateString": "Mon Mar 28 2022",
        "moodRank": 43
    },
    {
        "dateString": "Tue Mar 29 2022",
        "moodRank": 57
    },
    {
        "dateString": "Wed Mar 30 2022",
        "moodRank": 43
    },
    {
        "dateString": "Thu Mar 31 2022",
        "moodRank": 43
    },
    {
        "dateString": "Fri Apr 01 2022",
        "moodRank": 57
    },
    {
        "dateString": "Sat Apr 02 2022",
        "moodRank": 57
    },
    {
        "dateString": "Sun Apr 03 2022",
        "moodRank": 71
    },
    {
        "dateString": "Mon Apr 04 2022",
        "moodRank": 43
    },
    {
        "dateString": "Tue Apr 05 2022",
        "moodRank": 57
    },
    {
        "dateString": "Wed Apr 06 2022",
        "moodRank": 71
    },
    {
        "dateString": "Thu Apr 07 2022",
        "moodRank": 57
    },
    {
        "dateString": "Thu Apr 07 2022",
        "moodRank": 57
    },
    {
        "dateString": "Fri Apr 08 2022",
        "moodRank": 57
    },
    {
        "dateString": "Sat Apr 09 2022",
        "moodRank": 43
    },
    {
        "dateString": "Sun Apr 10 2022",
        "moodRank": 43
    },
    {
        "dateString": "Mon Apr 11 2022",
        "moodRank": 71
    }
]);
  const [range, setRange] = useState(0);
  const dateData = [
    ...dateDataRaw,
    {
      dateString: date.toDateString(),
      moodRank: range
    }
  ];

  function getBackground({date, view}) {
      if (view !== 'month') return null;
      const dateStr = date.toDateString();
      const data = dateData.find(o => o.dateString == dateStr);
      if (data == undefined) return null;
      const {moodRank} = data;
      return <UnderneathTile mood={moodRank / 100} />
  }

  const content = <div className="UnderneathTile"></div>;

  return (
    <div className="App">
      <Calendar tileContent={getBackground} className="Calendar" onChange={setDate} value={date} />
      <textarea></textarea>
      <input type="range" value={range} onChange={e => setRange(e.target.value)} /> <br />
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <button style={{fontSize: "1.5rem", padding: "0.3rem 1rem"}}> save </button>
      </div>
    </div>
  );
}

function UnderneathTile(props) {
  const {mood} = props;
  function calcColor() {
    const range = [[255, 111], [255, 0], [255, 255]]; //rgb start - end
    function moodpoint([a, b]) {
      if (a == b) return a;
      const subtract = a > b;
      const diff = Math.abs(a - b);
      const distance = diff * mood;
      return subtract ? a - distance : a + distance;
    }
    const [r, g, b] = range.map(moodpoint);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return (
    <div className="UnderneathTile" style={{backgroundColor: calcColor()}}>

    </div>
  )
}

export default App;
