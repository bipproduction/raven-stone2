const _ = require('lodash')
module.exports = function perhitungan(param, data, total) {
    if (_.sum(_.values(param)) !== 100) {
        console.log("parameter harus bertotal 100")
        return null
    }
    const result = {}
    result.positive = (param.positive / 100) * total;
    result.negative = (param.negative / 100) * total;
    result.neutral = (param.neutral / 100) * total;

    function acak3() {
        var ttl = 100;
        const nil1 = _.random(1, ttl);
        ttl -= nil1;
        const nil2 = _.random(1, ttl);
        const nil3 = ttl - nil2;
        const hasil = [nil1, nil2, nil3];
        const isNegativeOrZero = _.some(hasil, value => value <= 5);
        if (isNegativeOrZero) return acak3()
        return hasil
    }

    function acak4() {
        var ttl = 100;
        const nil1 = _.random(1, ttl);
        ttl -= nil1;
        const nil2 = _.random(1, ttl);
        ttl -= nil2;
        const nil3 = _.random(1, ttl);
        const nil4 = ttl - nil3
        const hasil = [nil1, nil2, nil3, nil4];
        const isNegativeOrZero = _.some(hasil, value => value <= 5);
        if (isNegativeOrZero) return acak4()
        return hasil
    }

    const acak_positive = acak3()
    const acak_negative = acak4()

    const nil_positive = {
        "CONFIDENCE": (acak_positive[0] / 100) * result.positive,
        "SUPPORTIVE": (acak_positive[1] / 100) * result.positive,
        "POSITIVE": (acak_positive[2] / 100) * result.positive,
    }

    const nil_negative = {
        "UNSUPPORTIVE": (acak_negative[0] / 100) * result.negative,
        "UNCOMFORTABLE": (acak_negative[1] / 100) * result.negative,
        "NEGATIVE": (acak_negative[2] / 100) * result.negative,
        "DISAPPROVAL": (acak_negative[3] / 100) * result.negative,
    }

    const nil_neutral = {
        "UNDECIDED": result.neutral
    }

    var hasil_nil = { ...nil_positive, ...nil_neutral, ...nil_negative }

    const hasil_data = {
        prov: data.prov,
        kab: data.kab,
        ...hasil_nil
    }

    return {
        hasil_nil,
        hasil_data,
        sum: _.sum(_.values(hasil_nil))
    }
}