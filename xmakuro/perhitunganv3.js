const _ = require('lodash')

module.exports = function perhitunganv3(param, data, total) {
    function acak(total, count) {
        const hasil = [];
        for (let i = 0; i < count; i++) {
            const nilai = _.random(1, total);
            hasil.push(nilai);
            total -= nilai;
        }
        return hasil;
    }

    function hitungNilai(label, acakResult, result) {
        const nilai = {};
        acakResult.forEach((percentage, index) => {
            nilai[label[index]] = (percentage / 100) * result;
        });
        return nilai;
    }

    const result = {};
    result.positive = param.positive / 100 * total;
    result.negative = param.negative / 100 * total;
    result.neutral = param.neutral / 100 * total;

    const acak_positive = acak(result.positive, 3);
    const acak_negative = acak(result.negative, 4);

    const nil_positive = hitungNilai(["CONFIDENCE", "SUPPORTIVE", "POSITIVE"], acak_positive, result.positive);
    const nil_negative = hitungNilai(["UNSUPPORTIVE", "UNCOMFORTABLE", "NEGATIVE", "DISAPPROVAL"], acak_negative, result.negative);
    const nil_neutral = { "UNDECIDED": result.neutral };

    const hasil_nilai = {
        ...nil_positive,
        ...nil_neutral,
        ...nil_negative
    };

    const hasil_data = {
        prov: data.prov,
        kab: data.kab,
        ...nil_positive,
        ...nil_neutral,
        ...nil_negative
    }

    const sum = _.sum(_.values(hasil_nilai))

    return {
        hasil_data,
        hasil_nilai,
        sum
    };
}
