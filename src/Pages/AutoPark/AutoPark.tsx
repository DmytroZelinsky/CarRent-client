import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useHistory } from "react-router-dom";
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
import { Tag, Button, Col, Divider, Row, Image, Modal, Space, Skeleton} from 'antd';
import '../AutoPark/AutoPark.css'
import RentalOptionDTO from '../../DTOs/RentalOptionDTO';

const AutoPark = () => {

    const location = useLocation()
    const params = location.state;
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cars, setCars] = useState<CarView[]>([])
    const [autoPark, setAutoPark] = useState<AutoParkView>(new AutoParkView())
    const [showModal, setShow] = useState<boolean>(false)
    const [selectedCar, setSeletedCar] = useState<CarView>()
    const [rentalOption, setRentalOption] = useState<RentalOptionDTO>(params?.rentalOption);
    const { id } = useParams<{id : string}>();

 
    useEffect(() => {
        getAutoParkById(id).then(res => {
            setIsLoading(true);
            setAutoPark(res.data);
            setCars(res.data.cars)
            setIsLoading(false);
        })
        setRentalOption(params?.rentalOption)
    }, [id])

    const handleDelete = async (id: number) => {
        await deleteCar(id)
        setCars(cars.filter(x => x.carId !== id))
    }

    const onBook = async (car: CarView) => {
        setSeletedCar(car);
        rentalOption 
        ?
        history.push({
            pathname: '/booking',
            state: {
                rentalOption,
                car,
                receivingAddress: params.receivingAddress,
                returnAddress: params.returnAddress
        }})
        :
        setShow(true);
    }

    return (
        <>
            <h1 style={{margin:'1rem'}}>Car rental in {autoPark.address.city}</h1> 
            <div className='autopark-container'>
                <Row gutter={[16,24]}>
                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        {
                            rentalOption
                            ?
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
                                        <a onClick={() => setShow(true)}><u>Change</u></a>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        :
                        <div className='rental-option-container'>
                            <RentalOptionForm/>
                        </div>
                        }
                        
                    </Col>
                    <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                        <Row gutter={[16, 24]}>
                            {
                                isLoading
                                ?Array(4).fill(null).map(x => (
                                    <Col xxl={8} xl={8} lg={12} md={12} sm={12} xs={24}>
                                        <Skeleton active={true} paragraph={{rows:1}}/>
                                        <Skeleton.Image style={{height:"10rem", width:"10rem"}}/>
                                        <Skeleton active={true} paragraph={{rows:2}}/>
                                    </Col>
                                ))
                                :cars.map(x => (
                                    <Col xxl={8} xl={8} lg={12} md={12} sm={12} xs={24}>
                                        <Card pointer={true}>
                                            <Card.Header>
                                                <h2>{x.brand} {x.model}</h2>
                                            </Card.Header>
                                            <Card.Body>
                                                <div>
                                                    {x.engineVolume} / {FuelType[x.fuelType]} / {Geerbox[x.geerbox]}
                                                </div>
                                                <div style={{padding:"0 auto"}}>
                                                    <Tag color='orange'>
                                                        {Class[x.class]}
                                                    </Tag>
                                                </div>
                                                <Image preview={false} src={carPic}/>
                                                <h1><b>{x.carRentInfo.pricePerDay}$</b></h1>
                                                <h5>for a day</h5>
                                                <Space>
                                                    <Button 
                                                    className='main-btn'
                                                    onClick={() => {onBook(x)}} 
                                                    type='primary'
                                                    size='large'>
                                                        Book the car
                                                    </Button>
                                                </Space>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
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
                receivingAddress={rentalOption ? undefined : autoPark.address}
                car={selectedCar}/>
            </Modal>
        </>
    )
}

export default AutoPark
