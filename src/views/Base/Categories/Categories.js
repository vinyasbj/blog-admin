import React, { Component } from "react";
import api from '../../../config/api'
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Label,Input,FormGroup,Button,Form} from 'reactstrap';
// import { AppSwitch } from '@coreui/react'
class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {
          categories: [],
          sub_categories: [],
          modalShow: false,
          name: "",
          slug: "",
          category_id: ""
        }
        // this.routeChange = this.routeChange.bind(this);
        // this.deleteCollection = this.deleteCollection.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cat_submit = this.cat_submit.bind(this);
        this.sub_submit = this.sub_submit.bind(this);
        
    }
    onChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    cat_submit(e){
      e.preventDefault();
      // let newObj = this.state.categories.concat({name: this.state.name,slug: this.state.slug})
      // this.setState({categories: newObj})
      axios.post(`${api.base.url}/categories`,{name: this.state.name,slug: this.state.slug})
        .then((response)=>{
            console.log(response);
            let newObj = this.state.categories.concat(response.data.category)
            this.setState({categories: newObj})
            console.log(this.state.categories);
        })
        .catch(function (error) {
            // console.log(`${api.tickets.baseUrl}/collections`);
            console.log(error);
        })
      e.target.reset();
    }

    sub_submit(e){
      e.preventDefault();
      // let newObj = this.state.categories.concat({name: this.state.name,slug: this.state.slug})
      // this.setState({categories: newObj})
      axios.post(`${api.base.url}/sub_categories`,{name: this.state.name,slug: this.state.slug,category: this.state.category_id})
      .then((response)=>{
          console.log(response);
          debugger
            let newObj = this.state.sub_categories.concat(response.data.sub_category)
            this.setState({sub_categories: newObj})
            console.log(this.state.sub_categories);
        })
        .catch(function (error) {
            // console.log(`${api.tickets.baseUrl}/collections`);
            console.log(error);
        })
      e.target.reset();
    }
    componentDidMount(){
        axios.get(`${api.base.url}/categories`)
        .then((response)=>{
            console.log(response);
            this.setState({categories: response.data})
            console.log(this.state.categories);
        })
        .catch(function (error) {
            // console.log(`${api.tickets.baseUrl}/collections`);
            console.log(error);
        })
        axios.get(`${api.base.url}/sub_categories`)
        .then((response)=>{
            console.log(response);
            this.setState({sub_categories: response.data})
            console.log(this.state.sub_categories);
        })
        .catch(function (error) {
            // console.log(`${api.tickets.baseUrl}/collections`);
            console.log(error);
        })

    }
    render() {
      return (
        <div className="animated fadeIn">
           <Row>
            <Col xs="12" lg="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Categories
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Created At</th>
                      {/* <th>Updated At</th> */}
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.map( category =>{
                      return  <tr>
                          <td>{category.name}</td>
                          <td>{category.slug}</td>
                          <td>{category.createdAt}</td>
                          {/* <td>{category.updatedAt}</td> */}
                          <td>
                            <Badge color="success">Active</Badge>
                          </td>
                        </tr>
                    })}
                    </tbody>
                  </Table>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="6">
            <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Create Category
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.cat_submit}> 
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" name= "name"placeholder="Enter name" required onChange = { this.onChange } />
                      <Label htmlFor="name">Slug</Label>
                      <Input type="text" id="slug" name="slug" placeholder="Enter Slug" required onChange = { this.onChange } />
                    </FormGroup>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>      
           </Row>
           <Row>
            <Col xs="12" lg="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Sub Categories
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Category</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.sub_categories.map( sub_category =>{
                      return  <tr>
                          <td>{sub_category.name}</td>
                          <td>{sub_category.slug}</td>
                          <td>{sub_category.category.name}</td>
                          <td>{sub_category.updatedAt}</td>
                          <td>
                            <Badge color="success">Active</Badge>
                          </td>
                        </tr>
                    })}
                    </tbody>
                  </Table>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="6">
            <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Create Sub Category
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.sub_submit}> 
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" name= "name"placeholder="Enter name" required onChange = { this.onChange } />
                      <Label htmlFor="name">Slug</Label>
                      <Input type="text" id="slug" name="slug" placeholder="Enter Slug" required onChange = { this.onChange } />
                      <Label htmlFor="name">Categories</Label>
                      <Input type="select" name="category_id" id="SelectLm" bsSize="lm" required onChange = { this.onChange }>
                        <option >Please select</option>
                        {this.state.categories.map(category => {
                            return <option value={category._id}>{category.name}</option>
                        })}
                      </Input>
                    </FormGroup>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>      
           </Row>         
        </div>
      );
    }
  }
  
  export default Categories;