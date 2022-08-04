const socket = io.connect();


function renderProducts(data) {
    const html = data.map((elem, index) => {   
        return (
            `<tr>
                <td>${elem.title}</td>
                <td>${elem.price}</td>
                <td><img src="${elem.thumbnail}" alt="${elem.title}" ></td>
            </tr>`
        );
    }).join(" ");
    document.getElementById("productsList").innerHTML = html;
};

function renderComment(data) {
    const html = data.map((elem, index) => {   
        return (
            `<div>
                <strong>${elem.username}</strong>:
                <em>${elem.text}</em>
            </div>`
        );
    }).join(" ");
    document.getElementById("commentsList").innerHTML = html;
};

function newProduct(e) {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbnail = document.getElementById('thumbnail').value;

    if (title == "" || price == "" || thumbnail == "") {
        alert("Por favor, rellene el formulario correctamente");
        return false;
    } else {
        const data = {
            title: title,
            price: price,
            thumbnail: thumbnail,
        };
    
        socket.emit('new-product', data);
        return false;
    }
}

function newComment(e) {
    let username = document.getElementById('username').value;
    let text = document.getElementById('text').value;

    if(username == "" || text == "") {
        alert("Por favor, rellene el formulario correctamente");
        return false;
    } else {
        const data = {
            username: username,
            text: text,
        };
    
        socket.emit('new-comment', data);
        return false;
    }
};

socket.on("products", (data) => {
    renderProducts(data);
});

socket.on("comments", (data) => {
    renderComment(data);
});