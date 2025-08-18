import { createClient } from '@/lib/supabase.server';
import { redirect } from 'next/navigation';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth/login');
  }

  // Fetch user's orders (assuming a 'orders' table with a 'user_id' column)
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id);

  // Fetch user's discounts/coupons (assuming a 'user_coupons' table)
  const { data: coupons, error: couponsError } = await supabase
    .from('user_coupons')
    .select('*, coupons(code, discount_percentage)') // Assuming 'coupons' table for coupon details
    .eq('user_id', user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <h2 className="text-2xl font-bold mb-4">Account Details</h2>
        <p>Email: {user.email}</p>
        {/* Add more user details here if available in your Supabase 'profiles' table */}

        <h2 className="text-2xl font-bold mt-8 mb-4">Your Orders</h2>
        {ordersError && <p className="text-red-500">Error loading orders: {ordersError.message}</p>}
        {orders && orders.length > 0 ? (
          <ul className="list-disc pl-5">
            {orders.map((order) => (
              <li key={order.id} className="mb-2">
                Order ID: {order.id} - Status: {order.status} - Total: ${order.total_amount}
                {/* Display more order details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4">Your Discounts/Coupons</h2>
        {couponsError && <p className="text-red-500">Error loading coupons: {couponsError.message}</p>}
        {coupons && coupons.length > 0 ? (
          <ul className="list-disc pl-5">
            {coupons.map((coupon) => (
              <li key={coupon.id} className="mb-2">
                Code: {coupon.coupons?.code || 'N/A'} - Discount: {coupon.coupons?.discount_percentage || 'N/A'}%
                {/* Display more coupon details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No coupons found.</p>
        )}
      </div>
    </div>
  );
}
