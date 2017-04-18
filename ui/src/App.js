import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const stompClient = require('./websocket-listener');
import RefreshIndicator from 'material-ui/RefreshIndicator';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {CardHeader} from 'material-ui/Card';
import img_send from '../public/send.svg';
import img_recv from '../public/receive.svg';
import img_heartbeat from '../public/heartbeat.svg';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import {MySelectField} from './MySelectField'

function timeFormatter(cell, row) {
    return cell / 1000.0 + ' ms';
}

function byteFormatter(cell, row) {
    return cell + ' bytes';
}

function msgFormatter(cell, row) {
    return cell + ' messages';
}

class App extends Component {
    constructor(props, context) {
        super(props, context);

        injectTapEventPlugin();

        this.state = {
            'type': 'simple',
            'time-limit': 10,
            'producer-count': 1,
            'consumer-count': 1,
            'min-msg-size': 100,
            running: false,
            indicator: "hide",
            result: [],
            send_bytes_rate: 0,
            recv_bytes_rate: 0,
            send_msg_rate: 0,
            recv_msg_rate: 0,
            avg_latency: 0
        };

        this.scenario_types = ["simple"];
        this.time_limits = [10, 30, 60, 120, 180, 240, 300];
        this.worker_counts = [1, 2, 3, 4, 5, 6, 7, 8];
        this.message_sizes = [100, 200, 500, 1000, 2000, 5000];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.visualization = this.visualization.bind(this);
    }

    componentDidMount() {
        stompClient.register([
            {route: '/topic/taskstatus', callback: this.visualization},
        ]);
    }

    handleOnChange = (id, event, index, value) => this.setState({[id]: value});

    visualization(message) {
        let component = this
        var body = JSON.parse(message.body);
        component.setState({running: false});
        component.setState({indicator: "hide"})
        component.setState({result: body.samples});
        component.setState({send_bytes_rate: body["send-bytes-rate"]});
        component.setState({recv_bytes_rate: body["recv-bytes-rate"]});
        component.setState({send_msg_rate: body["send-msg-rate"]});
        component.setState({recv_msg_rate: body["recv-msg-rate"]});
        component.setState({avg_latency: body["avg-latency"]});
        console.log(this.state.result);
    }

    handleSubmit(e) {
        let component = this;
        axios.post('http://localhost:8080/submit', {
            'name': 'test', 'type': this.state['type'],
            'params': [{
                'time-limit': this.state['time-limit'],
                'producer-count': this.state['producer-count'],
                'consumer-count': this.state['consumer-count'],
                'min-msg-size': this.state['min-msg-size']
            }]
        })
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
                <div id="hehe">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <MySelectField info='Scenario Type' id='type' value={this.state['type']}
                                   handler={this.handleOnChange.bind(this, 'type')}
                                   values={this.scenario_types}/>
                    <MySelectField info='Time Limit (second)' id='time-limit' value={this.state['time-limit']}
                                   handler={this.handleOnChange.bind(this, 'time-limit')}
                                   values={this.time_limits}/>
                    <MySelectField info='Number of Producer' id='producer-count' value={this.state['producer-count']}
                                   handler={this.handleOnChange.bind(this, 'producer-count')}
                                   values={this.worker_counts}/>
                    <MySelectField info='Number of Consumer' id='consumer-count' value={this.state['consumer-count']}
                                   handler={this.handleOnChange.bind(this, 'consumer-count')}
                                   values={this.worker_counts}/>
                    <MySelectField info='Message Size (byte)' id='min-msg-size' value={this.state['min-msg-size']}
                                   handler={this.handleOnChange.bind(this, 'min-msg-size')}
                                   values={this.message_sizes}/>
                    <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit}
                                  disabled={this.state.running}/>
                    <div>
                        <RefreshIndicator
                            size={25}
                            left={350}
                            top={180}
                            loadingColor="#FF9800"
                            status={this.state.indicator}
                        />
                    </div>
                    <Tabs>
                        <Tab label="Summary">
                            <div>
                                <h2>Tab One</h2>
                                <CardHeader
                                    title="Send Rate"
                                    subtitle={this.state.send_bytes_rate + " bytes/sec"}
                                    avatar={img_send}
                                />
                                <CardHeader
                                    title="Send Rate"
                                    subtitle={this.state.send_msg_rate + " message/sec"}
                                    avatar={img_send}
                                />
                                <CardHeader
                                    title="Receive Rate"
                                    subtitle={this.state.recv_bytes_rate + " bytes/sec"}
                                    avatar={img_recv}
                                />
                                <CardHeader
                                    title="Receive Rate"
                                    subtitle={this.state.recv_msg_rate + " messages/sec"}
                                    avatar={img_recv}
                                />
                                <CardHeader
                                    title="Average Latency"
                                    subtitle={this.state.avg_latency + " microseconds"}
                                    avatar={img_heartbeat}
                                />
                            </div>
                        </Tab>
                        <Tab label="Chart">
                            <div>
                                <h2>Tab Two</h2>
                                <LineChart width={1200} height={300} data={this.state.result}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="elapsed"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <Line type="monotone" dataKey="send-msg-rate" stroke="#8884d8" activeDot={{r: 8}}/>
                                    <Line type="monotone" dataKey="recv-msg-rate" stroke="#82ca9d"/>
                                </LineChart>
                            </div>
                        </Tab>
                        <Tab label="Data">
                            <div>
                                <BootstrapTable data={this.state.result} hover>
                                    <TableHeaderColumn dataAlign="center" isKey
                                                       dataField='elapsed'>Elapsed</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={byteFormatter}
                                                       dataField='send-bytes-rate'>Send Rate</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={byteFormatter}
                                                       dataField='recv-bytes-rate'>Receive Rate</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={msgFormatter}
                                                       dataField='send-msg-rate'>Send Rate</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={msgFormatter}
                                                       dataField='recv-msg-rate'>Receive Rate</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={timeFormatter}
                                                       dataField='avg-latency'>Average Latency</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={timeFormatter}
                                                       dataField='min-latency'>Min Latency</TableHeaderColumn>
                                    <TableHeaderColumn dataAlign="center" dataFormat={timeFormatter}
                                                       dataField='max-latency'>Max Latency</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
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
