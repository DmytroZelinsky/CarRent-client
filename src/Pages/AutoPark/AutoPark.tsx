import React, { useState, useEffect } from 'react'
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { getAutoParkById } from '../../Api/autoParkApi';
import CarView from '../../Views/CarView';
import Card from '../../Components/Card/Card';
import Class from '../../Enums/Class';
import carPic  from '../AutoPark/car.png'
import '../AutoPark/AutoPark.css'
import AutoParkView from '../../Views/AutoParkView';
import RentalOptionForm from '../../Components/Booking/RentalOptionForm/RentalOptionForm';
import { deleteCar } from '../../Api/carApi';
import FuelType from '../../Enums/FuelType';
import Geerbox from '../../Enums/Geerbox';
import { Tag, Button, Col, Divider, Row, Image, Modal, Space} from 'antd';
import '../AutoPark/AutoPark.css'
const AutoPark = () => {
    const [cars, setCars] = useState<CarView[]>([])
    const [autoPark, setAutoPark] = useState<AutoParkView>(new AutoParkView())
    const [showModal, setShow] = useState<boolean>(false)
    const [selectedCar, setSeletedCar] = useState<CarView>(new CarView())
    const { id } = useParams<{id : string}>();

    useEffect(() => {
        getAutoParkById(id).then(res => {
            setAutoPark(res.data);
            setCars(res.data.cars)
        })
    }, [])

    const handleDelete = async (id: number) => {
        await deleteCar(id)
        setCars(cars.filter(x => x.carId !== id))
    }

    return (
        <>
            <h1 style={{margin:'1rem'}}>Car rental in {autoPark.address.city}</h1> 
            <div className='autopark-container'>
                <Row>
                    <Col span={6}>
                    </Col>
                    <Col span={18}>
                        <Row gutter={[16, 24]}>
                            {cars.map(x => (
                                <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
                                    <Card pointer={true}>
                                        <Card.Header>
                                            <h2>{x.brand} {x.model}</h2>
                                        </Card.Header>
                                        <Card.Body>
                                        {x.engineVolume} / {FuelType[x.fuelType]} / {Geerbox[x.geerbox]}
                                            <div>
                                                <Tag color='orange'>
                                                    {Class[x.class]}
                                                </Tag>
                                            </div>
                                            <Image className='car-image' preview={false} src={carPic}/>
                                            <h1><b>{x.carRentInfo.pricePerDay}$</b></h1>
                                            <h5>for a day</h5>
                                            <Space>
                                                <Button 
                                                className='main-btn'
                                                onClick={() => {setShow(true); setSeletedCar(x)}} 
                                                type='primary'
                                                size='large'>
                                                    Book the car
                                                </Button>
                                            </Space>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
            <Modal 
            maskStyle={{backgroundColor:'rgba(122,122,122,0.5)'}}
            footer={null}
            visible={showModal} 
            title='Car booking'
            onOk={() => setShow(false)}
            onCancel={() => setShow(false)}>
                <RentalOptionForm 
                receivingAddress={autoPark.address}
                car={selectedCar}/>
            </Modal>
        </>
    )
}

export default AutoPark
