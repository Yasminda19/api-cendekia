function deleteBroker(id) {
    fetch('/api/broker/' + id, { method: "DELETE" })
        .then((response) => {
            const data = response.json();
            console.log(data);
        });
    window.location.reload(true);
}

function addBroker() {
    let data = new URLSearchParams({
        "url": document.querySelector('input#InputURL').value,
        "name": document.querySelector('input#InputName').value
    });
    fetch('/api/broker', {
        method: "POST",
        body: data
    })
        .then((response) => {
            const data = response.json();
            window.location = '/broker';
        })
        .catch((err) => {
            console.log(err);
        });
}