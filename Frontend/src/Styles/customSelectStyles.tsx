export const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "#414141",
    borderColor: "#dededee0",
    color: "#fff",
    border: state.isFocused
      ? "2px solid #dededee0"
      : "2px solid transparent",    boxSizing: "border-box",
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "6px",
    boxShadow: "none",
     "&:hover": {
    border: state.isFocused
      ? "2px solid #dededee0"
      : "2px solid #dededee0",
  },  
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#303030",
    color: "#fff",
  }),

    option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#505050" : "#303030",
    color: "#fff",
    cursor: "pointer",
  }),

  input: (base: any) => ({
  ...base,
  color: "#fff",
}),

};
