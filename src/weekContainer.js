import React, { Component } from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';

const weatherURL =
  `http://api.openweathermap.org/data/2.5/forecast?zip=78741&units=imperial&APPID=${apiConfig.owmKey}`

class WeekContainer extends Component {

  state = {
    fullData: [],
    dailyData: [],
    degreeType: "farenheit"
  }

  componentDidMount = () => {
    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        this.setState({
          fullData: data.list,
          dailyData: dailyData
        }, () => console.log(this.state))
      })
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard degreeType={this.state.degreeType} reading={reading} key={index} />)
  }

  render() {
    return (
      <div className="week-container">
        <h1 className="display-1 jumbotron">5-Day Forecast</h1>
        <h5 className="display-5 text-muted">Austin, US</h5>
        <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree} />
        <div className="row justify-content-center">
          {this.formatDayCards()}
        </div>
      </div>
    );
  }
}

export default WeekContainer;