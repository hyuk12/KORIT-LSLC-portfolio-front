import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

export default function StandaloneToggleButton(props) {
  const { onClick } = props;
  const [selected, setSelected] = useState(false);

  const handleToggle = () => {
    setSelected(!selected);
    onClick(!selected);
  };

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={handleToggle}
    >
      <CheckIcon />
    </ToggleButton>
  );
}
