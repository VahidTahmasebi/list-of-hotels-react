import { useRef, useState } from "react";

import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

import useOutsideClick from "../../../hooks/useOutsideClick";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to go?"
            className="headerSearchInput"
          />
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023</div>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {options.adult} Adult &bull; {options.children} Children &bull;{" "}
            {options.room} Room
          </div>
          {openOption && (
            <GuestOptionList
              options={options}
              setOpenOption={setOpenOption}
              handleOptions={handleOptions}
            />
          )}
          <span className="separator"></span>
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

export default Header;

export function GuestOptionList({ options, setOpenOption, handleOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOption(false));

  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

export function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}>
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}>
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
