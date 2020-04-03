import React, { Component } from "react";
import { Card,Row,Col} from "react-bootstrap";
import api from '../../config/api';
import axios from 'axios';
class NewArticles extends Component {
    constructor(props){
        super(props)
        this.state = {
          articles: [],
          modalShow: false,
          name: "",
          description: "",
          country_code: "in"
        }
        // this.routeChange = this.routeChange.bind(this);
        // this.deleteCollection = this.deleteCollection.bind(this);
        // this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        axios.get(`${api.base.newsUrl}/top-headlines?country=${this.state.country_code}&apiKey=${api.apikey.key}`)
        .then((response)=>{
            console.log(response);
            this.setState({articles: response.data.articles})
            console.log(this.state.articles.articles);
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    render() {
      return (
        <div className="content">
            {this.state.articles.map(article => {
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
                        </Card.Footer>
                      </Col>
                      </Row>
                </Card.Body>
            })}
        </div>
      );
    }
  }
  
  export default NewArticles;