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
            <div className="Chart-container">
                <h3 className="ChartHeader">Send vs Receive (message/second)</h3>
                <LineChart width={1200} height={300} data={props['data']['samples'] || []} className="Chart">
                    <XAxis dataKey="elapsed"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="send-msg-rate" name="Send Rate" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="recv-msg-rate" name="Receive Rate" stroke="#82ca9d"/>
                </LineChart>
            </div>
            <div className="Chart-container">
                <h3 className="ChartHeader">Send vs Receive (bytes/second)</h3>
                <LineChart width={1200} height={300} data={props['data']['samples'] || []} className="Chart">
                    <XAxis dataKey="elapsed"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="send-bytes-rate" name="Send Rate" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="recv-bytes-rate" name="Receive Rate" stroke="#82ca9d"/>
                </LineChart>
            </div>
            <div className="Chart-container">
                <h3 className="ChartHeader">Latency (μs)</h3>
                <LineChart width={1200} height={300} data={props['data']['samples'] || []} className="Chart">
                    <XAxis dataKey="elapsed"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="min-latency" name="Min Latency" stroke="#82ca9d"/>
                    <Line type="monotone" dataKey="avg-latency" name="Avg Latency" stroke="#8884d8" activeDot={{r: 5}}/>
                    <Line type="monotone" dataKey="max-latency" name="Max Latency" stroke="#FF0066"/>
                </LineChart>
            </div>
        </div>
    );

}

export const SimpleTable = props => {
    return (
        <div className="Table-container">
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