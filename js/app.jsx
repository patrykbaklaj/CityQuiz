import React from 'react';
import ReactDOM from 'react-dom';

const map_Url = "images/Poland_map.svg";
const helloText = "Twoje zadanie polega na zaznaczaniu na mapie wyświetlanych miast. Im bliżej będziesz, tym więcej punktów dostaniesz. Pamiętej, że na zaznaczenie każdego miasta masz tylko 10 sekund.... Zaczynamy?";
let userName = "";
let userTotalScore = 0;
const citiesArray =
[{id: 1, city: "Bielsko-Biała", cityN: 49.819, cityE: 19.049},
{id: 2, city: "Bydgoszcz", cityN: 53.120, cityE: 18.010 },
{id: 3, city: "Gdańsk", cityN: 54.360, cityE: 18.639 },
{id: 4, city: "Gorzów Wielkopolski", cityN: 52.740, cityE: 15.230},
{id: 5, city: "Warszawa", cityN: 52.259, cityE: 21.020},
{id: 6, city: "Łódź", cityN: 51.770, cityE: 19.459},
{id: 7, city: "Wrocław", cityN: 51.110, cityE: 17.030},
{id: 8, city: "Poznań", cityN: 52.399, cityE: 16.900},
{id: 9, city: "Szczecin", cityN: 53.430, cityE: 14.529},
{id: 10, city: "Lublin", cityN: 51.240, cityE: 22.570},
{id: 11, city: "Katowice", cityN: 50.259, cityE: 19.020},
{id: 12, city: "Białystok", cityN: 53.139, cityE: 23.159},
{id: 13, city: "Gdynia", cityN: 54.520, cityE: 18.530},
{id: 15, city: "Częstochowa", cityN: 50.810, cityE: 19.129},
{id: 16, city: "Radom", cityN: 51.339, cityE: 21.159 },
{id: 17, city: "Sosnowiec", cityN: 50.279, cityE: 19.120},
{id: 18, city: "Toruń", cityN: 53.020, cityE: 18.609},
{id: 19, city: "Kielce", cityN: 50.889, cityE: 20.649},
{id: 20, city: "Olsztyn", cityN: 53.779, cityE: 20.489}
];



class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "Nieznajomy"
    }
  }
  onClickSkip(e) {
    e.preventDefault();
    this.props.onLogin();
  }
  onClickNext(e) {
    e.preventDefault();
    userName = this.state.userName;
    this.props.onLogin();
  }
  onChange(e) {
    this.setState(
      {userName: e.target.value}
    )
  }
  render(){
    return <div>
      <div className="login_header">
        <h1>Witaj w grze City Quiz !</h1>
      </div>
      <div className="login_pane">
        <h3>Podaj pseudonim, aby zapisać swój wynik w rankingu!</h3>
        <input type="text" placeholder="pseudonim" onChange={e => this.onChange(e)}></input>
        <button className="login_next_button" onClick={e => this.onClickNext(e)}>Dalej!</button>
        <button className="login_skip_button" onClick={e => this.onClickSkip(e)}>Pomiń</button>
      </div>
    </div>

  }
}

class InfoTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: false,
      end: false,
      next: 0,
      city: this.props.cityRandom
    }
  }

  startGame() {
    console.log("start game - Info");
    this.setState({
      start: true
    });
  }

  loadMap(e){
    console.log("load map - Info");
    this.props.loadMap(e);
  }

  nextCity(e){
    console.log("Next City - Info");
    this.props.hideMap();
    this.setState({
      next: this.state.next + 1
    })
  }

  reloadCity(e) {
    console.log("reloadCity - Info");
    e.preventDefault();
    this.props.showMap();
    this.setState({
      next: 0,
      city: this.props.cityRandom
    })
  }

  endGame(){
    this.setState({
      end: true
    })
  }

  render(){
    if(userName === ""){
      userName = "Nieznajomy"
    }

    if(this.state.end) {
      console.log("game over");
      return <div className="game_over">
        <h2 className="game_over_user">{userName},</h2>
        <h2>gra zakończona</h2>
        <h1>Twój wynik to: {userTotalScore} punktów!</h1>
      </div>

    }

    if(this.state.next > 0) {
      return <div className="info_table">
        <div className="city_display">
          <h1>Następne miasto?</h1>
          <button onClick = { (e) => this.reloadCity(e)}>Next!</button>
          <button onClick = { (e) => this.endGame(e)}>Zakończ!</button>
        </div>
      </div>
    }

    if(this.state.start) {
      return <div className="info_table">
        <div className="city_display">
          <h1 className="city_mark_text">Zaznacz podane miasto na mapie  </h1>
          <h1 className="city_name">{this.state.city.city}</h1>
        </div>
        <ScoreSummary countingEnd = {(e) => this.nextCity(e)}/>
      </div>
    } else {
      return <div className="info_table">
        <h1>
          Witaj {userName}!
        </h1>
        <p>
          {helloText}
        </p>
        <Buttons onStartGame ={() => this.startGame()} onLoadMap = {(e) => this.loadMap(e)}/>
      </div>
    }
  }
}

class ScoreSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 10,
      className: "time",
      clicked: false
    }
  }
  componentDidMount(){
    let intervalId = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({
          seconds: this.state.seconds - 1,
          className: "time" + this.state.seconds
        })

      } else {
        this.setState({
          seconds: 0
        })
        this.props.countingEnd();
        clearInterval(intervalId);
      }
    }, 1000);
  }

  render () {
    console.log("render ScoreSummary");
    return <div className="score_summary">
      <p>Pozostało: </p>
      <p>{this.state.seconds} s</p>
      <div className={this.state.className}></div>
    </div>
  }
}

class Buttons extends React.Component {
  constructor(props){
    super(props);
  }

  onClick(e){
    e.preventDefault();
    this.props.onStartGame();
    this.props.onLoadMap();
  }

  render() {
    console.log("render z buttons");
    return   <div className="buttons_container">
      <button className="button start_button" onClick = {(e) => this.onClick(e)}>Start</button>

    </div>
  }
}

class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      totalScore: 0,
      start: false,
      randomCity: this.randomCity()
    }
  }

  randomCity() {
    let index = Math.floor( Math.random() * citiesArray.length );
    let item = citiesArray[index];
    citiesArray.splice(index, 1);
    console.log(citiesArray);

    return item;
  }

  loadMap(e){
    this.setState({
      start: true
    })
  }

  newCity(e) {
    this.setState({
      randomCity: this.randomCity()
    })
  }

  onHideMap(){
    this.setState({
      start: false,
    });
    this.newCity();
  };

  render() {
    if(this.state.start){
      return <div className="map_container">
        <InfoTable loadMap={(e) => this.loadMap(e)} hideMap={ (e) => this.onHideMap(e) } cityRandom={this.state.randomCity} />
        <Map cityRandom={this.state.randomCity} />
      </div>
    }
    else {
      return <div className="map_container">
        <InfoTable loadMap={(e) => this.loadMap(e)}  showMap={ (e) => this.loadMap(e)} cityRandom={this.state.randomCity} />
      </div>
    }
  }
}

class ResultTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      kilometers: this.props.kilometers,
      score: this.props.score
    }
    userTotalScore = userTotalScore + this.state.score;
  }

  render(){
    return <div className="result_tab">
      <h1>Odległość: {this.state.kilometers} km</h1>
      <h3>Punkty: {this.state.score}</h3>
    </div>
  }
}


class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: this.props.cityRandom.city,
      coordX: "",
      coordY: "",
      cityX: Math.abs(this.props.cityRandom.cityE - 13.787) * 9.16,
      cityY: Math.abs(this.props.cityRandom.cityN - 55.191) * 14.83,
      display: "none",
      click: false,
      score: ""
    };
  }

  calculateKm() {
    console.log("calculateKm");
    return Math.round(Math.sqrt(Math.pow(Math.abs(this.state.cityX - this.state.coordX)*8, 2) + Math.pow(Math.abs(this.state.cityY - this.state.coordY)*8 ,2)));
  }

  calculateScore() {
    console.log("calculateScore");
    return Math.round(10000 / this.calculateKm());
  }

  onClickMap(event) {
    console.log("onClickMap");
    this.setState({
      coordX: (100 * (Math.abs(event.nativeEvent.offsetX/event.nativeEvent.target.clientWidth)) - 1.3),
      coordY: (100 * (Math.abs(event.nativeEvent.offsetY/event.nativeEvent.target.clientHeight)) - 1.3),
      display: "block",
      click: true
    });
  }

  render(){
    console.log(userTotalScore)
    if(this.state.click) {
      return <div className="main_map">
        <img src={map_Url}></img>
        <div className="point" style={{
            position: "absolute",
            display: this.state.display,
            top: this.state.coordY + "%",
            left: this.state.coordX + "%"
          }}>
        </div>
        <div className="pointCity" style={{
            position: "absolute",
            display: this.state.display,
            top: this.state.cityY + "%",
            left: this.state.cityX + "%"
          }}>
        </div>
        <ResultTab kilometers={this.calculateKm()} score={this.calculateScore()}/>
      </div>
    } else {
      return <div className="main_map">
        <img src={map_Url} onClick={(e) => this.onClickMap(e)}></img>
        <div className="point" style={{
            position: "absolute",
            display: this.state.display,
            top: this.state.coordY + "%",
            left: this.state.coordX + "%"
          }}></div>
        </div>
      }
    }
  }

  class MainView extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        logged: false
      }
    }

    onLogin(){
      this.setState({
        logged: true
      })
    }

    render() {
      if(this.state.logged) {
        return <MapContainer />
      } else {
        return <div className="login_container">
          <Login onLogin={()=>this.onLogin()} />
        </div>
      }
    }
  }

  class App extends React.Component {
    render(){
      return <MainView />
    }
  }

  document.addEventListener('DOMContentLoaded', function () {

    ReactDOM.render(
      <App className="app"/>,
      document.getElementById('app')
    );
  });
