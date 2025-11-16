
async function ApiFetching(credential) {
  console.log("credential =", credential);

  try {
    const res = await fetch("http://localhost:3000/auth/user/login", {
      method: "POST", // use POST for login
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential), // send credentials as JSON
    });

    if (!res.ok) {
      throw new Error(`Something went wrong: ${res.status}`);
    }

    const data = await res.json();
    localStorage.setItem("user", data.role);
    console.log("data =", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: error.message };
  }
}

export default ApiFetching;
