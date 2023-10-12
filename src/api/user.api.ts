export async function httpLogoutUser() {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "post",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function httpRegisterUser(
  username: string,
  authorname: string,
  password: string
) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        authorname,
        password,
      }),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function httpLoginUser(username: string, password: string) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetUserInfo() {
  try {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (!tokenCookie) {
      throw new Error("Token not found in cookies");
    }
    const token = tokenCookie.split("=")[1];
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return {
      status: res.status,
      userData: await res.json(),
    };
  } catch (error) {
    console.log(error);
  }
}
