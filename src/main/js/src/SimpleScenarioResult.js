/**
 * Created by Qi on 4/19/17.
 */
import React from 'react';
import img_send from '../img/send.svg';
import img_recv from '../img/receive.svg';
import img_heartbeat from '../img/heartbeat.svg';
import {CardHeader} from 'material-ui/Card';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';


function largeNumberFormatter(value) {
    return Math.round(value || 0, 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeFormatter(cell, row) {
    return largeNumberFormatter(cell / 1000.0) + ' ms';
}

function byteFormatter(cell, row) {
    return largeNumberFormatter(cell) + ' bytes';
}

function msgFormatter(cell, row) {
    return largeNumberFormatter(cell) + ' messages';
}

export const SimpleSummaryCards = props => {
    return (<div>
            <h2>Summary</h2>

            <div className="Summary-card-container">
                <div className="Summary-card">

                    <h3>Scenario Config</h3>
                    <p>
                        {JSON.stringify(props['scenario'],null,4)}
                    </p>

                </div>
            </div>

            <div className="Summary-card-container">
                <div className="Summary-card">
                    <h3>Send Rate</h3>
                    <p>
                        {largeNumberFormatter(props['data']['send-bytes-rate']) + " bytes/sec"}
                    </p>
                    <p>
                        {largeNumberFormatter(props['data']['send-msg-rate']) + " message/sec"}
                    </p>
                </div>
            </div>

            <div className="Summary-card-container">
                <div className="Summary-card">

                    <h3>Average Latency</h3>
                    <p>
                        {largeNumberFormatter(props['data']['avg-latency']) + " microseconds"}
                    </p>

                </div>
            </div>

            <div className="Summary-card-container">
                <div className="Summary-card">

                    <h3>Receive Rate</h3>
                    <p>
                        {largeNumberFormatter(props['data']['recv-bytes-rate']) + " bytes/sec"}
                    </p>
                    <p>
                        {largeNumberFormatter(props['data']['recv-msg-rate']) + " messages/sec"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export const SimpleCharts = props => {
    return (
        <div>
            <div>
                <LineChart width={1200} height={300} data={props['data']['samples'] || []}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="elapsed"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="send-msg-rate" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="recv-msg-rate" stroke="#82ca9d"/>
                </LineChart>
            </div>
            <div>
                <LineChart width={1200} height={300} data={props['data']['samples'] || []}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="elapsed"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="send-bytes-rate" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="recv-bytes-rate" stroke="#82ca9d"/>
                </LineChart>
            </div>
            <div>
                <LineChart width={1200} height={300} data={props['data']['samples'] || []}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="elapsed"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="min-latency" stroke="#82ca9d"/>
                    <Line type="monotone" dataKey="avg-latency" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="max-latency" stroke="#82ca9d"/>
                </LineChart>
            </div>
        </div>
    );

}

export const SimpleTable = props => {
    return (
        <div>
            <BootstrapTable data={props['data']['samples'] || []} hover>
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
    );
}