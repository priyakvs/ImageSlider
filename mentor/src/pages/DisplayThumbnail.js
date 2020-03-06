import React, { Component } from "react";
import "../styles/DisplayThumbnail.css";
import {NavLink, Redirect} from "react-router-dom";
import {Card, CardGroup, CardImg, CardBody, CardTitle} from 'reactstrap';
class DisplayThumbnail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            defaultimages:{
                index : 0,
                default: []
            },
            isLoaded: false,
        }
    }

    callAPI() {
        var imageArray = [];
        fetch("http://localhost:9000/fetchData")
            .then(res => res.json())
            .then(json =>{ for(var i= 0;i<4 && i< json.length;i++)
                    imageArray.push(json[i])
                this.setState({
                images: json,
                defaultimages: {
                    index:0,
                    default: imageArray
                },
                isLoaded: true
            })})
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    nextProperty = () => {
        const newIndex = this.state.defaultimages.index + 4;
        var imageArray = [];
        for(var i= newIndex;i<newIndex+4 && i< this.state.images.length;i++)
            imageArray.push(this.state.images[i])
        this.setState({
            defaultimages: {
                index: newIndex,
                default: imageArray
            }})
    }

    previousProperty = () => {
        const newIndex = this.state.defaultimages.index - 4;
        var imageArray = [];
        for(var i= newIndex;i<newIndex+4 && i< this.state.images.length;i++)
            imageArray.push(this.state.images[i])
        this.setState({
            defaultimages: {
                index: newIndex,
                default: imageArray
            }})
    }

    render() {
        var {images,defaultimages,isLoaded} = this.state;
        if(!isLoaded){
            return <div>Error in data load.</div>
        }
        return (
            <div className="thumbnails">
                <Redirect to={defaultimages.default[0].id}/>
                    <div className="group">
                        <CardGroup>
                        {defaultimages.default.map((thumbnailImages) => {
                            const thumbnailDetails = {
                                src: require("../images/thumbnails/"+thumbnailImages.thumbnail),
                                name: thumbnailImages.thumbnail,
                                id: thumbnailImages.id
                                };
                            return (
                                <Card key={thumbnailDetails.id}>
                                    <NavLink to={thumbnailDetails.id}>
                                        <CardImg src={thumbnailDetails.src} alt="7111-m" width="145" height="121"/>
                                        <CardBody>
                                            <CardTitle>{thumbnailDetails.name}</CardTitle>
                                        </CardBody>
                                    </NavLink>
                                </Card>
                                );
                        })}
                        <button className="previous" onClick={() => this.previousProperty()} disabled={defaultimages.index === 0}></button>
                        <button className="next" onClick={() => this.nextProperty()} disabled={defaultimages.index + 4 >= images.length}></button>
                        </CardGroup>
                    </div>
            </div>
        );
    }
}

export default DisplayThumbnail;