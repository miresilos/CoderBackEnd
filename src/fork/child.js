const challenge = (query) => {
    const array = [];
    if (query === undefined) {
        for(let i = 0; i < 10000000; i++) {
            let randomNum = 1 + Math.floor(Math.random() * 1000);
            array.push(randomNum);
        }
        const quantityOfReps = array.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
        array.unshift(quantityOfReps);

        return array;
    } else {
        for(let i = 0; i < query; i++) {
            let randomNum = 1 + Math.floor(Math.random() * 1000);
            array.push(randomNum);
        };
        const quantityOfReps = array.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
        array.unshift(quantityOfReps);

        return array;
    };
};

process.on("message", (msg, quant) => {
    if (msg === "start") {
        const random = challenge(quant);
        process.send(random);
    }
});