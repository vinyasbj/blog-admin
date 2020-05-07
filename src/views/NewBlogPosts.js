/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import api from '../config/api';
import axios from 'axios';
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

class NewBlogPosts extends React.Component {
  constructor(props) {
    super(props);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.storeArticle = this.storeArticle.bind(this);
    this.state = {
      PostsListOne: [],
      country_code: "in"
    };
  }

  componentDidMount(){
    this.getArticles();
  }

  dateFormatter(datetime){
    // const today = Date.now();
    // console.log(moment(today).format('LLLL'));
    return moment(datetime).format('LLL');
  }

  storeArticle(article){
    localStorage.setItem("title",article.title);
    localStorage.setItem("title_description",article.title_description);
    localStorage.setItem("imageUrl",article.urlToImage);
    localStorage.setItem("author",article.author);
    localStorage.setItem("source",article.source.name);
  }
  
  getArticles(){
    axios.get(`${api.base.newsUrl}/top-headlines?language=en&country=${this.state.country_code}&apiKey=${api.apikey.key}`)
        .then((response)=>{
            console.log(response);
            this.setState({PostsListOne: response.data.articles})
            console.log(this.state.PostsListOne);
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  render() {
    const {
      PostsListOne,
      PostsListTwo,
      PostsListThree,
      PostsListFour
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Blog Posts" subtitle="Components" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.urlToImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-info`}
                  >
                    {post.source.name}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.urlToImage}')` }}
                    >
                      Written by {post.author}
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href={post.url} target="_blank" className="text-fiord-blue">
                      {post.title}
                    </a>
                    <Link to={`add-new-post`}>  <Button  onClick={() => this.storeArticle(post)}>Write UP</Button> </Link>
                    {/* <Button  onClick={this.storeArticle(post)}> <Redirect to="/add-new-post" />Add</Button> */}
                    
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.description}</p>
                  <span className="text-muted">{this.dateFormatter(post.publishedAt)}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default NewBlogPosts;
