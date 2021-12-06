import React, { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import BookingDTO from '../../../DTOs/BookingDTO'
import Card from '../../../Components/Card/Card'
import '../BookingForm/BookingForm.css'
import { createBooking } from '../../../Api/bookingApi'
const BookingForm = () => {
    const location = useLocation()
    const booking : BookingDTO = location.state as any;

    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        booking.clientID = 24
        booking.carId = booking.car.carId
        await createBooking(booking)
    }

    return (
        <>
            <Container >
                <Row>
                    <Col className={'rental-option-container'}>
                        <div><b>{booking.receivingAddress}</b> <br/>at {booking.startDate.toDateString()}</div>
                        <div><b>{booking.returnAddress}</b> <br/>at {booking.endDate.toDateString()}</div>
                    </Col>
                    <Col className={'chosen-car-display'}>
                        <p>{booking.car.brand + ' ' + booking.car.model}</p>
                    </Col>
                </Row>
                <Row >
                    <Col className={'options-container'}>
                        <Form onSubmit={e => handleSumbit(e)}>
                            <Row>
                                <Col sm={6}>
                                    <div className='option-item'>
                                        <input className='option-check-box' onChange={(e) => booking.clientService.hasUnlimitedMileage =  e.target.checked } type="checkbox" id="c1"/>
                                        <label className='option-check-box-label' htmlFor='c1'>Unlimited mileage</label>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='option-item'>
                                        <input className='option-check-box' onChange={(e) => booking.clientService.hasDriver =  e.target.checked } type="checkbox"  id="c2"/>
                                        <label className='option-check-box-label' htmlFor='c2'>Additional driver</label>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='option-item'>
                                        <input className='option-check-box' onChange={(e) => booking.clientService.hasWiFi =  e.target.checked } type="checkbox"  id="c3"/>
                                        <label className='option-check-box-label' htmlFor='c3'>WI-Fi</label>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='option-item'>
                                        <input className='option-check-box' onChange={(e) => booking.clientService.hasVideoRecorder =  e.target.checked } type="checkbox"  id="c4"/>
                                        <label className='option-check-box-label' htmlFor='c4'>Video recorder</label>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='option-item'>
                                        <input className='option-check-box' onChange={(e) => booking.clientService.hasChildSeat =  e.target.checked } type="checkbox"  id="c5"/>
                                        <label className='option-check-box-label' htmlFor='c5'>Child seat</label>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='option-item'>
                                        <input className='option-check-box' onChange={(e) => booking.clientService.hasPhoneHolder =  e.target.checked } type="checkbox"  id="c6"/>
                                        <label className='option-check-box-label' htmlFor='c6'>Phone holder</label>
                                    </div>
                                </Col>
                            </Row>
                            <Button type='submit' variant='secondary'>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BookingForm
