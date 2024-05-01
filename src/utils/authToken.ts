let token: string | null = null;

export const setToken = (newToken: string) => {
  token = newToken;
  console.log('Token set:', token); // 打印 token 看看是否正确设置
};

export const getToken = () => {
    console.log('Retrieving token:', token); // 打印 token 看看是否正确获取
    return token;
  };