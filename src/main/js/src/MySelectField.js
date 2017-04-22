/**
 * Created by Qi on 4/14/17.
 */
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export const renderMenuItem = value => {
    return (<MenuItem key={value} value={value} primaryText={value}/>);
}

export const renderMenuItems = values => {
    return(values.map(v => renderMenuItem(v)));
}

export const MySelectField = props => {
    const myMenuItems = renderMenuItems(props.values);
    return (
        <div>
            <SelectField
                key={props.info}
                floatingLabelText={props.info}
                value={props.value}
                onChange={props.handler}
            >
                {myMenuItems}
            </SelectField>
        </div>
    );
}
