import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Card from '../../Components/Card/Card'
import { getAllAutoParks } from '../../Api/autoParkApi';
import AutoParkView from '../../Views/AutoParkView';
import { Col, Row, Skeleton } from 'antd';
import '../AutoParks/AutoParks.css'
const AutoParks = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [autoParks, setAutoParks] = useState<AutoParkView[]>([]);
    const history = useHistory()
    useEffect(() => {
        getAllAutoParks().then(res => {
            setIsLoading(true);
            setAutoParks(res.data);
            setIsLoading(false);
        })
    }, [])

    return (
        <>
            <div className='autoparks-container'>
                <Row gutter={[16, 24]}>
                    {
                        isLoading 
                        ?Array(4).fill(null).map(x => (
                            <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
                                <Skeleton active={true} paragraph={{rows: 2}}></Skeleton>
                            </Col>
                        ))
                        :autoParks.map(x => (
                            <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
                                <Card onClick={() => history.push(`autopark/${x.autoParkId}`)} pointer={true}>
                                    <Card.Header>
                                        {x.address.city}
                                    </Card.Header>
                                    <Card.Body>
                                        {x.address.addressName}, {x.address.addressNumber} 
                                        <br/>
                                        Current car count : {x.currentCarCount}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </>
    )
}

export default AutoParks
