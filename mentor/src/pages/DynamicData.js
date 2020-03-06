import React, { Component } from "react";
import "../styles/DynamicData.css";
class DynamicData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    callAPI() {
        fetch("http://localhost:9000/fetchData")
            .then(res => res.json())
            .then(json => this.setState({
                images: json
            }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        var {images} = this.state;
        return (
            <div id="large">
                {images.filter(largeImage => largeImage.id === this.props.match.params.thumbnail)
                    .map((largeImage) => {
                        const largeDetails = {
                            src: require("../images/large/" + largeImage.image),
                            title: largeImage.title,
                            description: largeImage.description,
                            cost:largeImage.cost,
                            id:largeImage.id,
                            thumbnailFile: largeImage.thumbnail,
                            largeImageFile: largeImage.image
                        };
                        return (
                            <div className="group" key={largeDetails.id}>
                                <img src={largeDetails.src} alt="Large" width="430" height="360"/>
                                <div className="details">
                                    <p><strong>Title</strong>{largeDetails.title}</p>
                                    <p><strong>Description</strong> {largeDetails.description}</p>
                                    <p><strong>Cost</strong>{largeDetails.cost}</p>
                                    <p><strong>ID #</strong>{largeDetails.id}</p>
                                    <p><strong>Thumbnail File</strong>{largeDetails.thumbnailFile}</p>
                                    <p><strong>Large Image File</strong>{largeDetails.largeImageFile}</p>
                                </div>
                            </div>
                        );
                })}
            </div>
        );
    }
}

export default DynamicData;