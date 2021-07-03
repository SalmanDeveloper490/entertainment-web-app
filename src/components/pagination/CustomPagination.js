import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./CustomPagination.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const CustomPaginationn = ({ setPage, totalPages }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="custom__pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={totalPages}
          color="secondary"
          hideNextButton
          hidePrevButton
          onChange={(e) => handlePageChange(e.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPaginationn;
