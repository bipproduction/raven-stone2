const _ = require('lodash');

const data = {
    "prov": "JAWA BARAT",
    "kab": "KAB. SUMEDANG",
    "CONFIDENCE": 0,
    "SUPPORTIVE": 0,
    "POSITIVE": 0,
    "UNDECIDED": 0,
    "UNSUPPORTIVE": 0,
    "UNCOMFORTABLE": 0,
    "NEGATIVE": 0,
    "DISAPPROVAL": 0
};

const total = 1000089;
const param = { positive: 60, negative: 30, neutral: 10 };

function getRandomValues(count) {
    let ttl = 100;
    const values = _.times(count - 1, () => {
        const rand = _.random(1, ttl);
        ttl -= rand;
        return rand;
    });

    values.push(ttl);
    return values;
}

function generateRandomValues(count) {
    let values = getRandomValues(count);

    while (_.some(values, value => value <= 5)) {
        values = getRandomValues(count);
    }

    return values;
}

function calculateValues(param, total) {
    const result = {};
    result.positive = _.mapValues(_.zipObject(['CONFIDENCE', 'SUPPORTIVE', 'POSITIVE'], generateRandomValues(3)), value => (value / 100) * (param.positive / 100) * total);
    result.negative = _.mapValues(_.zipObject(['UNSUPPORTIVE', 'UNCOMFORTABLE', 'NEGATIVE', 'DISAPPROVAL'], generateRandomValues(4)), value => (value / 100) * (param.negative / 100) * total);
    result.neutral = { "UNDECIDED": (param.neutral / 100) * total };

    return result;
}

const manipulatedData = calculateValues(param, total);
console.log(_.map(_.flatMapDeep(manipulatedData), values => _.mapValues(values, value => value)));