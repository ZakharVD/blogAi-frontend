export async function httpCreatePost(title: string, content: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function httpUpdatePost(
  postId: string,
  title: string,
  content: string
) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetPostById(postId: string) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetAllPosts() {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function httpDeletePostById(postId: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetPostsByUserId(userId: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${userId}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
