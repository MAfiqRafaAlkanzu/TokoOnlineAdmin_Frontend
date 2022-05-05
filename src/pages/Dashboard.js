import React from 'react';
import axios from 'axios';
import StatusCard from 'components/StatusCard';
import Navbar from 'components/navbar';
// import ChartLine from 'components/ChartLine';
// import ChartBar from 'components/ChartBar';
// import PageVisitsCard from 'components/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
// import { render } from '@testing-library/react';



export default class Dashboard extends React.Component {
    constructor(){
        super()
        this.state = {
            token : "",
            adminName : "",
            adminCount : 0,
            customerCount : 0,
            productCount : 0,
            transactionCount: 0
        }
        if (localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else {
            window.location = "/login"
        }
    }
    getAdmin = () => {
        let admin = localStorage.getItem('name')
        let url = "http://localhost:8080/admin/"

        axios.get(url)
        .then(res =>{
            this.setState({
                adminName : admin,
                adminCount : res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        // console.log(res)
    }

    getCustomer =() =>{
        // let customer = (localStorage.getItem('name'))
        let url = "http://localhost:8080/customer/"

        axios.get(url)
        .then(res => {
            this.setState({
                customerCount : res.data.count
            })
        })
    }

    getProduct = () =>{
        let url = "http://localhost:8080/product/"

        axios.get(url)
        .then(res => {
            this.setState({
                productCount : res.data.count
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    getTransaction = () =>{
        let url = "http://localhost:8080/transaction/"

        axios.get(url)
        .then(res => {
            this.setState({
                transactionCount : res.data.count
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getAdmin()
        this.getCustomer()
        this.getProduct()
        this.getTransaction()
    }
    render(){
    return (
        <>
        <Navbar/>
            <div className="">
                <h5 className='text-center'>Welcome {localStorage.getItem('name')}</h5>
            </div><br />

            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="Admin"
                            amount={this.state.adminCount}
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="Customer"
                            amount={this.state.customerCount}
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Product"
                            amount={this.state.productCount}
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Transaction"
                            amount={this.state.transactionCount}
                        />
                    </div>
                </div>
            </div>

            
        </>
    );};
}
