const challenge = (query) => {
    const array = [];
    if (query === undefined) {
        for(let i = 0; i < 100000000; i++) {
            let randomNum = 1 + Math.floor(Math.random() * 1000);
            array.push(randomNum);
        }
        return array;
    } else {
        for(let i = 0; i < query; i++) {
            let randomNum = 1 + Math.floor(Math.random() * 1000);
            array.push(randomNum);
        }
        return array;
    }
}

process.on("randomizer", (msg) => {
    console.log(msg)
    if (msg == "start") {
        const random = challenge();
        process.send(random);
    }
});