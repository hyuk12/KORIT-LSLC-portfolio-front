/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const route=css`
  font-size: 16px;
  font-weight: 400;
`;
/*
  세로로 바꿔주는 함수
*/

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
/*
  TabPanel은 Tab 내용 함수
*/
function TabPanel({ children, value, index, scheduleData, ...other }) {
  const scheduleDay = scheduleData[index];
  if (!scheduleDay) {
    return null; // or any other fallback behavior
  }
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
            {scheduleDay.date}
            {scheduleDay.coordinates.map((coordinate, coordIndex) => (
              <div css={route} key={coordIndex}>
                place {coordIndex} : {coordinate.addr}
                {/* lat: {coordinate.lat} lng: {coordinate.lng} */}
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
  scheduleData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(
        PropTypes.shape({
          addr: PropTypes.string.isRequired,
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};



export default function VerticalTabs({ scheduleData }) {
  const storedTab = localStorage.getItem('selectedTab');
  const initialTab = storedTab
    ? scheduleData.findIndex((day) => day.date === storedTab) : 0;
  const [value, setValue] = useState(initialTab >= 0 ? initialTab : 0);

  console.log(scheduleData);
  useEffect(() => {
    if (scheduleData.length > 0) {
      localStorage.setItem('selectedTab', scheduleData[value].date);
      localStorage.setItem('selectedSchedule', JSON.stringify(scheduleData[value]));
      localStorage.setItem('markers', JSON.stringify(scheduleData[value].coordinates));
    }
  }, [value, scheduleData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (!scheduleData || scheduleData.length === 0) {
    return <div>No schedule data available.</div>; // or any other fallback behavior
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {scheduleData.map((day, index) => (
          <Tab label={day.date} {...a11yProps(index)} key={day.date} />
        ))}
      </Tabs>
      {scheduleData.map((day, index) => (
        <TabPanel value={value} index={index} key={day.date} scheduleData={scheduleData} />
      ))}
    </Box>
  );
}


