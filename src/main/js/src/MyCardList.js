/**
 * Created by Qi on 4/30/17.
 */
import React from "react";
import MyCard from "./MyCard.js";

export const MyCardList = props => {
    const renderCardList = (params, categories, disabled, handler) => {
        return (Object.keys(categories).map((category) => {
            return (<MyCard key={category} params={params} categories={categories} category={category} disabled={disabled} handler={handler}/>)
        }));
    };

    return (
        <div>
            {renderCardList(props.params, props.categories, props.disabled, props.handler)}
        </div>
    );
};

export default MyCardList;

