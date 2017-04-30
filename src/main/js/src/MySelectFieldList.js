/**
 * Created by Qi on 4/18/17.
 */
import React from "react";
import MySelectField from "./MySelectField.js";


const MySelectFieldList = props => {

    const renderSelectFieldList = (params,disabled,handler) => {
        return (Object.keys(params).map((p) => {
            return (<MySelectField key={params[p]['label']} label={params[p]['label']}
                                   id={params[p]['label']}
                                   value={params[p]['default']}
                                   values={params[p]['values']}
                                   handler={handler(p)}
                                   disabled={disabled}/>
            )
        }));
    };

    return (
        <div>
            {renderSelectFieldList(props['params'], props['disabled'], props['handler'])}
        </div>
    );
};

export default MySelectFieldList;