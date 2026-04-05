function remove(value) {
    const arr = String(value).split(".")
    if (arr[1] === "00") {
        value = arr[0]
    }
    return value
}
export default remove