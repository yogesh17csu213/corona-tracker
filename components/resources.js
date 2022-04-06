import React,{useState,useEffect} from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SingleCard from "./card";

const Resources=(props)=>{
    const [tabs, setTabs] = useState('1');
    const [resourcesTabs,setRosourceTabs]=useState(0)
    const {news,resources}=props
    const handleChange = (event, newValue) => {
        setTabs(newValue);
    };

    let list=resources.tabs[resourcesTabs]?.values.map((data,index)=>{
        return(
            <a><li>{data.text}</li></a>
        )
    })
    
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
                        
                        <div className="inner_tabs center">
                            <h1>News</h1>
                            <Container>
                                <Row>
                                    {
                                        news?.map((obj,index)=>{
                                            return(
                                                <Col key={index} sm={4} className="mb-1">
                                                    <SingleCard data={obj}/>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Container>
                        </div>
                        
                        </TabPanel>
                        <TabPanel value="2">
                        <div  className="inner_tabs">
                            <h1 style={{ textAlign:"center" }}>Resources</h1>
                            <div className="resources_tabs">
                            <Container>
                                <Row>
                                    <Col sm={4}>
                                        {resources.tabs?.map((obj,index)=>{
                                            return(
                                                <h4 onClick={()=>setRosourceTabs(index)}>{obj.heading}</h4>
                                            )
                                        })}
                                    </Col>
                                    <Col sm={8}>
                                        {list}
                                    </Col>
                                </Row>
                            </Container>
                            </div>
                        </div>      
                        
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
  
        </div>
    )
    }


export default Resources