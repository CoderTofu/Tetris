function originPoint (block) {
    let conjoined = block.map(block => {
        return `${block.column}${block.row}`
    }).sort();

    // Get second to the last
    const origin = conjoined[conjoined.length - 2];

    return [conjoined, origin]
}

export async function blockRotation(block) {
    let [sorted, origin] = await originPoint(block);
    
}