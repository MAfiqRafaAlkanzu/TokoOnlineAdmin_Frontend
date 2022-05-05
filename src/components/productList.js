import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

export default class ProductList extends React.Component{
    render (){
        return(
            <div className="card col sm-12 my-1 shadow-sm p-3 mb-5 bg-body round">
                <div className="card-body row">
                    <div className="col-sm-3">
                        <img alt={this.props.name} src={this.props.image} 
                        className= "img rounded-circle" width="150" height="150"/>
                    </div>
                    <div className="col-sm-7">
                        <h5 className="text-bold">Name: {this.props.name}</h5><br />
                        <h6>Price : {this.props.price}</h6><br />
                        <h6>Stock : {this.props.stock}</h6>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-primary" onClick={this.props.onEdit}>Edit</button><br />
                        <button className="btn btn-danger" onClick={this.props.onDrop}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}