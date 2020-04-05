import React, { Component } from "react";
import { Card,Row,Col} from "react-bootstrap";
import api from '../../../config/api';
import axios from 'axios';
import { Link } from 'react-router-dom';
class ViewArticle extends Component {
    constructor(props){
        super(props)
        this.state = {
            article: {},
            country_code: "in"
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        let id = this.props.match.params.id;
        axios.get(`${api.base.newsUrl}/top-headlines?country=${this.state.country_code}&apiKey=${api.apikey.key}`)
        .then((response)=>{
            console.log(response);
            // debugger
            this.setState({article: response.data.articles[id]})
            console.log(this.state.article);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        return (
            <div className="content">
                
                <div className="card">
                <div className="card-header">
                {this.state.article.title}
                </div>
                <div className="card-body">
                    <div className="bd-example">
                    <dl className="row">
                        <dt className="col-sm-3">Description</dt>
                        <dd className="col-sm-9">{this.state.article.description}</dd>

                        <dt className="col-sm-3">Image</dt>
                        <dd className="col-sm-9">
                        <p>{this.state.article.urlToImage}</p>
                        </dd>
                        <dt className="col-sm-3">Published At</dt>
                        <dd className="col-sm-9">
                        <p>{this.state.article.publishedAt}</p>
                        </dd>

                        <dt className="col-sm-3">Source URL</dt>
                        <dd className="col-sm-9"> <a target="_blank" href={this.state.article.url}> View Source</a> </dd>
                    </dl>
                    </div>
                </div>
                </div>
            </div>
    )}
}
export default ViewArticle;