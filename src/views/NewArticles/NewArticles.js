import React, { Component } from "react";
import { Card,Row,Col} from "react-bootstrap";
import {  CardBody, CardHeader,Form,Input,FormGroup,Button} from 'reactstrap';
import api from '../../config/api';
import axios from 'axios';
import { Link } from 'react-router-dom';
class NewArticles extends Component {
    constructor(props){
        super(props)
        this.state = {
          articles: [],
          modalShow: false,
          name: "",
          description: "",
          country_code: "in",
          dropdownOpen: new Array(19).fill(false),
          category: "",
          query: ""
        }
        this.toggle = this.toggle.bind(this);
        this.country = this.country.bind(this);
        this.category = this.category.bind(this);
        this.query = this.query.bind(this);
    }
    toggle(i) {
      const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
      this.setState({
        dropdownOpen: newArray,
      });
    }
    country(e){
      e.preventDefault();
      console.log(e.target.value);
      this.setState({country_code: e.target.value},this.getArticles)
      console.log(this.state.country_code);
    }
    
    category(e){
      e.preventDefault();
      console.log(e.target.value);
      this.setState({category: e.target.value},this.getArticlesWithCategory)
      console.log(this.state.category);
    }

    query(e){
      e.preventDefault();
      console.log(e.target.value);
      this.setState({query: e.target.value},this.getArticles)
      console.log(this.state.query);
    }

    getArticles(){
      axios.get(`${api.base.newsUrl}/top-headlines?q=${this.state.query}&country=${this.state.country_code}&apiKey=${api.apikey.key}`)
        .then((response)=>{
            console.log(response);
            this.setState({articles: response.data.articles})
            console.log(this.state.articles);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    getArticlesWithCategory(){
      axios.get(`${api.base.newsUrl}/top-headlines?q=${this.state.query}&category=${this.state.category}&apiKey=${api.apikey.key}`)
        .then((response)=>{
            console.log(response);
            this.setState({articles: response.data.articles})
            console.log(this.state.articles);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    componentDidMount(){
        this.getArticles();
    }
    render() {
      return (
        <div className="content">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Pick Country And Category</strong>
              </CardHeader>
              <CardBody>
              <Row>
                <Col xs="12" lg="6" >
                  <Form>
                  <FormGroup>
                  <Input type="select" name="country" id="SelectLm" bsSize="lm" required onChange = { this.country } >
                      <option value="">Please select</option>
                      <option value="us">US</option>
                      <option value="in">IN</option>
                      <option value="au">AU</option>
                    </Input>
                    </FormGroup>
                  </Form>
                </Col>
                <Col xs="12" lg="6" >
                  <Form onChange={this.submit}>
                  <FormGroup>
                  <Input type="select" name="category" id="SelectLm" bsSize="lm" required onChange = { this.category }>
                      <option value="">Please select</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="general">General</option>
                      <option value="health">Health</option>
                      <option value="business">Business</option>
                      <option value="science">science</option>
                      <option value="sports">Sports</option>
                      <option value="technology">Technology</option>
                    </Input>
                    </FormGroup>
                  </Form>
                </Col>
                <Col xs="12" lg="6" >
                  <Form onChange={this.submit}>
                  <FormGroup>
                  <Input type="select" name="query" id="SelectLm" bsSize="lm" required onChange = { this.query }>
                      <option value="">Please select</option>
                      <option value="cricket">cricket</option>
                      <option value="tech">Tech</option>
                      <option value="movies">Movies</option>
                    </Input>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              </CardBody>
            </Card>
            {this.state.articles.map((article,key) => {
              return <Card.Body Style = "margin-top: 15px">
                      <Row>
                      <Col sm={4}>
                        <Card.Img variant="top" src={article.urlToImage} />
                      </Col>
                      <Col sm={8}>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                            {article.content}
                        </Card.Text>
                        <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                        <Link to={"articles/"+ key }> View</Link>
                        </Card.Footer>
                      </Col>
                      </Row>
                      {/* <ViewArticle title={article.title}/> */}
                </Card.Body>
            })}
        </div>
      );
    }
  }
  
  export default NewArticles;