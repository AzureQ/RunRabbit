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
import {MyParams} from './MyParams.js';
import {SimpleTable, SimpleCharts, SimpleSummaryCards} from './SimpleScenarioResult.js';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

class App extends Component {
    constructor(props, context) {
        super(props, context);

        injectTapEventPlugin();

        this.state = {
            running: false,
            indicator: "hide",
            result: {},
            params: [
                {
                    'name': 'time-limit',
                    'text': 'Time Limit (second)',
                    'default': 10,
                    'values': [10, 30, 60, 120, 180, 240, 300]
                },
                {
                    'name': 'producer-count',
                    'text': 'Number of Producer',
                    'default': 1,
                    'values': [1, 2, 3, 4, 5, 6, 7, 8]
                },
                {
                    'name': 'producer-rate-limit',
                    'text': 'Producer Rate Limit',
                    'default': 0,
                    'values': [0, 5000, 10000, 20000, 30000, 40000, 50000, 100000]
                },
                {
                    'name': 'consumer-count',
                    'text': 'Number of Consumer',
                    'default': 1,
                    'values': [1, 2, 3, 4, 5, 6, 7, 8]
                },
                {
                    'name': 'consumer-rate-limit',
                    'text': 'Consumer Rate Limit',
                    'default': 0,
                    'values': [0, 5000, 10000, 20000, 30000, 40000, 50000, 100000]
                },
                {
                    'name': 'min-msg-size',
                    'text': 'Message Size (byte)',
                    'default': 1000,
                    'values': [1000, 2000, 5000, 10000, 20000, 50000, 100000]
                }
            ]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        stompClient.register([
            {route: '/topic/taskstatus', callback: this.handleResult},
        ]);
    }

    handleOnChange = (id) => (event, index, value) => {
        var oldParams = this.state.params;
        for (var i = 0; i < oldParams.length; i++) {
            if (oldParams[i]['name'] === id) {
                oldParams[i]['default'] = value;
            }
        }
        this.setState({'params': oldParams});
    }

    handleResult(message) {
        this.setState({running: false});
        this.setState({indicator: "hide"})
        this.setState({result: JSON.parse(message.body)});
        console.log(this.state.result);
    }

    handleSubmit(e) {
        let component = this;
        var scenario_config = {}
        scenario_config['name'] = 'test'
        scenario_config['type'] = 'simple'
        scenario_config['params'] = [component.state['params'].filter(function (obj) {
            return obj['name'] !== 'type';
        }).map(function (obj) {
            var newObj = {}
            newObj[obj['name']] = obj['default']
            return newObj
        }).reduce(function (result, currentObject) {
            for (var key in currentObject) {
                if (currentObject.hasOwnProperty(key)) {
                    result[key] = currentObject[key];
                }
            }
            return result;
        }, {})]

        axios.post('/submit', scenario_config)
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
                    <MyParams params={this.state.params} disabled={this.state.running} handler={this.handleOnChange}/>
                    <div className="Button-container">
                        <RaisedButton label="Submit" onClick={this.handleSubmit}
                                      disabled={this.state.running} fullWidth={true} className="Button"/>
                        <RefreshIndicator loadingColor="#FF9800" status={this.state.indicator} className="Indicator"/>
                    </div>
                    <Tabs>
                        <Tab label="Summary">
                            <SimpleSummaryCards data={this.state.result}/>
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
