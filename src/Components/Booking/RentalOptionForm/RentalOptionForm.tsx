import { Button, Form, Select, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BookingDTO from '../../../DTOs/BookingDTO'
import AddressView from '../../../Views/AddressView'
import CarView from '../../../Views/CarView'
import { getAllAutoParks } from '../../../Api/autoParkApi'

const { RangePicker } = DatePicker;

type Props = {
    receivingAddress? : AddressView
    car? : CarView
}

const RentalOptionForm = ({receivingAddress, car} : Props) => {
    useEffect(() => {
        getAllAutoParks().then(res => {
            setReturnAddresses(res.data.map(x => x.address))
            receivingAddress 
            ? setReceivingAddresses([...receivingAddresses, receivingAddress]) 
            : setReceivingAddresses(res.data.map(x => x.address))
        })
    }, [])
    
    const history = useHistory()
    const [booking, setBooking] = useState<BookingDTO>({ 
        receivingAddressId : receivingAddress?.addressId,
        carId: car?.carId
    } as BookingDTO) 
    const [returnAddresses, setReturnAddresses] = useState<Array<AddressView>>(new Array<AddressView>());
    const [receivingAddresses, setReceivingAddresses] = useState<Array<AddressView>>(new Array<AddressView>());


    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        history.push({
            pathname: '/booking',
            state: {
                booking,
                car,
                receivingAddress: receivingAddresses.find(x => x.addressId === booking.receivingAddressId),
                returnAddress: returnAddresses.find(x => x.addressId === booking.returnAddressId)
        }});
    }

    return (
        <>
                <Form onFinish={onSubmit}>
                    <Form.Item>
                        <Select
                        defaultValue={booking.receivingAddressId}
                        size='large'  
                        showSearch
                        placeholder="Receiving address"
                        optionFilterProp="children"
                        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                        >
                            {receivingAddresses.map((receivingAddress) => (
                            <Select.Option value={receivingAddress.addressId}>{
                            receivingAddress.city + ', ' + 
                            receivingAddress.addressName + ', ' +
                            receivingAddress.addressNumber}
                            </Select.Option >
                            ))}
                            
                        </Select>
                    </Form.Item>
                    <Form.Item name='returnAddress' rules={[{required: true}]}>
                        <Select
                        size='large'
                        onChange={value => booking.returnAddressId = value as number}
                        showSearch
                        placeholder="Return address"
                        optionFilterProp="children"
                        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                        >
                            {returnAddresses.map((returnAddess) => (
                            <Select.Option value={returnAddess.addressId}>{
                            returnAddess.city + ', ' + 
                            returnAddess.addressName + ', ' +
                            returnAddess.addressNumber}
                            </Select.Option >
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='date' rules={[{required: true}]}>
                        <RangePicker
                        format="YYYY-MM-DD HH:mm"
                        size='large'
                        style={{ width: "100%" }}
                        showTime
                        allowClear={false}
                        onChange={moments => {
                            booking.startDate = moments![0]?.toDate()!; 
                            booking.endDate = moments![1]?.toDate()!
                        }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
            </Form>  
        </>
    )
}

export default RentalOptionForm
