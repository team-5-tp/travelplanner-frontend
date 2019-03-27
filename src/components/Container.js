import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';
import {Map} from './Map';

class Container extends React.Component {
    render() {
        return (
          <div>
            <Map google={this.props.google}
              />
          </div>
        )
    }
  }
  
  export default GoogleApiComponent({
    apiKey: "AIzaSyATFIrZKBWlruz0xmf5uKDne-xBEv9Umls"
  })(Container)
