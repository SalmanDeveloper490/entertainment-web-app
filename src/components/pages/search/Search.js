import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";
import axios from "axios";
import Card from "../../card/Card";
import CustomPagination from "../../pagination/CustomPagination";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState();

  const handleTabs = (e, val) => {
    setType(val);
    setPage(1);
  };

  const fetchSearchResults = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&query=${searchText}&page=${page}`
    );
    setSearchResult(data.results);
    setTotalPages(data.total_pages);
  };

  // console.log(searchText.length);
  // console.log(searchResult);

  // useEffect(() => {
  //   window.scroll(0, 0);
  //   fetchSearchResults();
  //   // eslint-disable-next-line
  // }, [type, page]);

  return (
    <div className="search">
      <ThemeProvider theme={darkTheme}>
        <div className="search__field">
          <TextField
            className="search__box"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearchResults}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="tabs">
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabs}
          >
            <Tab style={{ width: "100%" }} label="Movies" />
            <Tab style={{ width: "100%" }} label="TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="trending">
        {searchText &&
          searchResult &&
          searchResult.map((result) => (
            <Card
              key={result.id}
              id={result.id}
              poster={result.poster_path}
              title={result.title || result.name}
              date={result.first_air_date || result.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={result.vote_average}
            />
          ))}
        {!searchText ? (
          ""
        ) : type ? (
          <h2>No Series Found</h2>
        ) : (
          <h2>No Movies Found</h2>
        )}
      </div>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Search;
