import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
    const { children, value, index, scheduleDays, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: value }}>
            <Typography>{scheduleDays.format('YYYY-MM-DD')}</Typography>
            {children}
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
  };
  
  export default function VerticalTabs({ scheduleDays }) {
    const [value, setValue] = React.useState(0);
  
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
          <TabPanel value={value} index={index} key={day.toString()} scheduleDays={day}>
            Item {index + 1}
          </TabPanel>
        ))}
      </Box>
    );
  }
  