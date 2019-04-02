import React from 'react';
import Map from './Map';
import {Rec} from './Rec';

export class Main extends React.Component {
    constructor(props){
        super(props);
        this.handleRecommendedInit = this.handleRecommendedInit.bind(this);
        this.state = {
            recommendedInit: []
        };
    }

    handleRecommendedInit(venues){
        this.setState({
            recommendedInit: venues
        });
        console.log(this.state.recommendedInit);
    }
    render() {
        return (
            <div className="main">
                <Map onRecommendedInit={this.handleRecommendedInit}/>
                <Rec recommendedInit={this.state.recommendedInit}/>
            </div>
        );
    }
}