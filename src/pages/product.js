import React from 'react'
import axios from 'axios'
import ProductList from 'components/productList'
import { Modal, Button, Form } from 'react-bootstrap'
import '../assets/styles/tailwind.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from 'components/navbar'

export default class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            product: [],
            isModalOpen: false,
            name: "",
            price: "",
            stock: "",
            action: "",
            image: null,
            product_id: "",
            token: "",
            headers: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        // jika belum login 
        else {
            window.location = '/login'
        }
    }

    headerConfig =() =>{
        let header = {
            headers : {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getProduct = () => {
        let url = "http://localhost:8080/product/"

        axios.get(url)
            .then(res => {
                this.setState({
                    product: res.data.product
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
            price:"",
            stock:"",
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
            product_id : selectedItem.product_id,
            name: selectedItem.name,
            price: selectedItem.price,
            stock: selectedItem.stock, 
            image: null,
            action: "update"
        })
    }

    handleDrop = (product_id) =>{
        let url = "http://localhost:8080/product/" + product_id

        if (window.confirm("Anda yakin ingin menghapus data ini?")){
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getProduct()
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
        form.append("price", this.state.price)
        form.append("stock", this.state.stock)
        form.append("image", this.state.image)
        let url = ""
        
        if (this.state.action === "insert"){
            url= "http://localhost:8080/product"

            axios.post(url, form)
        .then(res =>{
            // console.log(res.form.message)
            this.getProduct()
            this.handleClose()
        })
        .catch(err =>{
            console.log(err.message)
        })

        }
        else if (this.state.action === "update") {
            url = "http://localhost:8080/product/" + this.state.product_id
            axios.put(url, form)
        .then(res =>{
            // console.log(res.form.message)
            this.getProduct()
            this.handleClose()
        })
        .catch(err =>{
            console.log(err.message)
        })
        }
        
    }

    componentDidMount = () => {
        this.getProduct()
    }

    render() {
        return (
            <>
            <Navbar/>
            <div className="hover:bg-violet-400 box-content overflow-y-scroll h-4000">
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6 className='text-center bold'>Data Produk</h6>
                    </div>
                    <div className="">
                        <button className='btn btn-success' onClick={() => this.handleAdd()}>
                            Add Product
                        </button>
                        {this.state.product.map((item, index) => {
                            return(
                            <ProductList key={index}
                                nameImage={item.image}
                                image={"http://localhost:8080/images/product/" + item.image}
                                name={item.name}
                                price={item.price}
                                stock={item.stock}
                                onEdit={() => this.handleEdit(item)}
                                onDrop={() => this.handleDrop(item.product_id)}
                            />
                            )
                        })}
                    </div>

                    <Modal show= {this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Product</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className='mb-3' controlId="name">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder='Insert Product Name' value={this.state.name} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price" placeholder='Insert Product Price' value={this.state.price} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="stock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" name="stock" placeholder='Insert Product Stock' value={this.state.stock} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="image">
                                <Form.Label>Product Photo</Form.Label>
                                <Form.Control type="file" name="image" placeholder='Place Product Photo Here' onChange={this.handleFile}></Form.Control>
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
            </>
        )
    }
}