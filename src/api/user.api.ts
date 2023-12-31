// export async function httpLogoutUser() {
//   try {
//     await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
//       method: "post",
//       credentials: "include",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

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
    });
    const data = await res.json(); 
    localStorage.setItem("token", data.token);
    return {
      status: res.status,
      data: data,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetUserInfo() {
  try {
    const token = localStorage.getItem("token");
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
