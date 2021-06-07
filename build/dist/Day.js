import React, {useRef, useState} from "../_snowpack/pkg/react.js";
import {format, isToday} from "../_snowpack/pkg/date-fns.js";
import styled from "../_snowpack/pkg/styled-components.js";
import {Mood} from "./DateContext.js";
const moodMap = {
  [Mood.happy]: "bg-green-100 text-green-400",
  [Mood.neutral]: "bg-yellow-100 text-yellow-400",
  [Mood.sad]: "bg-blue-100 text-blue-400"
};
const StyledDay = styled.div`
  .mood-panel {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
`;
const StyledMoodBtn = styled.button`
  padding: 3px;
  display: inline-block;
`;
function MoodBtn({log, mood, onClick, children, currentMood}) {
  const isActive = currentMood === mood;
  return /* @__PURE__ */ React.createElement(StyledMoodBtn, {
    className: `focus:outline-none rounded-full w-12 text-2xl ${isActive ? "border-4 border-opacity-25 border-blue-700" : ""}`,
    log,
    mood: Mood.sad,
    onClick
  }, children);
}
export default function Day({day, setMood, setFeeling, expungeFeeling, ...defaultProps}) {
  const {className: overrideClassNames} = defaultProps;
  const {weekday, date, log} = day;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const descriptorInput = useRef(null);
  let className = overrideClassNames ? overrideClassNames : "flex flex-col bg-white h-96 rounded-lg shadow-md";
  if (isToday(date)) {
    className += " border-4 border-red-700 border-opacity-25";
  }
  const handleMood = (mood, date2) => {
    setCurrentMood(mood);
    setIsFormVisible(true);
    descriptorInput.current && descriptorInput.current.focus();
  };
  const handleDescriptorSubmit = (e) => {
    e.preventDefault();
    if (descriptorInput.current && currentMood !== null) {
      const newDescriptors = descriptorInput.current.value.split(",");
      descriptorInput.current.value = "";
      setFeeling(currentMood, newDescriptors, date);
    }
  };
  return /* @__PURE__ */ React.createElement(StyledDay, {
    className,
    onBlur: (e) => {
      const currentTarget = e.currentTarget;
      window.setTimeout(() => {
        if (!currentTarget.contains(document.activeElement)) {
          setCurrentMood(null);
          setIsFormVisible(false);
        }
      }, 100);
    }
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-center font-semibold text-red-300 p-3"
  }, weekday), /* @__PURE__ */ React.createElement("h2", {
    className: "text-center font-semibold text-gray-600 p-3"
  }, format(date, "d").toUpperCase()), /* @__PURE__ */ React.createElement("div", {
    className: "mood-panel h-12"
  }, /* @__PURE__ */ React.createElement(MoodBtn, {
    log,
    currentMood,
    onClick: () => handleMood(Mood.sad, date),
    mood: Mood.sad
  }, "\u{1F641}"), /* @__PURE__ */ React.createElement(MoodBtn, {
    log,
    currentMood,
    onClick: () => handleMood(Mood.neutral, date),
    mood: Mood.neutral
  }, "\u{1F611}\uFE0F"), /* @__PURE__ */ React.createElement(MoodBtn, {
    log,
    currentMood,
    onClick: () => handleMood(Mood.happy, date),
    mood: Mood.happy
  }, "\u{1F604}\uFE0F")), isFormVisible && /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleDescriptorSubmit,
    className: "flex flex-col justify-center mt-5 p-3 mx-2"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "tracking-tighter text-sm font-medium text-gray-500 ml-0.5",
    htmlFor: `day-descriptor-${weekday}`
  }, `Why did you feel ${currentMood} ${isToday(date) ? "today" : `on ${weekday}`}?`), /* @__PURE__ */ React.createElement("input", {
    autoFocus: true,
    className: "mt-2 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500",
    id: `day-descriptor-${weekday}`,
    type: "text",
    ref: descriptorInput
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex-1"
  }), log?.feelings && /* @__PURE__ */ React.createElement("p", {
    className: "justify-end m-3 flex flex-wrap"
  }, Object.entries(log.feelings).map(([descriptor, mood]) => {
    return /* @__PURE__ */ React.createElement(FeelingChip, {
      key: descriptor,
      expungeFeeling: () => {
        expungeFeeling(descriptor, date);
      },
      descriptor,
      mood
    });
  })));
}
function FeelingChip({descriptor, mood, expungeFeeling}) {
  const [isHover, setIsHover] = useState(false);
  return /* @__PURE__ */ React.createElement("button", {
    onMouseEnter: () => setIsHover(true),
    onMouseLeave: () => setIsHover(false),
    key: descriptor,
    className: `text-sm rounded-full ml-2 py-2 px-5 mt-1 text-left ${moodMap[mood]}`,
    onClick: expungeFeeling
  }, isHover && /* @__PURE__ */ React.createElement("span", {
    className: "text-red-500 font-bold"
  }, "x "), descriptor);
}
