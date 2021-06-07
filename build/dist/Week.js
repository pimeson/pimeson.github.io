import styled from "../_snowpack/pkg/styled-components.js";
import React from "../_snowpack/pkg/react.js";
import {useDateHandlers} from "./DateContext.js";
import useScreenWidth from "./hooks/useScreenWidth.js";
export const StyledWeek = styled.div`
  grid-area: base;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;
export default function Week({month, year, ...props}) {
  const {incrementWeek, decrementWeek} = useDateHandlers();
  const width = useScreenWidth();
  return /* @__PURE__ */ React.createElement(StyledWeek, {
    className: "px-6 md:px-12 mb-5",
    ...props
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex mx-1 justify-between"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: decrementWeek,
    className: "text-blue-400 hover:text-gray-100 sm:w-32 px-3 font-extrabold tracking-tight hover:bg-blue-400 py-2 hover:shadow"
  }, width > 700 ? "Last Week" : "Last"), /* @__PURE__ */ React.createElement("h1", {
    className: "font-bold uppercase font text-2xl lead text-blue-600 opacity-70 flex align-text-bottom"
  }, month, " ", /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 ml-1"
  }, year)), /* @__PURE__ */ React.createElement("button", {
    onClick: incrementWeek,
    className: "text-red-400 hover:text-gray-100 sm:w-32 px-3 font-extrabold tracking-tight hover:bg-red-400 py-2 hover:shadow"
  }, width > 700 ? "Next Week" : "Next")), /* @__PURE__ */ React.createElement("div", {
    className: "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-7 mb-8 mt-3"
  }, props.children));
}
