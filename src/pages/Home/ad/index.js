import React from 'react'
import { connect } from 'react-redux'
import { getAdData } from '../../../services/HomeService';

import './style.styl'

class Ad extends React.Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    getAdData()
      .then(res => {
        this.setState({
          items: res
        })
      })
  }
  render() {
    return (
      <div id="home-sale">
        <h2 className="home-list-title">功能列表</h2>
        <div className="sale-container clear-fix">
          {this.state.items.map((item, index) => {
            return <div key={index} className="sale-item float-left">
              <a href="/search/jingdian"><img src={item.img} alt={item.title}/></a>
              <a><text > {item.title} </text></a>
            </div>
          })}
        </div>
      </div>
    )
  }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ad)
