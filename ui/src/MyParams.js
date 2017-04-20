/**
 * Created by Qi on 4/18/17.
 */
import React from 'react';
import { MySelectField } from './MySelectField.js'

const renderParam = (param, handler) => {
    return (<MySelectField key={param['text']} info={param['text']}
                           id={param['name']}
                           value={param['default']}
                           handler={handler(param['name'])}
                           values={param['values']}/>
    );
}

const renderParams = (props, handler) => {
    return (props.map(v => renderParam(v, handler)));
}

export const MyParams = props => {
    const paramList = renderParams(props.params, props.handler);
    return (
        <div>
            {paramList}
        </div>
    );
}