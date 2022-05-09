import { Col, Row, Image } from "antd"
import { useEffect, useState } from "react"
import { getAllAutoParks } from "../../Api/autoParkApi"
import { useHistory } from "react-router-dom";
import RentalOptionForm from "../../Components/Booking/RentalOptionForm/RentalOptionForm"
import "../Home/Home.css"
import carBannerPic from '../Home/homeCarBanner.png'
const Home = () => {

    const [autoParkCount, setAutoParkCount] = useState<number>();
    const history = useHistory()

    useEffect(() => {
        getAllAutoParks().then(res => setAutoParkCount(res.data.length))
    })
    return (
        <>
            <h1 style={{textAlign:"center"}}><b>Car rent in Ukarine - 'Company name'</b></h1>
            <div className="home-container">
                <Row gutter={[16,16]}>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                        <div className="rental-option-container">
                            <RentalOptionForm />
                        </div>
                    </Col>
                    <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24}>
                        <div className="autoparks-banner-image" onClick={() => history.push('autoparks')}>
                            <div className="autoparks-banner-text">
                                We are available in {autoParkCount} cities. Pick one
                            </div>
                        </div>
                        {/* <Image className="autoparks-banner-image" preview={false} src={carBannerPic}></Image> */}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home
