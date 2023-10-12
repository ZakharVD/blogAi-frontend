export async function httpCreatePost(title: string, content: string) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "put",
      credentials: "include",
      headers: {
        "content-type": "application/json",
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: "delete",
      credentials: "include",
      headers: {
        "content-type": "application/json",
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
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${userId}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
