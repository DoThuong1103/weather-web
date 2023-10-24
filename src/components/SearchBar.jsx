import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setSaves,
  setItemSaved,
} from "../service/weatherSlice";
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  ToggleButton,
} from "@mui/material";
import { Search, Star } from "@mui/icons-material";
import { useGetSearchWeatherQuery } from "../service/weatherAPI";
import debounce from "lodash/debounce";
const SearchBar = ({ location }) => {
  const [selected, setSelected] = useState(false);
  const [search, setSearch] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  const dispatch = useDispatch();

  const { data } = useGetSearchWeatherQuery(search);

  const saves = useSelector((state) => state?.weatherState?.saves);

  const getSavedItems = JSON.parse(
    localStorage.getItem("savedItems")
  );

  useEffect(() => {
    if (data) {
      setAutoCompleteList(data);
    }
    if (getSavedItems) {
      dispatch(setSaves(getSavedItems));
    }
  }, [data]);
  const handleSearchDebounced = debounce((value) => {
    setSearch(value);
  }, 3000);
  const handleKeyDown = (e) => {
    handleSearchDebounced(e.target.value);
    if (e.key === "Enter") {
      const elements = document.getElementsByClassName("text");
      if (elements.length > 0) {
        // Lấy phần tử đầu tiên trong HTMLCollection và gọi phương thức click
        elements[0].click();
      }
      e.target.value = "";
    }
  };

  const addSaves = (item) => {
    let itemList = [...saves];
    let addArray = true;
    for (let i = 0; i < saves.length; i++) {
      if (itemList[i].name === item.name) {
        itemList.splice(i, 1);
        addArray = false;
      }
    }
    if (addArray) {
      itemList.push(item);
    }
    dispatch(setSaves([...itemList]));
  };
  useEffect(() => {
    localStorage?.setItem("savedItems", JSON?.stringify(saves));
    const savedItems = JSON?.parse(
      localStorage?.getItem("savedItems")
    );
    if (savedItems) {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].name === localStorage.name) {
          setSelected(true);
          dispatch(setItemSaved(true));
          break;
        } else if (savedItems[i].id !== localStorage.name) {
          setSelected(false);
          dispatch(setItemSaved(false));
        }
      }
    }
    // eslint-disable-next-line
  }, [saves]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}
    >
      <Autocomplete
        sx={{ width: "15rem", padding: 0 }}
        freeSolo
        id="search"
        filterOptions={(x) => x}
        disableClearable
        onChange={(e, value) => dispatch(setLocation(value))}
        options={autoCompleteList?.map((data) => data.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            className="text"
            id="searchField"
            onKeyDown={handleKeyDown}
            onChange={(e) => handleKeyDown(e)}
            placeholder="Search Location"
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
      ></Autocomplete>
      <ToggleButton
        sx={{ width: "4rem" }}
        value="check"
        color="primary"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          addSaves(location);
        }}
      >
        <Star />
      </ToggleButton>
    </Box>
  );
};

export default SearchBar;
