import React from "react";
import Loading from "../components/Loading";
class LoadScreen extends React.Component {
  render() {
    if (!this.props.isLoadingUpdate) {
      this.props.navigation.navigate("TabNav");
    }

    return <Loading />;
  }
}
export default LoadScreen;
