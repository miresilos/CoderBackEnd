const socket = io.connect();

socket.on("products", (data) => {
    renderProducts(data);
});



function renderProducts(data) {
    const html = data.map((elem, index) => {   
        return (
            `<tr>
                <td>${elem.title}</td>
                <td>${elem.price}</td>
                <td>${elem.thumbnail}</td>
            </tr>`
        );
    }).join(" ");
    document.getElementById("productsList").innerHTML = html;
};