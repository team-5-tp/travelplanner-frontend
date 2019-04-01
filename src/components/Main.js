import React from 'react';
import Map from './Map';
import {RecommendedVenues} from './RecommendedVenues';

export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Map />
                <RecommendedVenues />
            </div>
        );
    }
}