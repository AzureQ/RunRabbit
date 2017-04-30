/**
 * Created by Qi on 4/30/17.
 */
import React from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import MySelectFieldList from "./MySelectFieldList.js";

const MyCard = props => {
    const getParamList = (params, keyList) => {
        return Object.keys(params).filter(function (param) {
            return keyList.includes(param)
        }).reduce(function (result, currentKey) {
            result[currentKey] = params[currentKey]
            return result
        }, {})
    };

    return (<Card key={props['category']}>
        <CardHeader
            title={props['category']}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            <MySelectFieldList params={getParamList(props['params'], props['categories'][props['category']])}
                               disabled={props['disabled']}
                               handler={props['handler']}/>
        </CardText>
    </Card>)
};

export default MyCard;