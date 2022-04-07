import React,{useState,useEffect} from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { connect } from 'react-redux'
import {BiUpArrowAlt} from 'react-icons/bi'
import {AiOutlineArrowDown} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import { useParams, useHistory } from "react-router-dom";

export const CUSTOM_STYLE_PERMISSION_DATA_TABLE = {
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#f1f1f1",
        },
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {},
    },
  };
  
const Home=(props)=>{
    const history = useHistory();
    const {countryStats,tableData}=props
    const [filterText,setFilterText]=useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [tableCustomData,setTableCustomData]=useState([
        {
            name: 'S.No',
            selector: row => row.sno,
        },
        {
            name: 'State Name',
            selector: row => row.state_name,
            style: {width: '100px'}
        },
        {
            name: 'Active',
            selector: row =>row.active,
            style: {width: '100px'}
        },
        {
            name: 'Recoverd',
            selector:row=>row.cured
        },
        {
            name: 'Death',
            selector:row=>row.death
        },
        {
            name: 'Total Cases',
            selector:row=>row.positive
        },
    ]
    )

    const onSearch=(value)=>{
        history.push(`/${value.state_code}/detail`)
    }
    
    const filteredItems = tableData?.filter(
		item => item.state_name && item?.state_name?.toLowerCase().includes(filterText.toLowerCase()),
	);


    const subHeaderComponentMemo = React.useMemo(() => {
		return (
            <Container>
                <div className="table_head">
                    <h4>Statewise Data</h4>
                    <div className="table_head_filter">
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            {/* <Form.Label column sm="4">
                                State Filter 
                            </Form.Label> */}
                            <Col sm="12">
                                <Form.Control 
                                    placeholder="Enter State"
                                    type="text"
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </div>
                </div>
            </Container>
		);
	}, [filterText, resetPaginationToggle]);



    return(
        <div className="home">
            <div className="home_banner" >
                <h1>🔴 LIVE </h1>
                <h2>COVID-19 Corona Virus Tracker</h2>
            </div>
            <div className="cards">
                <Container>
                    <div className="update_date">
                        <p>{countryStats?.date}</p>
                        <p>(↑↓ Status change since yesterday)</p>
                    </div>
                    <Row>
                        <Col sm={3}>
                            <div className="card_main active">
                                <div className="card_inner">
                                    <h5 className="card_name">{countryStats?.activeCases?.heading}</h5>
                                    <h3 className="cart_total card_small"><span>{countryStats?.activeCases?.values}</span></h3>

                                    <p><AiOutlineArrowDown />{countryStats?.activeCases?.downValues} </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="card_main death">
                                <div className="card_inner">
                                    <h5 className="card_name"> {countryStats?.deaths?.heading}</h5>
                                    <h3 className="cart_total card_small"><span>{countryStats?.deaths?.values} </span></h3>
                                    <p><BiUpArrowAlt />{countryStats?.deaths?.upValues}</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="card_main recovered">
                                <div className="card_inner">
                                    <h5 className="card_name">{countryStats?.discharged?.heading}</h5>
                                    <h3 className="cart_total card_small"> <span>{countryStats?.discharged?.values}</span></h3>
                                    <p><BiUpArrowAlt />{countryStats?.discharged?.upValues}</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="card_main vaccinated">
                                <div className="card_inner">
                                    <h5 className="card_name"> {countryStats?.totalVaccinations?.heading}</h5>
                                    <h3 className="cart_total card_small"><span>{countryStats?.totalVaccinations?.values} </span></h3>
                                    <p><BiUpArrowAlt />{countryStats?.totalVaccinations?.upValues}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                   
                </Container>
            </div>
            <div className="select_box center">
                    <h3>Search Your State Here !</h3>
                    <Container>
                        <Row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={6}>
                            <Form.Group className="mb-5 mt-3" controlId="fulllName">
                            {tableData && <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isClearable={true}
                                isSearchable={true}
                                placeholder="Enter State"
                                name="State"
                                options={tableData}
                                getOptionLabel={(option)=>option.state_name}
                                getOptionValue={(option)=>option.sno}
                                onChange={(obj)=>onSearch(obj)}

                            />}
                        </Form.Group>
                            </Col>
                            <Col sm={3}>
                            </Col>
                        </Row>
                    </Container>
            </div>   
            <div className="table_box">
                <Container>
                    <div className="table_box_inner">
                        {subHeaderComponentMemo}
                        <div className="state_table">
                        {tableData&& <DataTable
                                columns={tableCustomData}
                                data={filteredItems}
                                pagination
                                customStyles={CUSTOM_STYLE_PERMISSION_DATA_TABLE}
                                persistTableHead
                            />}
                         </div>   
                    </div>
                </Container>


            </div>

        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        countryStats:state?.homeData?.site_data?.site_stats,
        tableData:state?.homeData?.table_data
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)