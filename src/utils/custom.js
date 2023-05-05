import { createMuiTheme } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";

export const customReactSelectStyleSystem = {
  option: (styles, state) => ({
    ...styles,
    cursor: "pointer",
  }),
  control: (styles) => ({
    ...styles,
    cursor: "pointer",
  }),
};

export const customReactSelectStyleHeader = {
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    height: "42px",
    boxShadow: state.isFocused ? "0px 3px 8px #3333331a" : "none",
    border: "1px solid #ddd",
    borderRadius: "10px",
    "&:hover": {
      border: "1px solid #ddd",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
  }),
};

export const customReactSelectStyleBanner = {
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    height: "56px",
    boxShadow: "none",
    border: "none",
    borderRadius: "10px",
    "&:hover": {
      border: "none",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    marginLeft: "10px",
    fontSize: "17px",
  }),
  input: (provided) => ({
    ...provided,
    marginLeft: "10px",
    fontSize: "17px",
  }),
  singleValue: (provided) => ({
    ...provided,
    marginLeft: "10px",
    fontSize: "17px",
  }),
  option: (provided, state) => ({
    ...provided,
    paddingLeft: "18px",
    cursor: "pointer",
  }),
};

export const muiThemeV5 = createTheme({
  palette: {
    primary: {
      main: "#7265EB",
    },
    secondary: {
      main: "#617D8A",
    },
    colorhome: {
      main: "#F8B333",
      contrastText: "#fff",
    },
    colorpink: {
      main: "#FF6571",
      contrastText: "#fff",
      dark: "#f94251",
    },
  },
});

export const muiThemeV4 = createMuiTheme({
  palette: {
    primary: {
      main: "#7265EB",
    },
    secondary: {
      main: "#617D8A",
    },
  },
});

export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
};
