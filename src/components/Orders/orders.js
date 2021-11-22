import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authToken from '../authToken';

const url = "http://10.85.92.138:8002";
const Orders = () => {
    var newOpen = [];
    var newClose = [];
    var newCancel = [];
    var newReturn = [];
    var [userid, setUserid] = useState('');
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState([]);
    const [close, setClose] = useState([]);
    const [cancel, setCancel] = useState([]);
    const [ret, setRet] = useState([]);
    const [tab1, setTab1] = useState(false);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const [tab4, setTab4] = useState(false);
    userid = localStorage.getItem('userid')


    const orderData = () => {
        axios.get(url + `/${userid}/orders`, authToken()).then((res) => {
            setOrders(res.data.data)
            console.log(res.data);
            setUserid(userid)
            console.log(userid)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        orderData();
    }, [])


    function handleOpen() {
        console.log('inOpen')
        setTab1(true)
        setTab2(false)
        setTab3(false)
        setTab4(false);
        newOpen = orders.filter((element, index) => {
            return element.orderStatus === "Open"
        })
        setOpen(newOpen)

    }
    function handleClose() {
        console.log('inClose')
        setTab2(true)
        setTab1(false)
        setTab3(false)
        setTab4(false);
        newClose = orders.filter((element, index) => {
            return element.orderStatus === "Closed"
        })
        setClose(newClose)

    }
    function handleCancel() {
        console.log('inCancel')
        setTab3(true)
        setTab2(false)
        setTab1(false)
        setTab4(false);
        newCancel = orders.filter((element, index) => {
            return element.orderStatus === "Cancelled"
        })
        setCancel(newCancel)

    }
    function handleReturn() {
        console.log('inReturn')
        setTab4(true)
        setTab2(false)
        setTab3(false)
        setTab1(false);
        newReturn = orders.filter((element, index) => {
            return element.orderStatus === "Closed"
        })
        setRet(newReturn)
    }
    function handlecancelOrder(_id) {
        axios.post(url + `/${userid}/orders/${_id}/cancel`, authToken())
        console.log(url + `/${userid}/orders/${_id}/cancel`, authToken())
    }
    function handlereturnOrder(_id) {
        axios.post(url + `/${userid}/orders/${_id}/return`, authToken())
        console.log(_id)
    }

    return (
        <div className="container mt-5">
            <h1 className="display-6">My Orders</h1>
            <div className="container mt-3">
                <div className="btn-group">
                    <button type="button" className="btn btn-light" onClick={handleOpen}>Open Orders</button>
                    <button type="button" className="btn btn-light" onClick={handleClose}>Closed Orders</button>
                    <button type="button" className="btn btn-light" onClick={handleCancel}>Cancelled Orders</button>
                    <button type="button" className="btn btn-light" onClick={handleReturn}>Returned Orders</button>
                </div>
            </div>
            <hr />
            {tab1 &&
                <div className="container mt-4">
                    <div class="table-responsive">
                        <table className='table table-striped'>
                            <thead className="thead-light">
                                <tr>
                                    <th>OrderId</th>
                                    <th>Order Date</th>
                                    <th>Order Status</th>
                                    <th>Card Type</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {open.map((orders, _id) => {
                                    return (
                                        <tr key={orders._id}>
                                            <td>{orders._id}</td>
                                            <td>{orders.orderedDate}</td>
                                            <td>{orders.orderStatus}</td>
                                            <td>{orders.paymentCard}</td>
                                            <td>{orders.orderItems[0].product.displayName}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={() => handlecancelOrder(orders._id)}>Cancel</button></td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {tab2 &&
                <div className="container mt-4">
                    <div class="table-responsive">
                        <table className='table table-striped table-responsive'>
                            <thead className="thead-light">
                                <tr>
                                    <th>OrderId</th>
                                    <th>Order Date</th>
                                    <th>Order Status</th>
                                    <th>Card Type</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {close.map((order, _id) => {
                                    return (
                                        <tr key={_id}>
                                            <td>{order._id}</td>
                                            <td>{order.orderedDate}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>{order.paymentCard}</td>
                                            <td>{order.orderItems[0].product.displayName}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={() => handlereturnOrder(orders._id)}>Return</button></td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }{tab3 &&
                <div className="container mt-4">
                    <div class="table-responsive">
                        <table className='table table-striped'>
                            <thead className="thead-light">
                                <tr>
                                    <th>OrderId</th>
                                    <th>Order Date</th>
                                    <th>Order Status</th>
                                    <th>Card Type</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cancel.map((order, _id) => {
                                    return (
                                        <tr key={_id}>
                                            <td>{order._id}</td>
                                            <td>{order.orderedDate}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>{order.paymentCard}</td>
                                            <td>{order.orderItems[0].product.displayName}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }{tab4 &&
                <div className="container mt-4">
                    <div class="table-responsive">
                        <table className='table table-striped'>
                            <thead className="thead-light">
                                <tr>
                                    <th>OrderId</th>
                                    <th>Order Date</th>
                                    <th>Order Status</th>
                                    <th>Card Type</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ret.map((order, _id) => {
                                    return (
                                        <tr key={_id}>
                                            <td>{order._id}</td>
                                            <td>{order.orderedDate}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>{order.paymentCard}</td>
                                            <td>{order.orderItems[0].product.displayName}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}
export default Orders;