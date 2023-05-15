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

function TabPanel({ children, value, index, paths, scheduleData, ...other }) {
  const scheduleDay = scheduleData[index];
  const storedTabPath = localStorage.getItem(scheduleDay.date);
  const [tabPaths, setTabPaths] = useState([]);

  useEffect(() => {
    if (storedTabPath) {
      const selectedTabPath = JSON.parse(storedTabPath);
      setTabPaths(selectedTabPath);
    } else {
      setTabPaths([]);
    }
  }, [storedTabPath]);

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
            {scheduleDay.date}
            {tabPaths.map((coordinate, coordIndex) => (
              <div css={route} key={coordIndex}>
                place {coordIndex} : {coordinate.addr}
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
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      addr: PropTypes.string.isRequired,
    })
  ).isRequired,
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
  const [paths, setPaths] = useState([]);
  
  
  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      const selectedTabDate = scheduleData[value].date;
      const selectedTabPath = JSON.parse(localStorage.getItem(selectedTabDate));

      // Check if the selected schedule's coordinates exist in localStorage
      if (selectedTabPath) {
        setPaths(selectedTabPath);
      } else {
        // Fetch the coordinates from the selected schedule
        const selectedSchedule = scheduleData[value];
        const selectedScheduleCoordinates = selectedSchedule.coordinates;

        // Update the localStorage and set the paths
        localStorage.setItem('selectedTab', selectedTabDate);
        localStorage.setItem('selectedSchedule', JSON.stringify(selectedSchedule));
        localStorage.setItem('markers', JSON.stringify(selectedScheduleCoordinates));
        setPaths(selectedScheduleCoordinates);

        // Update the dataStructor array with the selected schedule's coordinates
        const updatedDataStructor = scheduleData.map((day) => {
          if (day.date === selectedTabDate) {
            return {
              ...day,
              coordinates: selectedScheduleCoordinates,
            };
          } else {
            return day;
          }
        });
        localStorage.setItem('dataStructor', JSON.stringify(updatedDataStructor));
      }
    }
  }, [value, scheduleData]);
  
  const handleChange = (event, newValue) => {
    const previousTabDate = scheduleData[value].date;
    const previousTabPath = JSON.stringify(scheduleData[value].coordinates);
    localStorage.setItem(previousTabDate, previousTabPath);
    localStorage.removeItem('markers');

    setValue(newValue);

    const selectedTabDate = scheduleData[newValue].date;
    const selectedTabPath = JSON.parse(localStorage.getItem(selectedTabDate));
    setPaths(selectedTabPath || []);
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
      {/* <button onClick={pathSaveClickHandle}>확인DB에 저장하는것.</button> */}
    </Box>
  );
}

VerticalTabs.propTypes = {
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


/*
[
  {
    id:1,
    date:'일자',
    location:
    [
      {
        addr:
        lat:
        lng:

      }

    ]
  
  }
]
*/