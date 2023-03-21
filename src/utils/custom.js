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
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
  }),
};
