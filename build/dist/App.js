import React from "../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import styled from "../_snowpack/pkg/styled-components.js";
import Day from "./Day.js";
import Week from "./Week.js";
import {daysOfTheWeek, useDate, useDateHandlers} from "./DateContext.js";
const StyledApp = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 200px 100px auto auto;
  grid-template-areas:
    'header title header2'
    'spacer subtitle spacer2'
    'base   base  base'
    'goals goals goals';

  .subtitle {
    grid-area: subtitle;
  }
`;
const indexByDay = Object.entries(daysOfTheWeek).reduce((map, [index, day]) => {
  return {...map, [day]: Number(index)};
}, {});
const makePrompt = (todayIndex) => {
  if (todayIndex <= 2)
    return "Ready for the week?";
  if (todayIndex <= 5)
    return "How is your week going?";
  return "How was your week?";
};
function App({}) {
  const {
    weekday,
    month,
    year,
    days
  } = useDate();
  const {
    setMood,
    setFeeling,
    expungeFeeling
  } = useDateHandlers();
  const dayIndex = indexByDay[weekday];
  return /* @__PURE__ */ React.createElement(StyledApp, {
    className: "bg-gray-100 antialiased text-gray-800"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "py-6",
    style: {gridArea: "title"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative py-3 sm:max-w-xl sm:mx-auto"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 bg-red-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "relative bg-white shadow-lg rounded-3xl"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-sans font-semibold text-center w-full text-3xl text-gray-500 p-10"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-blue-400"
  }, "Rewind"), " and", " ", /* @__PURE__ */ React.createElement("span", {
    className: "text-red-400"
  }, "Be Kind"))))), /* @__PURE__ */ React.createElement("h3", {
    className: "subtitle text-center mt-10 sm-mt-14 text-lg opacity-60 text-gray-600"
  }, makePrompt(dayIndex)), /* @__PURE__ */ React.createElement(Week, {
    month,
    year
  }, days.map((day) => /* @__PURE__ */ React.createElement(Day, {
    setMood,
    key: day.weekday,
    day,
    setFeeling,
    expungeFeeling
  }))));
}
export default App;
