import React from "react";
import Slider from "../components/Slider";

const SliderTest = props => {
  document.title = "Home Page";
  return (
    <Slider title="jee" background="">
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </Slider>
  );
};

export default SliderTest;
