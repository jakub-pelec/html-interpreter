export default (message: string) => {
    const err = document.createElement("div");
    err.style.color = "red";
    err.style.fontWeight = '700';
    err.style.fontSize = '24px';
    err.innerText = `${message} ${new Error().stack}`;
    document.body.appendChild(err);
}