import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import BookingDTO from '../../../DTOs/BookingDTO'
import AddressView from '../../../Views/AddressView'
import CarView from '../../../Views/CarView'

type Props = {
    receivingAddress? : AddressView
    car? : CarView
}

const RentalOptionForm = ({receivingAddress, car} : Props) => {
    const history = useHistory()

    const [booking, setBooking] = useState<BookingDTO>({ 
        receivingAddressId : receivingAddress?.addressId
    } as BookingDTO) 

    const exampleAddresses : AddressView[] = 
    [
        { city:'Lviv', addressName:'Bandera', addressNumber:5, postCode:12345, addressId:5} as AddressView,
        { city:'Kharkiv', addressName:'Volnutsk', addressNumber:6, postCode:23412, addressId:6} as AddressView,
        { city:'Dnipro', addressName:'Bandera', addressNumber:7, postCode:45436, addressId:7} as AddressView
    ]

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        history.push({
            pathname: '/booking',
            state: booking,
          });
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Container fluid>
                    <Row>
                        <Form.Group className="mb-3" >
                            <Form.Label>Receiving</Form.Label>
                            <Form.Select 
                            name='receivingCity' 
                            disabled={receivingAddress ? true : false}>
                               <option value={receivingAddress?.addressId}> {
                                receivingAddress !== undefined ? 
                                receivingAddress.city + ', ' + 
                                receivingAddress.addressName + ', ' +
                                receivingAddress.addressNumber : undefined} 
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Returning</Form.Label>
                            <Form.Select
                            name='returnCity'>
                                <option>Choose city</option>
                                {exampleAddresses.map((x, index) => (
                                    <option value={x.addressId}>{
                                        x.city + ', ' + 
                                        x.addressName + ', ' +
                                        x.addressNumber}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label >Date and time of serving</Form.Label>
                                <Form.Control 
                                type="date" 
                                name='servingDate'/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Date and time of returning</Form.Label>
                                <Form.Control 
                                type="date" 
                                name='returnDate'/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="secondary" type="submit" >
                        Submit
                    </Button>
                </Container>
               
            </Form>  
        </>
    )
}

export default RentalOptionForm
