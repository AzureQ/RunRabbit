/**
 * Created by Qi on 4/30/17.
 */
import React from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {MyParamList} from "./MyParamList.js";

const getParamList = (params, keyList) => {
    return Object.keys(params).filter(function (key) {
        return keyList.includes(key)
    }).reduce(function (result, currentKey) {
        result[currentKey] = params[currentKey]
        return result
    }, {})
}

const MyCard = (params, categories, key, disabled, handler) => {
    return (<Card key={key}>
        <CardHeader
            title={key}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            <MyParamList params={getParamList(params, categories[key])} disabled={disabled}
                         handler={handler}/>
        </CardText>
    </Card>)
}

const renderCardList = (params, categories, disabled, handler) => {
    return (Object.keys(categories).map((key) => MyCard(params, categories, key, disabled, handler)));
}

export const MyCardList = props => {
    const cardList = renderCardList(props.params, props.categories, props.disabled, props.handler);
    return (
        <div>
            {cardList}
        </div>
    );
}

