import React, { Component } from "react";
import Customer from "./Customer";

class CustomerList extends Component {
    onDelete = (id) => { 
        this.props.onDelete(id);
        //console.log("customer list", id);
    };

    onEdit = data => { 
            this.props.onEdit(data);
       // console.log("customer list", data);
    };

    render() {
        //const customers = Array.isArray(this.props.customers) ? this.props.customers : [];
        const { customers } = this.props;
        console.log("Customers in CustomerList:", customers); // Add this in the render method

        return (
            <div className="data">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th style={{ width: '50px', textAlign: "center"}}>#</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th style={{ width: "148px" }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {customers.map(customer => (
                        <Customer 
                        key={customer.id} 
                        customer={customer} 
                        onDelete={this.onDelete} 
                        onEdit={this.onEdit} 
                        />
                    ))}
                    </tbody>
                </table>

            </div>
        );
    } 
}

export default CustomerList;