import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../Components/Card/Card'
import { getAllAutoParks } from '../../Api/autoParkApi';
import AutoParkView from '../../Views/AutoParkView';
const AutoParks = () => {


    const [autoParks, setAutoParks] = useState<AutoParkView[]>([]);
    const history = useHistory()
    useEffect(() => {
        fetchAllAutoParks()
    },[])

    const fetchAllAutoParks = async () =>{
        const res = (await getAllAutoParks()).data
        setAutoParks(res)
    }
    
    return (
        <>
            <Container>
                <Row>
                    {autoParks.map(x => (
                        <Col lg={3} md={4} sm={6} xs={12}>
                            <Card onClick={() => history.push(`autopark/${x.autoParkId}`)}>
                                <Card.Header>
                                    {x.address.city}
                                </Card.Header>
                                <Card.Body>
                                    {x.address.addressName}, {x.address.addressNumber} <br/>
                                    Current car count : {x.currentCarCount}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AutoParks
