export default function gameStop(array) {
    let conjoined = array.map(block => {
        return `${block.column}${block.row}`
    })

    if (conjoined.includes("A2", "A3", "A4", "A5")) {
        return true
    }

    return false
}