import React, { useState } from "react";
import Select, { components } from "react-select";

const CheckboxOption = (props) => (
  <div>
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{
          marginRight: "8px",
          color: props.isSelected ? "white" : "inherit",
        }}
      />{" "}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const MultiSelectWithCheckboxes = ({
  id,
  value,
  optionsList,
  placeholder,
  setFormData,
  formData,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  // Custom styles for the select dropdown component
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "unset", // Adjust height as needed
      border: state.isFocused ? "1px solid #18a587" : "1px solid #18a587",
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: "1px solid #18a587",
      },
      color: "inherit",
      fontSize: "inherit",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "inherit",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#18a587"
        : state.isFocused
        ? "#0d6efd"
        : provided.backgroundColor,
      color: state.isFocused || state.isSelected ? "white" : "inherit",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#18a587", // Adjust multi-value background color
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff", // Adjust multi-value label color
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff", // Adjust multi-value remove icon color
      ":hover": {
        backgroundColor: "#f0142f", // Adjust remove icon hover background color
      },
    }),
  };

  // On change event for the select dropdown
  const onChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, [id]: selectedValues });
  };

  return (
    <Select
      id={id}
      value={value?.map((val) =>
        optionsList.find((option) => option.value === val)
      )}
      options={optionsList}
      onChange={(option, action) => {
        onChange(option);
        if (
          action.action === "select-option" ||
          action.action === "deselect-option"
        ) {
          setMenuIsOpen(true);
        }
      }}
      isMulti
      styles={customStyles}
      components={{ Option: CheckboxOption }} // Use custom option component
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={placeholder}
      menuIsOpen={menuIsOpen}
      hideSelectedOptions={false}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
    />
  );
};

export default MultiSelectWithCheckboxes;
