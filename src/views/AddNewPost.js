import React, { Component } from "react";
import { Container, Row, Col,Button ,Form,FormInput,FormSelect,FormGroup,FormFeedback} from "shards-react";
// import { Form } from 'react-bootstrap';
import  { Formik, Field } from 'formik';
import axios from 'axios';
import api from '../config/api';
import PageTitle from "../components/common/PageTitle";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "../assets/quill.css"
// import Editor from "../components/add-new-post/Editor";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

class AddNewPost extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      sub_categories: []
    }
    this.getCategories = this.getCategories.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount(){
   this.getCategories();
   this.getOptions();
  }

  getCategories(){
    axios.get(`${api.base.url}/sub_categories`)
    .then((response) => {
      console.log(response);
      // response.map((res)=>{
      //   return this.setState({options: {}})
      // })
      this.setState({sub_categories: response.data})
      // debugger
    }).catch((error) => {

    })
  }

  getOptions(){
  }
  render(){
    return(
      <Formik
          // validateOnBlur={false}
          initialValues = {{
            title: '' || localStorage.getItem('title'), 
            title_description: '' || localStorage.getItem('title_description'),
            description: '',
            imageUrl: ''|| localStorage.getItem('imageUrl'),
            sub_category: null,
          }}

          validate = {
            values =>{
              let errors = {};
              if(!values.title){
                errors.title = 'Title is Required'
              }
              if(!values.title_description){
                errors.title_description = 'Title Description is Required'
              }
              if(!values.description){
                errors.description = 'Description is Required'
              }
              if(!values.imageUrl){
                errors.imageUrl = 'Image is Required'
              }
              if(!values.sub_category){
                errors.sub_category = 'Sub Category is Required'
              }
              return errors;
            }
          }

          onSubmit = {
            (values,{setSubmitting}) =>{
              console.log(values);
              axios.post(`${api.base.url}/articles`,values)
              .then(
                (response) => {
                  if(response.status === 200){
                    window.location.reload();
                    console.log("added ");
                  }else{
                    console.log(response,"error adding artlice");
                  }
                }
              )
            }
          }
        >
        { ({handleSubmit, handleChange, values,errors,handleBlur ,touched,isSubmitting}) => (
            <Container fluid className="main-content-container px-4 ">
                <PageTitle
                  sm="4"
                  title="Add New Blog"
                  subtitle="Overview"
                  className="text-sm-left"
                />
              <Form onSubmit={handleSubmit}>
                      <Row>
                      <Col md="12" className="form-group">
                        <FormInput
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        name="title"
                        type="text"
                        placeholder="Your Blog Title"
                        />
                        {
                          errors.title && touched.title &&  
                          <span style={{ description:"red", fontWeight: "bold" }}>  
                          {errors.title}
                          </span>  
                        }
                    </Col>
                    <Col md="12" className="form-group">
                    <FormInput  
                      name="title_description"
                      type="text"
                      placeholder="Your Blog Title Description"
                      value={values.title_description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      {
                          errors.title_description && touched.title_description &&  
                          <span style={{ description:"red", fontWeight: "bold" }}>  
                          {errors.title_description}
                          </span>  
                        }
                    </Col>
                    <Col md="12" className="form-group">
                    <FormInput  
                      name="imageUrl"
                      type="text"
                      placeholder="Image Url"
                      value={values.imageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      {
                          errors.imageUrl && touched.imageUrl &&  
                          <span style={{ description:"red", fontWeight: "bold" }}>  
                          {errors.imageUrl}
                          </span>  
                        }
                    </Col>
                    <Col md="12" className="form-group">
                      <Field  name= 'description' >
                        {({field}) => <ReactQuill  
                          type="text"
                          className= "add-new-post__editor"
                          placeholder="Your Blog Title Description"
                          value={field.value}
                          onChange={field.onChange(field.name)}
                          // onBlur={field.onChange(field.name)}
                      />}
                      </Field>
                      {
                          errors.description && touched.description &&  
                          <span style={{ description:"red", fontWeight: "bold" }}>  
                          {errors.description}
                          </span>  
                        }
                    </Col>
                    <Col md="6" className="form-group">
                      <FormSelect
                        // options={ this.state.options  }
                        id="sub_category"  
                        name="sub_category"
                        placeholder="Your Blog Title category"
                        value={values.sub_category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        >
                          <option value="">Choose...</option>
                        { this.state.sub_categories.map(sub_category => { 
                           return <option value={sub_category._id}>{sub_category.name}</option>
                        })}
                      </FormSelect>
                      {/* <Field component="select" name="">

                      </Field> */}
                      {
                          errors.sub_category && touched.sub_category &&  
                          <span style={{ description:"red", fontWeight: "bold" }}>  
                          {errors.sub_category}
                          </span>  
                        }
                    </Col>
                    {/* <Col md="6" className="form-group">
                      <FormSelect
                        id="sub category"  
                        name="sub_category"
                        type="select"
                        placeholder="Your Blog Title sub_category"
                        value={values.sub_category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        >
                        <option>Choose...</option>
                        <option>...</option>
                      </FormSelect>
                        {
                            errors.sub_category && touched.sub_category &&  
                            <span style={{ description:"red", fontWeight: "bold" }}>  
                            {errors.sub_category}
                            </span>  
                          }
                    </Col> */}
                  </Row>
                <Button variant="primary" type="submit"  disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            </Container>
          )
        }
      </Formik>
    )
  }
};

export default AddNewPost;