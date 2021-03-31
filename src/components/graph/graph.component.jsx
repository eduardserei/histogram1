import React, { useEffect } from 'react';
import { getMonthlyPostsCountArray } from "../../utils/utils";
import { myDrawChart } from "../../utils/chartBuilders";
import * as d3 from 'd3';

const Graph = ({data}) => {
    const monthlyPostsCountObj = getMonthlyPostsCountArray(data)
    
    useEffect(() => {

        myDrawChart(500, 500, monthlyPostsCountObj)

        return () => {
            d3.select('svg').remove()
        }
    }, [monthlyPostsCountObj])
    
    return <div id='chart'/>
}

export default Graph;