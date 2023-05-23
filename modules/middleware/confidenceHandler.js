const confidenceLevel = 0.95; //confidence level of 95%

const tTable = {
    1: 6.314,
    2: 2.920,
    3: 2.353,
    4: 2.123,
    5: 2.015,
    6: 1.943,
    7: 1.895,
    8: 1.860,
    9: 1.833,
    10: 1.812
    /* 
    * the sample reviews do not surpass count of 
    * 10 so using t-table values of confidence level 95% 
    * till 10 degrees of freedom of one tailed test
    * https://www.sjsu.edu/faculty/gerstman/StatPrimer/t-table.pdf
    */
}

function populationMean(population) {
    return population.reduce((sum, item) => sum + item, 0)/ population.length;
}

function standardDeviation(population, mean) { 
    const deviationSquared = population.map(item => Math.pow(item - mean, 2));
    const sum = deviationSquared.reduce((sum, item) => sum + item, 0);
    return Math.sqrt((sum/(20 - 1)));
}

function confidenceError(sd, count) {
    const standardError = (sd / Math.sqrt(count));
    const degreeOfFreedom = count - 1;
    if (degreeOfFreedom > 11) {
        return standardError * 2.042 // value of t in 30 degree of freedom with confidence level of 95%
    } else if (!tTable[degreeOfFreedom]) {
        return standardError * 1.960 // value of z
    }
    return standardError * tTable[degreeOfFreedom];
}

function confidenceInterval(cError, mean) {
    return {lower: Math.round((mean - cError) * 1000)/ 1000, upper: Math.round((mean + cError) * 1000) / 1000};
}

function calcRating(ratings) {
    const mean = populationMean(ratings);
    const sd = standardDeviation(ratings, mean);
    const cError  = confidenceError(sd, ratings.length);
    const cInterval = confidenceInterval(cError, mean);

    console.log(`mean: ${mean}, SD: ${sd}, cError: ${cError}, CI: ${cInterval}`)
    return {mean: (Math.round(mean * 1000) / 1000), ...cInterval}
}

console.log(calcRating([1]));