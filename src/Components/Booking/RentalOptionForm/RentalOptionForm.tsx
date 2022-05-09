import { Button, Form, Select, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AddressView from '../../../Views/AddressView'
import CarView from '../../../Views/CarView'
import { getAllAutoParks } from '../../../Api/autoParkApi'
import RentalOptionDTO from '../../../DTOs/RentalOptionDTO'
import AutoParkView from '../../../Views/AutoParkView'
import "../RentalOptionForm/RentalOptionForm.css"
import { CarOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker;

type Props = {
    receivingAddress? : AddressView
    car? : CarView
}

const RentalOptionForm = ({receivingAddress, car} : Props) => {
    useEffect(() => {
        getAllAutoParks().then(res => {
            setReturnAddresses(res.data.map(x => x.address))
            setAutoParks(res.data)
            receivingAddress 
            ? setReceivingAddresses([...receivingAddresses, receivingAddress]) 
            : setReceivingAddresses(res.data.map(x => x.address))
        })
    }, [])
    
    const history = useHistory()
    const [rentalOption, setRentalOption] = useState<RentalOptionDTO>(new RentalOptionDTO())
    const [returnAddresses, setReturnAddresses] = useState<Array<AddressView>>(new Array<AddressView>());
    const [autoParks, setAutoParks] = useState<Array<AutoParkView>>(new Array<AutoParkView>());
    const [receivingAddresses, setReceivingAddresses] = useState<Array<AddressView>>(new Array<AddressView>());


    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        car 
            ? history.push({
                pathname: '/booking',
                state: {
                    rentalOption,
                    car,
                    receivingAddress: receivingAddresses.find(x => x.addressId === rentalOption.receivingAddressId),
                    returnAddress: returnAddresses.find(x => x.addressId === rentalOption.returnAddressId)
            }})
            : history.push({
                pathname: `/autopark/${autoParks.filter(x => x.address.addressId === rentalOption.receivingAddressId)[0].autoParkId}`,
                state: {
                    rentalOption,
                    receivingAddress: receivingAddresses.find(x => x.addressId === rentalOption.receivingAddressId),
                    returnAddress: returnAddresses.find(x => x.addressId === rentalOption.returnAddressId)
            }})
    }

    return (
        <>
            <Form 
            onFinish={onSubmit}
            layout="vertical">
                <Form.Item 
                name='receivingAddress' 
                rules={[{required: true}]}
                label="Receiving address">
                    <Select
                    onChange={value => rentalOption.receivingAddressId = value as number}
                    showSearch
                    placeholder="Enter a city (For example: 'Kyiv')"
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
                <Form.Item 
                name='returnAddress' 
                rules={[{required: true}]}
                label="Return address">
                    <Select
                    onChange={value => rentalOption.returnAddressId = value as number}
                    showSearch
                    placeholder="Enter a city (For example: 'Kyiv')"
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
                <Form.Item 
                name='date' 
                rules={[{required: true}]}
                label="Start and end dates">
                    <RangePicker
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    showTime
                    allowClear={false}
                    onChange={moments => {
                        rentalOption.startDate = moments![0]?.toDate()!; 
                        rentalOption.endDate = moments![1]?.toDate()!
                    }}
                    />
                </Form.Item>
                <Form.Item>
                    <button className='rental-option-submit-btn' type='submit'>Find a car <CarOutlined /></button>
                </Form.Item>
            </Form>  
        </>
    )
}

export default RentalOptionForm
