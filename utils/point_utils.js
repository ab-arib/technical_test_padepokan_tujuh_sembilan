module.exports = {
    pulsaPoint: (amount) => {
        let point = 0;
        if (amount >= 0 && amount < 50000) {
            return point;
        }
        if (amount > 50000 && amount <= 100000) {
            let totalAmount = amount;
            const firstPoint = (50000/1000)*0;
            point = point + firstPoint;
            totalAmount = totalAmount - 50000;
            const secondPoint = (totalAmount/1000)*1;
            point = point + secondPoint;
            return point;
        }
        if (amount > 100000) {
            let totalAmount = amount;
            const firstPoint = (50000/1000)*0;
            point = point + firstPoint;
            totalAmount = totalAmount - 50000;
            const secondPoint = (50000/1000)*1;
            point = point + secondPoint;
            totalAmount = totalAmount - 50000;
            const thirdPoint = (totalAmount/1000)*2;
            point = point + thirdPoint
            return point;
        }
    },
    listrikPoint: (amount) => {
        let point = 0;
        if (amount >= 0 && amount < 50000) {
            return point;
        }
        if (amount > 50000 && amount <= 100000) {
            let totalAmount = amount;
            const firstPoint = (50000/2000)*0;
            point = point + firstPoint;
            totalAmount = totalAmount - 50000;
            const secondPoint = (totalAmount/2000)*1;
            point = point + secondPoint;
            return point;
        }
        if (amount > 100000) {
            let totalAmount = amount;
            const firstPoint = (50000/2000)*0;
            point = point + firstPoint;
            totalAmount = totalAmount - 50000;
            const secondPoint = (50000/2000)*1;
            point = point + secondPoint;
            totalAmount = totalAmount - 50000;
            const thirdPoint = (totalAmount/2000)*2;
            point = point + thirdPoint
            return point;
        }
    }
}