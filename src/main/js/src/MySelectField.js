/**
 * Created by Qi on 4/14/17.
 */
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export const renderMenuItem = props => {
    return (<MenuItem key={props['value']} value={props['value']} primaryText={props['text']}/>);
}

export const renderMenuItems = props => {
    return(props.map(v => renderMenuItem(v)));
}

export const MySelectField = props => {
    const myMenuItems = renderMenuItems(props['values']);
    return (
        <div className="SelectFieldDiv">
            <SelectField
                key={props.info}
                floatingLabelText={props.info}
                value={props.value}
                onChange={props.handler}
                className="SelectField"
                disabled={props.disabled}
            >
                {myMenuItems}
            </SelectField>
        </div>
    );
}
