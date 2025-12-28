const OrderCard = ({ order }) => {
  return (
    <div className="border rounded-lg p-4 shadow bg-white space-y-4">

      <div className="flex justify-between">
        <p className="font-semibold">Order #{order.id}</p>
        <span className="text-sm text-indigo-600 font-medium">
          {order.orderStatus}
        </span>
      </div>

      {order.orderItems.map((item) => (
        <div key={item.id} className="flex gap-4 border-t pt-4">
          <img
            src={item.product.imageUrl}
            alt={item.product.title}
            className="w-20 h-20 object-cover rounded"
          />

          <div>
            <p className="font-medium">{item.product.title}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
            <p className="text-sm">
              Price: ₹{item.discountedPrice}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4 border-t">
        <p className="font-semibold">
          Total: ₹{order.totalDiscountedPrice}
        </p>
        <p className="text-sm text-gray-500">
          Ordered on: {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>

    </div>
  );
};

export default OrderCard;
