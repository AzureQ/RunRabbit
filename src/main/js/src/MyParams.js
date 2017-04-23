/**
 * Created by Qi on 4/18/17.
 */
import React from 'react';
import {MySelectField} from './MySelectField.js'

const renderParam = (param, disabled, handler) => {
    return (<MySelectField key={param['text']} info={param['text']}
                           id={param['name']}
                           value={param['default']}
                           handler={handler(param['name'])}
                           values={param['values']}
                           disabled={disabled}/>
    );
}

const renderParams = (props, disabled, handler) => {
    return (props.map(v => renderParam(v, disabled,handler)));
}

export const MyParams = props => {
    const paramList = renderParams(props.params, props.disabled, props.handler);
    return (
        <div>
            {paramList}
        </div>
    );
}