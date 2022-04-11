import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Card from '../../Components/Card/Card'
import { getAllAutoParks } from '../../Api/autoParkApi';
import AutoParkView from '../../Views/AutoParkView';
import { Col, Row } from 'antd';
import '../AutoParks/AutoParks.css'
const AutoParks = () => {


    const [autoParks, setAutoParks] = useState<AutoParkView[]>([]);
    const history = useHistory()
    useEffect(() => {
        getAllAutoParks().then(res => setAutoParks(res.data))
    },[])

    return (
        <>
            <div className='autoparks-container'>
                <Row gutter={[16, 24]}>
                    {autoParks.map(x => (
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
                    ))}
                </Row>
                    
            </div>
               
        </>
    )
}

export default AutoParks
