/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';



const route=css`
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 5px;
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
  const scheduleDay = scheduleData.find(day => day.id === index +1);
  if (!scheduleDay) {
    return null;
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
            {scheduleDay && scheduleDay.location.map((loc, locIndex) => (
              <span css={route} key={locIndex}>
                place {locIndex} : {loc.addr} <br/>
              </span>
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
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.arrayOf(
        PropTypes.shape({
          addr: PropTypes.string,
          lat: PropTypes.number,
          lng: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default function VerticalTabs({ scheduleData }) {
  const storedTab = localStorage.getItem('selectedTab');
  const initialTab = storedTab ? scheduleData.findIndex((day) => day.date === storedTab) : 0;
  const [value, setValue] = useState(initialTab >= 0 ? initialTab : 0);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      const selectedTabDate = scheduleData[value].date;
      const selectedTabPath = scheduleData[value].location;

      if (selectedTabPath) {
        setPaths(selectedTabPath);
      } else {
        const selectedSchedule = scheduleData[value];
        const selectedSchedulelocation = selectedSchedule.location; 

        localStorage.setItem('selectedTab', selectedTabDate);
        localStorage.setItem('selectedSchedule', JSON.stringify(selectedSchedule));
        localStorage.setItem('markers', JSON.stringify(selectedSchedulelocation));
        setPaths(selectedSchedulelocation);

        const updatedDataStructor = scheduleData.map((day) => {
          if (day.date === selectedTabDate) {
            return {
              ...day,
              location: selectedSchedulelocation,
            };
          } else {
            return day;
          }
        });
        localStorage.setItem("dataStructor", JSON.stringify(updatedDataStructor));
      }
    }
  }, [value, scheduleData]);
  
  const handleChange = (event, newValue) => {
    // const previousTabDate = scheduleData[value].date;
    // const previousTabPath = JSON.stringify(scheduleData[value].location);
    // localStorage.setItem(previousTabDate, previousTabPath);
    localStorage.removeItem('markers');
  
    setValue(newValue);
  
    const selectedTabDate = scheduleData[newValue].date;
    const selectedTabPath = localStorage.getItem(selectedTabDate);
  
    if (selectedTabPath) {
      const parsedTabPath = JSON.parse(selectedTabPath);
      setPaths(parsedTabPath || []);
    } else {
      setPaths([]);
    }
  };
 

  if (!scheduleData || scheduleData.length === 0) {
    return <div>No schedule data available.</div>; 
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
            <Tab
                label={day.date}
                {...a11yProps(index+1)}
                key={day.date}
                disabled={index > 0 && (!scheduleData[index - 1].location.length || !scheduleData[index - 1].location[0].addr)}
            />
        ))}
      </Tabs>
      {scheduleData.map((day, index) => (
        <TabPanel value={value} index={index} key={day.date} scheduleData={scheduleData} />
      ))}
    </Box>
  );
}

VerticalTabs.propTypes = {
  scheduleData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.arrayOf(
        PropTypes.shape({
          addr: PropTypes.string,
          lat: PropTypes.number,
          lng: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
};
