/**
 * Created by Qi on 4/18/17.
 */
import React from 'react';
import {MySelectField} from './MySelectField.js'

export const MyParam = (key, param, disabled, handler) => {
    return (<MySelectField key={param['label']} info={param['label']}
                           id={param['label']}
                           value={param['default']}
                           handler={handler(key)}
                           values={param['values']}
                           disabled={disabled}/>
    );
}

const renderParamList = (props, disabled, handler) => {
    return (Object.keys(props).map((key, index) => MyParam(key, props[key], disabled, handler)));
}

export const MyParamList = props => {
    const paramList = renderParamList(props.params, props.disabled, props.handler);
    return (
        <div>
            {paramList}
        </div>
    );
}