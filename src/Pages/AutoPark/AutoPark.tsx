import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { Container, Row, Col, Badge, Image, Button, Modal } from 'react-bootstrap'
import { getAutoParkById } from '../../Api/autoParkApi';
import CarView from '../../Views/CarView';
import Card from '../../Components/Card/Card';
import Class from '../../Enums/Class';
import carPic  from '../AutoPark/car.png'
import '../AutoPark/AutoPark.css'
import AutoParkView from '../../Views/AutoParkView';
import RentalOptionForm from '../../Components/Booking/RentalOptionForm/RentalOptionForm';
import { deleteCar } from '../../Api/carApi';
const AutoPark = () => {
    const [cars, setCars] = useState<CarView[]>([])
    const [autoPark, setAutoPark] = useState<AutoParkView>(new AutoParkView())
    const [show, setShow] = useState<boolean>(false)
    const [selectedCar, setSeletedCar] = useState<CarView>(new CarView())
    const { id } = useParams<{id : string}>();

    useEffect(() => {
        fetchAutoParkById(+id)
    }, [])

    const fetchAutoParkById = async (id: number) => {
        const autoPark = (await getAutoParkById(id)).data
        setCars(autoPark.cars)
        setAutoPark(autoPark)
    }

    const handleDelete = async (id: number) => {
        await deleteCar(id)
        setCars(cars.filter(x => x.carId !== id))
    }

    return (
        <>
            <h1 style={{margin:'1rem'}}>Car rental in {autoPark.address.city}</h1> 
            <Container>
                <Row>
                    <Col xs={4}>
                    </Col>
                    <Col xs={8}>
                        <Row>
                            {cars.map(x => (
                                <Col md={12} lg={6} key={x.carId}>
                                    <Card>
                                        <Card.Header>
                                            {x.brand} {x.model}
                                            <Button onClick={() => handleDelete(x.carId)} variant='danger'>Delete</Button>
                                        </Card.Header>
                                        <Card.Body>
                                            <p style={{fontSize:'12px', margin:'0'}}>{x.engineVolume} / {x.fuelType} / {x.geerbox}</p>
                                            <Badge bg="secondary">{Class[x.class]}</Badge>
                                            <Image className={'car-image'} src={carPic}></Image>
                                            <h1><b>{x.carService.pricePerDay}$</b></h1>
                                            <h6>for a day</h6>
                                            <Button onClick={() => {setShow(!show); setSeletedCar(x)}} style={{margin:'2rem 0 1rem 0'}} variant="secondary" size="lg">Book the car</Button>{' '}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={() => setShow(!show)}>
                <Modal.Header closeButton>
                    <Modal.Title>Car booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RentalOptionForm 
                    receivingAddress={autoPark.address}
                    car={selectedCar}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AutoPark
