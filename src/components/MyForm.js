import React, { Component } from "react";

class MyForm extends Component {
    state = {
        form: {first_name: '', last_name: '', email: '', isEdit: false},
        btnName: "Save",
        btnClass: "ui primary button submit-button"
    };

        isEmpty(obj) {
            return Object.entries(obj).length === 0 && obj.constructor === Object;
        }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            //console.log('update');
            this.setState(
                {
                    form: { ...this.props.customer, isEdit: true},
                    btnName: "Update",
                    btnClass: "ui orange button submit-button"
                }
            );
        }
    };

    handleChange = event =>{
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    };

    onFormSubmit = event => {
        event.preventDefault();

        //call function for form submit
        if(this.formValidation()) {
           // console.log("ready to create");
            //send form data into app
                this.props.onFormSubmit(this.state.form);
        }

        this.clearFormFields();
    };

    formValidation = () => {
        //firstname
        if(document.getElementsByName("first_name")[0].value === '') {
            alert("Enter first name");
            return false; 
        };

            //lastname
         if(document.getElementsByName("last_name")[0].value === '') {
            alert("Enter last name");
            return false; 
        };

         //email
         if(document.getElementsByName("email")[0].value === '') {
            alert("please provide your email");
            return false; 
        };

        return true;
    }

    clearFormFields = () => {
        this.setState({
            form: { first_name: '', last_name: '', email: '', isEdit: false }
        });

        //change the button back to save
        this.setState({
            btnName: "Save",
            btnClass: "ui primary button submit-button"
        })

        //clear form fields
        document.querySelector(".form").reset();
    };

    render() {
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide fields">
                        <label>First Name</label>
                        <input 
                        type="text" 
                        name="first_name" 
                        placeholder="First Name" 
                        onChange={this.handleChange}
                        value={this.state.form.first_name}
                        />
                    </div>

                    <div className="four wide fields">
                        <label>Last Name</label>
                        <input 
                        type="text" 
                        name="last_name" 
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        value={this.state.form.last_name}
                        />
                    </div>

                    <div className="four wide fields">
                        <label>E-mail</label>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="tson@gmail.com"
                        onChange={this.handleChange}
                        value={this.state.form.email}
                        />
                    </div>

                    <div className="four wide fields">
                        <button className={this.state.btnClass} onClick={this.onFormSubmit}>
                            {this.state.btnName}
                            </button>
                    </div>

                </div>
            </form>
        );
    }
}

export default MyForm;