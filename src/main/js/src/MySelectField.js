/**
 * Created by Qi on 4/14/17.
 */
import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";


const MySelectField = props => {

    const renderMenuItems = items => {
        return (items.map(item => {
            return (<MenuItem key={item['value']} value={item['value']} primaryText={item['text']}/>);
        }));
    };

    return (
        <div className="SelectFieldDiv">
            <SelectField
                key={props['label']}
                floatingLabelText={props['label']}
                value={props['value']}
                onChange={props['handler']}
                className="SelectField"
                disabled={props['disabled']}
            >
                {renderMenuItems(props['values'])}
            </SelectField>
        </div>
    );
};

export default MySelectField;