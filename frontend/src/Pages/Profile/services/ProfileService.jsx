import Cookies from 'js-cookie';

export const fetchUserData = async () => {
  const userId = Cookies.get('user');
  if (!userId) throw new Error("User ID not found");

  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error("Failed to fetch user data");
  return response.json();
};

export const fetchOrders = async () => {
  const userId = Cookies.get('user');
  if (!userId) throw new Error("User ID not found");

  const response = await fetch(`http://localhost:3000/orders/find/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error("Failed to fetch orders");
  const orders = await response.json();

  return Promise.all(
    orders.map(async (order) => {
      const products = await Promise.all(
        order.products.map(async (product) => {
          const productResponse = await fetch(`http://localhost:3000/product/find/${product.productId}`);
          const productData = await productResponse.json();
                return { ...product, ...productData };
        })
      );
      return { ...order, products };
    })
  );
};

export const updateUserData = async (data) => {
  const response = await fetch(`http://localhost:3000/users/changeNameandMail`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
    window: location.reload()
  });

  if (!response.ok) throw new Error("Failed to update user data");
  return response.json();
};
