import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
    />
  );
}


export default Dropdown;