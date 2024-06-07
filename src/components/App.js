import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";

class App extends Component {
    state = {
        customers: [],
        customer: {},
        loader: false,
        url: "http://127.0.0.1:8000/api/customers"
    };

    getCustomers = async () => {
        this.setState({ loader: true });
        try {
            const response = await axios.get(this.state.url);
            console.log("Response from API:", response.data); // Log the whole response
            const customers = Array.isArray(response.data.customers) ? response.data.customers : [];
            this.setState({ customers, loader: false }, () => {
                console.log("State after setting customers:", this.state.customers); // Log the updated state
            });
            
        } catch (error) {
            console.error("Error fetching customers:", error);
            this.setState({ customers: [], loader: false }); // Fallback to an empty array on error
        }
    };

    deleteCustomer = async (id) => {
        this.setState({ loader: true });
        try {
            await axios.delete(`${this.state.url}/${id}/delete`);
            this.getCustomers(); // Refresh the customer list after deletion
        } catch (error) {
            console.error("Error deleting customer:", error);
            this.setState({ loader: false });
        }
    };

    createCustomer = async (data) => {
        this.setState({ loader: true });
        await axios.post(this.state.url, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        });

        this.getCustomers();
    };

    editCustomer = async (data) => {
        this.setState({ customer: {}, loader: true });
        await axios.put(`${this.state.url}/${data.id}/edit`, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        });

        this.getCustomers();

    };


    componentDidMount(){
        this.getCustomers();
    }

    onDelete = (id) => {
        //console.log("app", id);
        this.deleteCustomer(id);
    };

    onEdit = data => {
       // console.log("app", data);
       this.setState({ customer: data });
    };

        onFormSubmit = data => {
            //console.log('app', data);
            this.editCustomer(data);
            if(data.isEdit)
                {

                } else
                    {
                        this.createCustomer(data);
                    }
        };

    render () {
        console.log("App state:", this.state); // Log the entire state
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            React JS CRUD with Laravel API
                        </a>
                    </div>
                </div>

                <div className="ui main container">
                    <MyForm 
                    onFormSubmit={this.onFormSubmit}
                    customer={this.state.customer}
                    />

                    {
                        this.state.loader ? <Loader />: ""
                    }

                    <CustomerList 
                    customers={this.state.customers} 
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    />
                </div>
            </div>

        );
    }
}

export default App;