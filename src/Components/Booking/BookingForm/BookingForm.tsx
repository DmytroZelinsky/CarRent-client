import { FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Form, Button, Layout, Divider } from 'antd'
import Card from '../../../Components/Card/Card'
import '../BookingForm/BookingForm.css'
import { createBooking } from '../../../Api/bookingApi'
import { getAllClientOptionsForBooking } from '../../../Api/bookingApi'
import ClientOptionView from '../../../Views/ClientOptionView'

const {Header, Footer, Sider, Content} = Layout;

const BookingForm = () => {
    const location = useLocation()
    const params = location.state;
    const [clientOptions, setClientOptions] = useState<Array<ClientOptionView>>(new Array<ClientOptionView>());
    useEffect(() => {
        getAllClientOptionsForBooking().then(res => { setClientOptions(res.data); console.log(res.data)})
        console.log(params)
    }, [])

    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        params.booking.clientId = 20; //For now
        await createBooking(params.booking)
    }

    return (
        <>
            <div className='booking-container'>
                <Row align='middle'>
                    <Col span={12}>
                        <Card className={'rental-option-display'}>
                            <Card.Body>
                                <Row align='middle'>
                                    <Col span={20}>
                                        <div>
                                            <b>
                                                {params.receivingAddress.city}, {' '}
                                                {params.receivingAddress.addressName},{' '}
                                                {params.receivingAddress.addressNumber}
                                            </b>
                                        </div>
                                        <div>
                                            {(params.booking.startDate).toDateString() + ' at ' 
                                            + (params.booking.startDate as Date).getHours() + ':' 
                                            + (params.booking.startDate as Date).getMinutes()}
                                        </div>
                                        <div>
                                        <div>
                                                <b>
                                                    {params.returnAddress.city}, {' '}
                                                    {params.returnAddress.addressName},{' '}
                                                    {params.returnAddress.addressNumber}
                                                </b>
                                            </div>
                                            <div>
                                                {(params.booking.endDate).toDateString() + ' at ' 
                                                + (params.booking.endDate as Date).getHours() + ':' 
                                                + (params.booking.endDate as Date).getMinutes()}
                                            </div>
                                        </div>
                                    
                                    </Col>
                                    <Col span={4} className={'change-rental-option-item'}>
                                        <a><u>Change</u></a>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className={'chosen-car-display'}>
                            <Card.Body>
                                {params.car.brand + ' ' + params.car.model}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Divider></Divider>
                <p className='headline'><b>Additional options</b></p>
                <Row >
                    <Form onFinish={e => handleSumbit(e)} className={'options-container'}>
                        <Row>
                            {clientOptions.map(clientOption=> (
                                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                                    <Card className='option-item'> 
                                        <Card.Body>
                                            <input className='option-check-box' type="checkbox" id={clientOption.clientOptionId.toString()}/>
                                            <label className='option-check-box-label' htmlFor={clientOption.clientOptionId.toString()}>
                                                <div>{clientOption.name}</div>
                                                <div style={{color:'red'}}>+{clientOption.price}$</div>
                                            </label>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    </Form>
                </Row>
            </div>
        </>
    )
}

export default BookingForm
