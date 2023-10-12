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
    }
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetUserInfo() {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: "get",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}