import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody,FormInput ,Button,Form} from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import  { Formik, Field } from 'formik';
import axios from 'axios';
import api from '../config/api';


class Categories extends Component{
    constructor(props){
        super(props)
        this.state = {
            categories: [],
            subCategories: [],
            isEdit: false
        }
        this.getCategories = this.getCategories.bind(this);
        this.getSubCategories= this.getSubCategories.bind(this);
        // this.createCategory = this.createCategory.bind(this);
        // this.createSubCategory = this.createSubCategory.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        this.getCategories();
        this.getSubCategories();
    }
     
    getCategories(){
        axios.get(`${api.base.url}/categories`)
        .then((response) => {
            console.log(response);
            this.setState({categories: response.data})
        }).catch((error) => {
            
        })
    }


    getSubCategories(){
        axios.get(`${api.base.url}/sub_categories`)
        .then((response) => {
            console.log(response);
            this.setState({subCategories: response.data})
        }).catch((error) => {
            
        })
    }

    onChange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
        // console.log(this.state);
    }

    render(){
        return(
            <div>
                <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Add New Category" subtitle="Blog Category" className="text-sm-left" />
                </Row>
                <Row>
                <Col sm= "6">
                    <Card small className="mb-4 overflow-hidden">
                    <CardHeader className="bg-dark">
                        <h6 className="m-0 text-white"> Categories</h6>
                    </CardHeader>
                    <CardBody className="bg-dark p-0 pb-3">
                        <table className="table table-dark mb-0">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col" className="border-0">
                                ID
                            </th>
                            <th scope="col" className="border-0">
                                Name
                            </th>
                            <th scope="col" className="border-0">
                                Actions
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((category,id) =>(
                                <tr>
                                <td>{id}</td>
                                <td>{category.name}</td>
                                <td> <Button onClick={this.editCategory}>Edit</Button>  </td>
                                <td> <Button onClick={this.deleteCategory}>Delete</Button> </td>  
                                </tr>
                            )
                            )}
                        </tbody>
                        </table>
                    </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Form onSubmit={ (this.state.isEdit) ? this.editCategory : this.createCategory}>
                        <Row form>
                        <Col md="6" className="form-group">
                            <label htmlFor="categoryName">Name</label>
                            <FormInput
                            id="categoryName"
                            type="text"
                            placeholder="Category Name"
                            value = ""
                            required
                            />
                        </Col>
                        </Row>
                        <Button type="submit">{(this.state.isEdit) ? "Update " : "Create "}Category</Button>
                    </Form>
                </Col>
            </Row>
                </Container>
            </div>
        )
    }
}

export default Categories;