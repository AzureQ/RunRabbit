import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const stompClient = require('./websocket-listener');
import RefreshIndicator from 'material-ui/RefreshIndicator';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Table, Column, Cell, TextCell} from 'fixed-data-table';

class App extends Component {

    constructor(props, context) {
        super(props, context);

        injectTapEventPlugin();

        this.state = {
            value: "",
            running: false,
            errorText: "",
            indicator: "hide",
            result:[]
        };
        this.samples=[{"elapsed":1000,"send-bytes-rate":0.0,"recv-msg-rate":53861.0,"max-latency":810633,"min-latency":1470,"avg-latency":511647,"send-msg-rate":102976.0,"recv-bytes-rate":0.0},{"elapsed":2000,"send-bytes-rate":0.0,"recv-msg-rate":98795.0,"max-latency":1442540,"min-latency":738848,"avg-latency":1098951,"send-msg-rate":57454.0,"recv-bytes-rate":0.0},{"elapsed":3000,"send-bytes-rate":0.0,"recv-msg-rate":101022.0,"max-latency":2104441,"min-latency":445579,"avg-latency":1449189,"send-msg-rate":32084.0,"recv-bytes-rate":0.0},{"elapsed":4000,"send-bytes-rate":0.0,"recv-msg-rate":92233.0,"max-latency":2581828,"min-latency":611305,"avg-latency":1614334,"send-msg-rate":59205.0,"recv-bytes-rate":0.0},{"elapsed":5000,"send-bytes-rate":0.0,"recv-msg-rate":109659.0,"max-latency":2538161,"min-latency":625559,"avg-latency":1432968,"send-msg-rate":45582.0,"recv-bytes-rate":0.0},{"elapsed":6000,"send-bytes-rate":0.0,"recv-msg-rate":114755.0,"max-latency":2164841,"min-latency":516923,"avg-latency":1335304,"send-msg-rate":5885.0,"recv-bytes-rate":0.0}];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.visualization = this.visualization.bind(this);
        this.validate = this.validate.bind(this);

    }

    componentDidMount() {
        stompClient.register([
            {route: '/topic/taskstatus', callback: this.visualization},
        ]);
    }

    visualization(message){
        let component = this
        var body = JSON.parse(message.body);
        component.setState({running:false});
        component.setState({indicator:"hide"})
        component.setState({result:body.samples});
        // console.log(this.state.result)
        console.log("hello");
        console.log(this.state.result);
        console.log(this.state.result.length)
    }

    // summerize(message){
    //     let component = this
    //     var result = JSON.parse(message.body);
    // }

    handleSubmit(e){
        let component=this;
        axios.post('http://localhost:8080/submit', JSON.parse(this.state.value))
            .then(function (response) {
                component.setState({running:true});
                component.setState({indicator:"loading"})
            })
            .catch(function (error) {
                console.log(error);
            });
        e.preventDefault();
    }

    validate(event){
        let component =  this;
        if(event.target.value) {
            try {
                JSON.parse(event.target.value.trim());
                this.setState({value: event.target.value});
            } catch (e) {
                component.setState({errorText: "Please fill in a valid JSON"});
                return
            }
        }
        component.setState({errorText:""});
    }


    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div id="hehe">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <TextField
                    hintText="Scenario Config"
                    floatingLabelText="Scenario Config JSON"
                    multiLine={true}
                    rows={2}
                    onChange={this.validate}
                    errorText={this.state.errorText}
                    disabled={this.state.running}
                />
                <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} disabled={this.state.running}/>
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
                    <Tab label="Summary" >
                        <div>
                            <h2>Tab One</h2>
                            <p>
                                This is an example tab.
                            </p>
                            <p>
                                You can put any sort of HTML or react component in here. It even keeps the component state!
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Chart" >
                        <div>
                            <h2>Tab Two</h2>
                            <p>
                                This is another example tab.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Data" >
                        <div>
                            <Table
                            rowHeight={50}
                            headerHeight={50}
                            rowsCount={this.state.result.length}
                            width={1000}
                            height={500}>
                            <Column>
                                <Cell data={this.state.result} col="elapsed" />}
                            </Column>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
