import React, { Component } from 'react';
import './Notice.css';
import ImgSlides from './ImgSlides'
import {getImageUrl} from './util';
var imageDatas = require('./data/imageDatas.json');
imageDatas = getImageUrl(imageDatas);

class Notice extends Component {
  render() {
    return <ImgSlides imageDatas={imageDatas}/>
  }
}

export default Notice;
