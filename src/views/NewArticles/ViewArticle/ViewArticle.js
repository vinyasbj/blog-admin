import React, { Component } from "react";
import { Card,Row,Col} from "react-bootstrap";
import api from '../../../config/api';
import axios from 'axios';
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
                {this.state.article.title}
            </div>
    )}
}
export default ViewArticle;