import React, {Component} from 'react';
import logo from '../img/rabbit.png';
import './App.css';
import axios from 'axios';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const stompClient = require('./websocket-listener');
import RefreshIndicator from 'material-ui/RefreshIndicator';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {MyParamList} from './MyParamList.js';
import {SimpleTable, SimpleCharts, SimpleSummaryCards} from './SimpleScenarioResult.js';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        injectTapEventPlugin();

        this.state = {
            running: false,
            indicator: "hide",
            result: {},
            params: this.props.params
        }
        ;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        stompClient.register([
            {route: '/topic/taskstatus', callback: this.handleResult},
        ]);
    }

    handleOnChange = (key) => (event, index, value) => {
        var oldParams = this.state.params;
        oldParams[key]['default'] = value;
        this.setState({'params': oldParams});
    }

    handleResult(message) {
        this.setState({running: false});
        this.setState({indicator: "hide"})
        this.setState({result: JSON.parse(message.body)});
        console.log(this.state.result);
    }

    scenarioBuilder() {
        let component = this;
        var scenario_config = {};
        scenario_config['name'] = 'test';
        scenario_config['type'] = 'simple';
        scenario_config['params'] = [Object.keys(component.state['params']).filter(function (key) {
            return key !== 'type';
        }).reduce(function (result, currentKey) {
            result[currentKey] = component.state['params'][currentKey]['default'];
            return result;
        }, {})];
        return scenario_config;
    }

    handleSubmit(e) {
        let component = this;
        axios.post('/submit', component.scenarioBuilder())
            .then(function (response) {
                component.setState({running: true});
                component.setState({indicator: "loading"})
            })
            .catch(function (error) {
                console.log(error);
            });
        e.preventDefault();
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div id="homepage" className="Scenario">
                    <div className="App-header">
                        <h2>Run! Rabbit!</h2>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <div className="App-horizontal-bar">Scenario Config</div>
                    <MyParamList params={this.state.params} disabled={this.state.running}
                                 handler={this.handleOnChange}/>
                    <div className="Button-container">
                        <RaisedButton label="Submit" onClick={this.handleSubmit}
                                      disabled={this.state.running} fullWidth={true} className="Button"/>
                        <RefreshIndicator loadingColor="#FF9800" status={this.state.indicator} className="Indicator"/>
                    </div>
                    <Tabs>
                        <Tab label="Summary">
                            <SimpleSummaryCards data={this.state.result} scenario={this.scenarioBuilder()}/>
                        </Tab>
                        <Tab label="Chart">
                            <SimpleCharts data={this.state.result}/>
                        </Tab>
                        <Tab label="Data">
                            <SimpleTable data={this.state.result}/>
                        </Tab>
                    </Tabs>

                    <div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
