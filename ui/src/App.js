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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
            scenario_type: 'simple',
            time_limit: 10,
            producer_count: 1,
            consumer_count: 1,
            message_size: 100,
            running: false,
            errorText: "",
            indicator: "hide",
            result: [],
            send_bytes_rate: 0,
            recv_bytes_rate: 0,
            send_msg_rate: 0,
            recv_msg_rate: 0,
            avg_latency: 0
        };
        this.samples = [{
            "elapsed": 1000,
            "send-bytes-rate": 0.0,
            "recv-msg-rate": 53861.0,
            "max-latency": 810633,
            "min-latency": 1470,
            "avg-latency": 511647,
            "send-msg-rate": 102976.0,
            "recv-bytes-rate": 0.0
        }, {
            "elapsed": 2000,
            "send-bytes-rate": 0.0,
            "recv-msg-rate": 98795.0,
            "max-latency": 1442540,
            "min-latency": 738848,
            "avg-latency": 1098951,
            "send-msg-rate": 57454.0,
            "recv-bytes-rate": 0.0
        }, {
            "elapsed": 3000,
            "send-bytes-rate": 0.0,
            "recv-msg-rate": 101022.0,
            "max-latency": 2104441,
            "min-latency": 445579,
            "avg-latency": 1449189,
            "send-msg-rate": 32084.0,
            "recv-bytes-rate": 0.0
        }, {
            "elapsed": 4000,
            "send-bytes-rate": 0.0,
            "recv-msg-rate": 92233.0,
            "max-latency": 2581828,
            "min-latency": 611305,
            "avg-latency": 1614334,
            "send-msg-rate": 59205.0,
            "recv-bytes-rate": 0.0
        }, {
            "elapsed": 5000,
            "send-bytes-rate": 0.0,
            "recv-msg-rate": 109659.0,
            "max-latency": 2538161,
            "min-latency": 625559,
            "avg-latency": 1432968,
            "send-msg-rate": 45582.0,
            "recv-bytes-rate": 0.0
        }, {
            "elapsed": 6000,
            "send-bytes-rate": 0.0,
            "recv-msg-rate": 114755.0,
            "max-latency": 2164841,
            "min-latency": 516923,
            "avg-latency": 1335304,
            "send-msg-rate": 5885.0,
            "recv-bytes-rate": 0.0
        }];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.visualization = this.visualization.bind(this);
        this.validate = this.validate.bind(this);

        this.scenario_types = ["simple", "rate-vs-latency", "varying"];
        this.time_limits = [10, 30, 60, 120, 180, 240, 300];
        this.worker_counts = [1, 2, 3, 4, 5, 6, 7, 8];
        this.message_sizes = [100, 200, 500, 1000, 2000, 5000];

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleProducerCountChange = this.handleProducerCountChange.bind(this);
        this.handleConsumerCountChange = this.handleConsumerCountChange.bind(this);
        this.handleMessageSizeChange = this.handleMessageSizeChange.bind(this);
        this.handletest = this.handletest.bind(this);
    }

    componentDidMount() {
        stompClient.register([
            {route: '/topic/taskstatus', callback: this.visualization},
        ]);
    }

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

    handletest(event, index, value){
        console.log(value);
    }

    handleSubmit(e) {
        let component = this;
        axios.post('http://localhost:8080/submit', {
            'name': 'test', 'type': this.state.scenario_type,
            'params': [{
                'time-limit': this.state.time_limit,
                'producer-count': this.state.producer_count,
                'consumer-count': this.state.consumer_count,
                'min-msg-size': this.state.message_size
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

    validate(event) {
        let component = this;
        if (event.target.value) {
            try {
                JSON.parse(event.target.value.trim());
                this.setState({value: event.target.value});
            } catch (e) {
                component.setState({errorText: "Please fill in a valid JSON"});
                return
            }
        }
        component.setState({errorText: ""});
    }

    menuItemGenerator(value) {
        return <MenuItem value={value} primaryText={value}/>
    };

    handleTypeChange = (event, index, scenario_type) => this.setState({scenario_type});
    handleTimeChange = (event, index, time_limit) => this.setState({time_limit});
    handleProducerCountChange = (event, index, producer_count) => this.setState({producer_count});
    handleConsumerCountChange = (event, index, consumer_count) => this.setState({consumer_count});
    handleMessageSizeChange = (event, index, message_size) => this.setState({message_size});

    render() {
        let component = this;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div id="hehe">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <SelectField
                        floatingLabelText="Scenario Type"
                        value={this.state.scenario_type}
                        onChange={this.handleTypeChange}
                    >
                        {component.scenario_types.map(this.menuItemGenerator)}
                    </SelectField>
                    <SelectField
                        floatingLabelText="Time Limit (second)"
                        value={this.state.time_limit}
                        onChange={this.handleTimeChange}
                    >
                        {component.time_limits.map(this.menuItemGenerator)}
                    </SelectField>
                    <SelectField
                        floatingLabelText="Number of Producer"
                        value={this.state.producer_count}
                        onChange={this.handleProducerCountChange}
                    >
                        {component.worker_counts.map(this.menuItemGenerator)}
                    </SelectField>
                    <SelectField
                        floatingLabelText="Number of Consumer"
                        value={this.state.consumer_count}
                        onChange={this.handleConsumerCountChange}
                    >
                        {component.worker_counts.map(this.menuItemGenerator)}
                    </SelectField>
                    <SelectField
                        floatingLabelText="Message Size (byte)"
                        value={this.state.message_size}
                        onChange={this.handleMessageSizeChange}
                    >
                        {component.message_sizes.map(this.menuItemGenerator)}
                    </SelectField>
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
                        <MySelectField info="hello" value="hellovalue" handler={this.handletest}
                                       values={["HelloVAL1", "hELLOVaL2", "HelloVAL4", "HelloVAL3"]} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
