const confidenceLevel = 0.95; //confidence level of 95%

const tTable = {
    1: 12.71,
    2: 4.303,
    3: 3.182,
    4: 2.776,
    5: 2.572,
    6: 2.447,
    7: 2.365,
    8: 2.306,
    9: 2.262,
    10: 2.228
    /* 
    * the sample reviews do not surpass count of 10 so using t-table
    * values of confidence level 95% till 10 degrees
    * of two tailed test of freedom
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
        return standardError * 1.960
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
    return {mean: (Math.round(mean * 1000) / 1000), ...cInterval}
}

console.log(calcRating([3,4,3,4,3,3,2]));