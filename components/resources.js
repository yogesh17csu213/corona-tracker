import React,{useState,useEffect} from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const Resources=(props)=>{
    const [tabs, setTabs] = useState('1');

    const handleChange = (event, newValue) => {
        setTabs(newValue);
    };

    
    return(
        <div className="resources">
            <h1>Hello Resources!!</h1>
            <Container>
                <Box sx={{ width: '100%' }}>
                    <TabContext value={tabs}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Latest News" value="1" />
                            <Tab label="Latest Updates" value="2" /> 
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                        
                        <div className="inner_tabs">
                            <h1>News</h1>
                        </div>
                            
                        
                        </TabPanel>

                        <TabPanel value="2">
                        <div  className="inner_tabs">
                            <h1>Resources</h1>
                        </div>      
                        
                        </TabPanel>





                    </TabContext>
                </Box>
            </Container>
  
        </div>
    )
}
export default Resources