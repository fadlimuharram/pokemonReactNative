import React from "react";
import Loading from "../components/Loading";
class LoadScreenPost extends React.Component {
  render() {
    if (!this.props.isLoadingPost) {
      this.props.navigation.navigate("List");
    }

    return <Loading />;
  }
}
export default LoadScreenPost;
