import * as React from 'react';
import Cards from './Cards'


export default function CardsList(props) {
    return (
        <div>
            <Cards title="Total Population" body="test body1"></Cards>
            <Cards title="Average Age" body="test body2"></Cards>
            <Cards title="Average Income" body="test body3"></Cards>
        </div>
    );
}