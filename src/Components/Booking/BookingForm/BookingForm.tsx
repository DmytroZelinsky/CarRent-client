import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Row, Col, Form, Button, Divider, Input, DatePicker, Modal } from 'antd'
import Card from '../../../Components/Card/Card'
import '../BookingForm/BookingForm.css'
import { createBooking, getAllClientOptionsForBooking } from '../../../Api/bookingApi'
import ClientOptionView from '../../../Views/ClientOptionView'
import BookingDTO from '../../../DTOs/BookingDTO'
import ClientDTO from '../../../DTOs/ClientDTO'
import RentalOptionForm from '../RentalOptionForm/RentalOptionForm'

const BookingForm = () => {
    const location = useLocation()
    const params = location.state;
    const history = useHistory();

    const [showRentalOptionModal, setShowRentalOptionModal] = useState<boolean>(false);
    const [chosenClientOptions, setChosenClientOptions] = useState<Array<ClientOptionView>>(new Array<ClientOptionView>());
    const [clientOptions, setClientOptions] = useState<Array<ClientOptionView>>(new Array<ClientOptionView>());
    const [booking, setBooking] = useState<BookingDTO>({
        startDate: params.rentalOption.startDate,
        endDate: params.rentalOption.endDate,
        receivingAddressId: params.rentalOption.receivingAddressId,
        returnAddressId: params.rentalOption.returnAddressId,
        carId: params.car.carId,
        clientOptionIds: new Array<number>(),
        client: new ClientDTO(),
    } as BookingDTO)
    
    useEffect(() => {
        getAllClientOptionsForBooking().then(res => { setClientOptions(res.data); console.log(res.data)})
    }, [])

    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        await createBooking(booking)
        history.push('/home')
    }

    const onClientOptionsChange =(e : any) => {
        let id =  +e.target.id;
        e.target.checked 
            ? setChosenClientOptions(oldArray => [...oldArray,clientOptions.find(x => x.clientOptionId === id)!])
            : setChosenClientOptions(chosenClientOptions.filter(x => x.clientOptionId !== id)); 
            console.log(chosenClientOptions)
    }

    const getDateDifferenceInDays = (date1: Date, date2: Date) => {
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }
    
    return (
        <div className='booking-container'>
            <p className='headline'><b>General info</b></p>
            <Row align='stretch' gutter={[16,24]}>
                <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                    <Card className={'rental-option-display'}>
                        <Card.Body>
                            <Row justify='space-around' align='middle'>
                                <Col span={20}>
                                    <div>
                                        <b>
                                            {params.receivingAddress.city}, {' '}
                                            {params.receivingAddress.addressName},{' '}
                                            {params.receivingAddress.addressNumber}
                                        </b>
                                    </div>
                                    <div>
                                        {(params.rentalOption.startDate).toDateString() + ' at ' 
                                        + (params.rentalOption.startDate as Date).getHours() + ':' 
                                        + (params.rentalOption.startDate as Date).getMinutes()}
                                    </div>
                                    -----
                                    <div>
                                        <div>
                                            <b>
                                                {params.returnAddress.city}, {' '}
                                                {params.returnAddress.addressName},{' '}
                                                {params.returnAddress.addressNumber}
                                            </b>
                                        </div>
                                        <div>
                                            {(params.rentalOption.endDate).toDateString() + ' at ' 
                                            + (params.rentalOption.endDate as Date).getHours() + ':' 
                                            + (params.rentalOption.endDate as Date).getMinutes()}
                                        </div>
                                    </div>
                                
                                </Col>
                                <Col span={4} className={'change-rental-option-item'}>
                                    <a onClick={() => setShowRentalOptionModal(true)}><u>Change</u></a>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Card className={'chosen-car-display'}>
                        <Card.Body>
                            {params.car.brand + ' ' + params.car.model}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row >
                <Form onFinish={e => handleSumbit(e)} className={'options-container'}>
                    <Divider></Divider>
                    <p className='headline'><b>Additional options</b></p>
                    <Row gutter={[16,24]}>
                        {clientOptions.map(clientOption=> (
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Card className='option-item' style={{padding:0}}> 
                                    <Card.Body style={{padding:0}}>
                                        <input className='option-check-box' type="checkbox" id={clientOption.clientOptionId.toString()} onChange={(e) => onClientOptionsChange(e)}/>
                                        <label className='option-check-box-label' htmlFor={clientOption.clientOptionId.toString()}>
                                            <div>{clientOption.name}</div>
                                            <div style={{color:'red'}}>+{clientOption.price}$</div>
                                        </label>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Divider></Divider>
                    <p className='headline'><b>Your contact data</b></p>
                    <Row gutter={[16,24]}>
                        <Col span={12}>
                            <Form.Item className='input-item' name="First name" rules={[{required: true}]}>
                                <Input size="large" placeholder='First name' onChange={e => booking.client.firstName = e.target.value} />
                            </Form.Item>
                            <Form.Item className='input-item' name="Second name" rules={[{required: true}]}>
                                <Input size="large" placeholder='Second name' onChange={e => booking.client.lastName = e.target.value}/>
                            </Form.Item>
                            <Form.Item className='input-item' name="Phone number" rules={[{required: true}]}>
                                <Input size="large" placeholder='Phone number' onChange={e => booking.client.phoneNumber = e.target.value}/>
                            </Form.Item>
                            <Form.Item className='input-item' name="Birthday" rules={[{required: true}]}>
                                <DatePicker size="large" placeholder='Your birthday' onChange={e => booking.client.dateOfBirth = e?.toDate()!}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item style={{marginLeft:"0.5rem"}}>
                                <p style={{fontSize:18, color:"rgb(113, 162, 226)"}}> To book this car you need to have at the receiving site:</p>
                                <ul style={{fontSize:18}}>
                                    <li>
                                        Passport
                                    </li>
                                    <li>
                                        Driver's lincense
                                    </li>
                                    <li>
                                        Taxpayer identification number (for citizens of Ukraine)
                                    </li>
                                </ul>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <div className='summary'>
                            <Row>
                                <Col span={22}>
                                    Car rent
                                </Col>
                                <Col span={2}>
                                    ${getDateDifferenceInDays(booking.endDate, booking.startDate) * params.car.carRentInfo.pricePerDay}
                                </Col>
                                <Divider style={{margin:0}}/>
                                <Col span={22}>
                                    Deposit
                                </Col>
                                <Col span={2}>
                                    ${params.car.carRentInfo.deposit}
                                </Col>
                                <Divider style={{margin:0}}/>
                                {chosenClientOptions.sort().map(x => (
                                    <>
                                        <Col span={22}>
                                            {x.name}
                                        </Col>
                                        <Col span={2}>
                                            ${x.price}
                                        </Col>
                                        <Divider style={{margin:0}}/>
                                    </>
                                ))}
                                <Col span={22}>
                                    <b style={{fontSize: 20}}>Total for {getDateDifferenceInDays(booking.endDate, booking.startDate)} days:</b>
                                </Col>
                                <Col span={2}>
                                    ${getDateDifferenceInDays(booking.endDate, booking.startDate) 
                                    * params.car.carRentInfo.pricePerDay
                                    + params.car.carRentInfo.deposit
                                    + chosenClientOptions?.map(x => x.price)?.reduce((x, y) => x + y, 0)}
                                </Col>
                            </Row>
                            <button className="booking-submit-btn" type='submit'>Book</button>
                        </div>
                    </Row>
                </Form>
            </Row>
            <Modal 
            maskStyle={{backgroundColor:'rgba(122,122,122,0.5)'}}
            footer={null}
            visible={showRentalOptionModal} 
            title='Car booking'
            onOk={() => setShowRentalOptionModal(false)}
            onCancel={() => setShowRentalOptionModal(false)}>
                <RentalOptionForm/>
            </Modal>
        </div>
    )
}

export default BookingForm
