import React, { Component } from 'react';
import '../songPage/song.css';

export default class TopSongsDetail extends Component {
  constructor(props) {
    super();
    this.state = {
      "name": props.track.name,
      "artist": props.track.artists[0].name,
      "album": props.track.album.name,
      "uri": props.track.uri,
      "accessToken": props.accessToken,
      "image": props.track.album.images[0].url
    }
    console.log(props);
  }
  render() {
    return (
      <div className="row songInfo">
        <div className="col-sm-2">
          <img className="img-detail rounded-circle" src={this.state.image} />
        </div>
        <div className="col-sm-10">
          {this.state.name}
          <div className = "songArtist">{this.state.artist}</div>
        </div>
      </div>)
  }
}
