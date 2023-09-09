import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hook/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
export const Header = () => {
  const [destination, setDestination] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });
  const [rangeDate, setRangeDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDate, setShowDate] = useState(false);

  const counterOptions = (title, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [title]: operation === "inc" ? options[title] + 1 : options[title] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="headerSearchInput"
            placeholder="where to go?"
            name="distination"
            id="distination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setShowDate(!showDate)}>
            {`${format(rangeDate[0].startDate,'MM/dd/yyyy')} To ${format(rangeDate[0].endDate,'MM/dd/yyyy')}`}
          </div>
          {showDate && (
            <DateRange
              ranges={rangeDate}
              onChange={(date) => setRangeDate([date.selection])}
              minDate={new Date()}
              className="date"
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setShowOption(!setOptions)}>
            {options.adult} adult &bull;&nbsp;{options.children} children
            &bull;&nbsp;
            {options.room} room
          </div>
          {showOption && (
            <GuestOptionList
              expetionId="optionDropDown"
              options={options}
              setShowOption={setShowOption}
              onClick={counterOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

function GuestOptionList({ options, onClick, setShowOption, expetionId }) {
  const refElement = useRef();
  useOutsideClick(refElement, () => setShowOption(false), expetionId);
  return (
    <div className="guestOptions" ref={refElement}>
      <OptionItem
        title="adult"
        options={options}
        onClick={onClick}
        minLimit={1}
      />
      <OptionItem
        title="children"
        options={options}
        onClick={onClick}
        minLimit={0}
      />
      <OptionItem
        title="room"
        options={options}
        onClick={onClick}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ title, options, minLimit, onClick }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{title}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[title] <= minLimit}
          onClick={() => onClick(title, "dec")}
        >
          <HiMinus />
        </button>
        <span className="optionText">{options[title]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => onClick(title, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
