import React, {createContext, useContext, useState, useEffect} from "../_snowpack/pkg/react.js";
import {add, format} from "../_snowpack/pkg/date-fns.js";
export var Mood;
(function(Mood2) {
  Mood2["happy"] = "happy";
  Mood2["neutral"] = "neutral";
  Mood2["sad"] = "sad";
})(Mood || (Mood = {}));
export const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
export const indexByDay = Object.entries(daysOfTheWeek).reduce((map, [index, day]) => {
  return {...map, [day]: Number(index)};
}, {});
const makeWeekdays = (startDate, logs) => {
  const weekday = format(startDate, "eeee");
  const todayIndex = indexByDay[weekday];
  return Object.entries(indexByDay).reduce((days, [weekday2, index]) => {
    const date = add(startDate, {
      days: index - todayIndex
    });
    const existingLog = logs?.[format(date, "yyyy-MM-dd")] ?? null;
    return [
      ...days,
      {
        weekday: weekday2,
        date,
        log: existingLog
      }
    ];
  }, []);
};
const DateContext = createContext(void 0);
const DateHandlersContext = createContext(void 0);
export function DateProvider({children}) {
  const [dailyLogs, setDailyLogs] = useState({});
  useEffect(() => {
    const previousRecords = localStorage.getItem("records");
    if (previousRecords) {
      setDailyLogs(JSON.parse(previousRecords));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(dailyLogs));
  }, [dailyLogs]);
  const setMood = (mood, date) => {
    setDailyLogs({
      ...dailyLogs,
      [format(date, "yyyy-MM-dd")]: {
        ...dailyLogs[format(date, "yyyy-MM-dd")],
        mood,
        date: format(date, "yyyy-MM-dd")
      }
    });
  };
  const setFeeling = (mood, descriptors, date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const prevLog = dailyLogs[formattedDate];
    const prevFeelings = prevLog?.feelings ?? {};
    const feelings = descriptors.reduce((acc, d) => ({...acc, [d]: mood}), prevFeelings);
    setDailyLogs({
      ...dailyLogs,
      [formattedDate]: {
        ...prevLog,
        feelings
      }
    });
  };
  const expungeFeeling = (feeling, date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const prevLog = dailyLogs[formattedDate];
    const {[feeling]: prevFeeling, ...rest} = prevLog.feelings;
    setDailyLogs({
      ...dailyLogs,
      [formattedDate]: {
        ...prevLog,
        feelings: rest
      }
    });
  };
  const [startingDate, setStartingDate] = useState(new Date());
  function decrementWeek() {
    setStartingDate(add(startingDate, {days: -7}));
  }
  function incrementWeek() {
    setStartingDate(add(startingDate, {days: 7}));
  }
  const weekday = format(startingDate, "eeee");
  const month = format(startingDate, "MMMM");
  const year = format(startingDate, "yyyy");
  const days = makeWeekdays(startingDate, dailyLogs);
  return /* @__PURE__ */ React.createElement(DateContext.Provider, {
    value: {
      weekday,
      month,
      year,
      days
    }
  }, /* @__PURE__ */ React.createElement(DateHandlersContext.Provider, {
    value: {
      decrementWeek,
      incrementWeek,
      setMood,
      setFeeling,
      expungeFeeling
    }
  }, children));
}
export function useDate() {
  const context = useContext(DateContext);
  if (context === void 0) {
    throw new Error(`useDate must be used within a DateProvider`);
  }
  return context;
}
export function useDateHandlers() {
  const context = useContext(DateHandlersContext);
  if (context === void 0) {
    throw new Error(`useDateHandlers must be used within a DateProvider`);
  }
  return context;
}
