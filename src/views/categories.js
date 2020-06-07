import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody,FormInput ,Button,Form,FormSelect} from "shards-react";
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
            isEdit: false,
            name: null,
            slug:null,
            isSubEdit: false,
            subName: null,
            subSlug: null,
            category: null,
            subId: null,
        }
        this.getCategories = this.getCategories.bind(this);
        this.getSubCategories = this.getSubCategories.bind(this);
        this.editCategory = this.editCategory.bind(this);
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
    }

    editCategory(slug,name){
        this.setState({isEdit: true,name: name,slug: slug})
    }

    editSubCategory(slug,name,categoryId){
        this.setState({isSubEdit: true,subName: name,slug: slug,category: categoryId})
    }
    
    updateCategory(e){
        // e.preventDefault();
        axios.put(`${api.base.url}/categories/${e.target.slug.value}`,{name: e.target.name.value})
        .then((response) => {
            console.log(response);
            this.setState({categories: response.data})
        }).catch((error) => {
            
        })
    }

    updateSubCategory(e){
        debugger
        // e.preventDefault();
        axios.put(`${api.base.url}/sub_categories/${e.target.slug.value}`,{name: e.target.subName.value,category: e.target.category.value})
        .then((response) => {
            console.log(response);
            this.setState({categories: response.data})
        }).catch((error) => {
            
        })
    }

    createCategory(e){
        e.preventDefault();
        axios.post(`${api.base.url}/categories/`,{name: e.target.name.value})
        .then((response) => {
            console.log(response);
            window.location.reload();
            // this.setState({categories: response.data})
        }).catch((error) => {
            
        })
    }

    createSubCategory(e){
        // debugger
        // e.preventDefault();
        axios.post(`${api.base.url}/sub_categories/`,{name: e.target.subName.value,category: e.target.category.value})
        .then((response) => {
            console.log(response);
            // this.setState({subCategories: response.data})
        }).catch((error) => {
            
        })
    }

    deleteCategory(slug){
        var v = window.confirm("Are You Sure!!");
        if (v){
            axios.delete(`${api.base.url}/categories/${slug}`)
            .then((response) => {
                console.log(response);
                window.location.reload();
            }).catch((error) => {
                
            })
        }
    }

    deleteSubCategory(slug){
        var v = window.confirm("Are You Sure!!");
        if (v){
            axios.delete(`${api.base.url}/sub_categories/${slug}`)
            .then((response) => {
                console.log(response);
                window.location.reload();
            }).catch((error) => {
                
            })
        }
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
                                <td>{id+1}</td>
                                <td>{category.name}</td>
                                <td> <Button onClick={() => this.editCategory(category.slug,category.name)}>Edit</Button>  </td>
                                <td> <Button onClick={() => this.deleteCategory(category.slug)}>Delete</Button> </td>  
                                </tr>
                            )
                            )}
                        </tbody>
                        </table>
                    </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Form onSubmit={ (this.state.isEdit) ? this.updateCategory : this.createCategory}>
                        <Row form>
                        <Col md="6" className="form-group">
                            <label htmlFor="categoryName">Name</label>
                            <FormInput
                            id="categoryId"
                            type="text"
                            name="slug"
                            placeholder="Category Name"
                            value = {"" || this.state.slug}
                            onChange = {this.onChange}
                            hidden
                            />
                            <FormInput
                            id="categoryName"
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value = {"" || this.state.name}
                            onChange = {this.onChange}
                            required
                            />
                        </Col>
                        </Row>
                        <Button type="submit" >{(this.state.isEdit) ? "Update " : "Create "}Category</Button> &nbsp;
                        <Button onClick={()=> {this.setState({isEdit: false,name:"",id: ""}) }} >Clear</Button>
                    </Form>
                </Col>
                </Row>

                    <Row noGutters className="page-header py-4">
                        <PageTitle sm="4" title="Add New Sub Category" subtitle="Blog SubCategory" className="text-sm-left" />
                    </Row>
                <Row>
                <Col sm= "6">
                    <Card small className="mb-4 overflow-hidden">
                    <CardHeader className="bg-dark">
                        <h6 className="m-0 text-white">Sub Categories</h6>
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
                                Category
                            </th>
                            <th scope="col" className="border-0">
                                Actions
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.subCategories.map((category,id) =>(
                                <tr>
                                <td>{id+1}</td>
                                <td>{category.name}</td>
                                <td>{(category.category == null) ? "-" : category.category.name }</td>
                                <td> <Button onClick={() => this.editSubCategory(category.slug,category.name,null || category.category._id )}>Edit</Button>  </td>
                                <td> <Button onClick={() => this.deleteSubCategory(category.slug)}>Delete</Button> </td>  
                                </tr>
                            )
                            )}
                        </tbody>
                        </table>
                    </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Form onSubmit={ (this.state.isSubEdit) ? this.updateSubCategory : this.createSubCategory}>
                        <Row form>
                        <Col md="6" className="form-group">
                            <label htmlFor="categoryName">Name</label>
                            <FormInput
                            id="categoryId"
                            type="text"
                            name="slug"
                            placeholder="Sub Category Name"
                            value = {"" || this.state.slug}
                            onChange = {this.onChange}
                            hidden
                            />
                            <FormInput
                            id="categoryName"
                            type="text"
                            name="subName"
                            placeholder="Sub Category Name"
                            value = {"" || this.state.subName}
                            onChange = {this.onChange}
                            required
                            />
                        </Col>
                        <Col md="6" className="form-group">
                            <label htmlFor="categoryName">Categories</label>
                            <FormSelect
                            id="categoryId"
                            type="text"
                            name="category"
                            placeholder="Category Name"
                            value = {"" || this.state.category}
                            onChange = {this.onChange}
                            required
                            >
                                <option>Choose...</option>
                            {this.state.categories.map((category)=> {
                                return<option value={category._id}>{category.name}</option>
                            })}
                            </FormSelect>
                        </Col>
                        </Row>
                        <Button type="submit" >{(this.state.isSubEdit) ? "Update " : "Create "}Sub Category</Button> &nbsp;
                        <Button onClick={()=> {this.setState({isSubEdit: false,subName:"",id: "",category: ""}) }} >Clear</Button>
                    </Form>
                </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default Categories;