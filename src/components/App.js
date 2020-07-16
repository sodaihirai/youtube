import React from "react";
import youtube from "../api/youtube";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit("天海祐希");
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        key: "AIzaSyDiNh4NN0v1WYHtFOiug15CJgtDNEFQlBU",
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect = (video) => {
    return this.setState({ selectedVideo: video });
  };

  renderVideoDetail = () => {
    if (this.state.selectedVideo) {
      return <div>{JSON.stringify(this.state.selectedVideo)}</div>;
    } else {
      return <div>wait</div>;
    }
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
