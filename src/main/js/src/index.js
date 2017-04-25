import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const pairMaker = args => {
    return {"value": args.value, "text": (args.value * (args.scale || 1)).toString()}
}

const parameters = {
    // "type": {
    //     "label": "Scenario Type",
    //     "default": "simple",
    //     "values": [
    //         {
    //             "value": "simple",
    //             "text": "Simple"
    //         },
    //         {
    //             "value": "rate-vs-latency",
    //             "text": "Rate VS Latency"
    //         },
    //         {
    //             "value": "varying",
    //             "text": "Varying"
    //         }
    //     ]
    // },
    // "interval": {
    //     "label": "Interval (second)",
    //     "default": 1000,
    //     "values": [1000,2000,3000].map(v => pairMaker({value:v,scale:0.001}))
    // },
    "time-limit": {
        "label": "Time Limit (second)",
        "default": 10,
        "values": [10, 30, 60, 120, 150].map(v => pairMaker({value: v}))
    },
    "producer-count": {
        "label": "Number of Producer",
        "default": 1,
        "values": [1, 2, 3, 4, 5].map(v => pairMaker({value: v}))
    },
    "consumer-count": {
        "label": "Number of Consumer",
        "default": 1,
        "values": [1, 2, 3, 4, 5].map(v => pairMaker({value: v}))
    },
    "min-msg-size": {
        "label": "Message Size (KB)",
        "default": 1000,
        "values": [1000, 2000, 3000, 4000, 5000].map(v => pairMaker({value: v, scale: 0.001}))
    },
    "consumer-rate-limit": {
        "label": "Consumer Rate (msg/sec)",
        "default": 0,
        "values": [0, 1000, 2000, 3000, 4000, 5000].map(v => pairMaker({value: v}))
    },
    "producer-rate-limit": {
        "label": "Producer Rate (msg/sec)",
        "default": 0,
        "values": [0, 1000, 2000, 3000, 4000, 5000].map(v => pairMaker({value: v}))
    }
}

ReactDOM.render(
    <App params={parameters}/>,
    document.getElementById('root')
);
