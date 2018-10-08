import React from 'react'

export default class CityList extends React.Component {
  static cityList = ['中山大学东校区', '华南理工大学南校区', '广州大学', '广美', '星海', '港中文', '南京', '天津',
    '重庆', '厦门', '武汉', '郑州'];

  constructor({ match }) {
    super();
    this.state = {
      match
    }
  }

  clickHandle(cityName) {
    console.log(cityName)
    const changeFn = this.props.changeCallback
    changeFn(cityName)
  }

  render() {
    return (
      <div className="city-list-container">
        <h3>学校列表</h3>
        <ul className="clear-fix">
          {CityList.cityList.map((item, index) => {
            return <li key={index}><span onClick={this.clickHandle.bind(this, item)}>{item}</span></li>
          })}
        </ul>
      </div>
    )
  }
}
