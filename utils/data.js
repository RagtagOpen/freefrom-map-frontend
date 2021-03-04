export async function getStatesData() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/states');
    const states = await res.json();

    return states;
}

export async function getStateData(code) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/states/${code}`);
    const states = await res.json();

    return states;
}

export async function getCategoriesData() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/categories?withCriteria=true`);
    const states = await res.json();

    return states;
}
