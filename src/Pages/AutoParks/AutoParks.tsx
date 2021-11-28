import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../Components/Card/Card'
import { getAllAutoParks } from '../../Api/autoParkApi';
import AutoParkView from '../../Views/AutoParkView';
const AutoParks = () => {


    const [autoParks, setAutoParks] = useState<AutoParkView[]>([]);
    const fetchAllAutoParks = async () =>{
        const res = (await getAllAutoParks()).data
        console.log(res)
        setAutoParks(res)
    }
    useEffect(() => {
        fetchAllAutoParks()
    },[])

    return (
        <>
            <Container>
                <Row>
                    {autoParks.map(x => (
                        <Col lg={3} md={4} sm={6} xs={12}>
                            <Card onClick={() => console.log(x.autoParkId)}>
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
