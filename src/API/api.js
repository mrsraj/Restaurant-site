

async function ApiFetching() {
    const res = await fetch('http://localhost:5000');
    if (!res.ok) {
        return "Sonthing is wrong";
    }
    const data = await res.json();
    console.log('data =', data);

    return data;

}

export default ApiFetching;