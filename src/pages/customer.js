import React from 'react'
import axios from 'axios'
import CustomerList from 'components/customerList'
import { Modal, Button, Form } from 'react-bootstrap'
import '../assets/styles/tailwind.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from 'components/navbar'

export default class Customer extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            isModalOpen: false,
            name: "",
            phone: "",
            address: "",
            action: "",
            image: null,
            username: "",
            password: "",
            customer_id: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        // jika belum login 
        else {
            window.location = '/login'
        }
    }

    getCustomer = () => {
        let url = "http://localhost:8080/customer/"

        axios.get(url)
            .then(res => {
                this.setState({
                    customers: res.data.customer
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    handleClose = () =>{
        this.setState({
            isModalOpen:false
        })
    }

    handleAdd = () =>{
        // console.log("Add")
        this.setState({
            isModalOpen: true,
            name: "",
            phone:"",
            address:"",
            username:"",
            password:"",
            action: "insert",
            image: null
        })
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleFile = (e) =>{
        this.setState({
            image : e.target.files[0]
        })
    }

    handleEdit = (selectedItem) =>{
        // console.log(selectedItem)
        this.setState({
            isModalOpen: true,
            customer_id : selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address, 
            image: null,
            username: selectedItem.username,
            password: "",
            action: "update"
        })
    }

    handleDrop = (customer_id) =>{
        let url = "http://localhost:8080/customer/" + customer_id

        if (window.confirm("Anda yakin ingin menghapus data ini?")){
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }
    handleSave = (e) =>{
        e.preventDefault()
        let form = new FormData()
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("username", this.state.username)
        form.append("password", this.state.password)
        form.append("image", this.state.image)
        let url = ""
        
        if (this.state.action === "insert"){
            url= "http://localhost:8080/customer"

            axios.post(url, form)
        .then(res =>{
            // console.log(res.form.message)
            this.getCustomer()
            this.handleClose()
        })
        .catch(err =>{
            console.log(err.message)
        })

        }
        else if (this.state.action === "update") {
            url = "http://localhost:8080/customer/" + this.state.customer_id
            axios.put(url, form)
        .then(res =>{
            // console.log(res.form.message)
            this.getCustomer()
            this.handleClose()
        })
        .catch(err =>{
            console.log(err.message)
        })
        }
        
    }

    componentDidMount = () => {
        this.getCustomer()
    }

    render() {
        return (
            <div className="hover:bg-violet-500 box-content overflow-y-scroll h-5000">
                <Navbar/>
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6 className='text-center bold'>Data Customer</h6>
                    </div>
                    <div className="">
                        <button className='btn btn-success' onClick={() => this.handleAdd()}>
                            Add Customer
                        </button>
                        {this.state.customers.map((item, index) => {
                            return(
                            <CustomerList key={index}
                                nameImage={item.image}
                                image={"http://localhost:8080/images/customer/" + item.image}
                                name={item.name}
                                phone={item.phone}
                                address={item.address}
                                onEdit={() => this.handleEdit(item)}
                                onDrop={() => this.handleDrop(item.customer_id)}
                            />
                            )
                        })}
                    </div>

                    <Modal show= {this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Customer</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className='mb-3' controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder='Insert Your Name' value={this.state.name} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" placeholder='Insert Your Phone Number' value={this.state.phone} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" placeholder='Insert Your Address' value={this.state.address} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="image">
                                <Form.Label>Profile Photo</Form.Label>
                                <Form.Control type="file" name="image" placeholder='Place Your Profile Picture Here' onChange={this.handleFile}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder='Insert Your Username' value={this.state.username} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder='Insert Your Password' value={this.state.password} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant='primary' type='submit'>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}