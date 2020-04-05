import React, { Component } from "react";
import { Card,Row,Col} from "react-bootstrap";
import {  CardBody, CardHeader,Form,Input,FormGroup,Button} from 'reactstrap';
import api from '../../../config/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Articles extends Component{
    constructor(props){
        super(props)
        this.state ={
            articles: []
        }
    }
    getArticles(){
        axios.get(`${api.base.url}/articles`)
          .then((response)=>{
              console.log(response);
              this.setState({articles: response.data})
              console.log(this.state.articles);
          })
          .catch(function (error) {
              console.log(error);
          })
    }
    componentDidMount(){
        this.getArticles();
    }
    
    render(){
        return(
            <div className="content">
            {this.state.articles.map((article,key) => {
              return <Card.Body Style = "margin-top: 15px">
                      <Row>
                      <Col sm={4}>
                        <Card.Img variant="top" src={article.imageUrl} />
                      </Col>
                      <Col sm={8}>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                            {article.description}
                        </Card.Text>
                        <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                        <Link to={"articles/"+ article.slug }> View</Link>
                        </Card.Footer>
                      </Col>
                      </Row>
                      {/* <ViewArticle title={article.title}/> */}
                </Card.Body>
            })}
            </div>
        )
    }
}

export default Articles;