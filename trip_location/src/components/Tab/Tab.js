/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const route=css`
  font-size: 16px;
  font-weight: 400;
`;

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index, scheduleDays, coordinates, ...other }) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ px: 2, py: 1 }}>
            {scheduleDays.format('YYYY-MM-DD')}
            {coordinates.map(coordinate => (
              <div css={route}>
                Latitude: {coordinate.lat}, Longitude: {coordinate.lng}
              </div>
            ))}
          </Typography>
          <Box sx={{ flexGrow: 1, px: 2 }}>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  scheduleDays: PropTypes.instanceOf(dayjs).isRequired,
  coordinates: PropTypes.shape({
    date: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })
};

export default function VerticalTabs({ scheduleDays, coordinates }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {scheduleDays.map((day, index) => (
          <Tab label={day.format('YYYY-MM-DD')} {...a11yProps(index)} key={day.toString()} />
        ))}
      </Tabs>
      {scheduleDays.map((day, index) => (
        <TabPanel
          value={value}
          index={index}
          key={day.toString()}
          scheduleDays={day}
          coordinates={coordinates}
        >
        </TabPanel>
      ))}
    </Box>
  );
}
