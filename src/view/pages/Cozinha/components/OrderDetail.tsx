import { Category } from '../../../../app/entities/Category';
import { Order } from '../../../../app/entities/Order';
import { OrderProduct } from '../../../../app/entities/OrderProduct';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';

interface OrderDetailProps{
  order: Order;
}

interface ProductsByCategory{
  category: Category;
  products: OrderProduct[];
}

export function OrderDetail( {order}: OrderDetailProps){

  const productsByCategories: ProductsByCategory[] = [];

  order.orderProduct.forEach( oderProduct => {
    if (!productsByCategories.some(item => oderProduct.product.category.categoryId == item.category.categoryId)) {
      const newCategory = oderProduct.product.category;
      const newProduct = oderProduct;
      productsByCategories.push({category: newCategory, products: [newProduct]});
    } else {
      const index = productsByCategories.findIndex( item => item.category.categoryId == oderProduct.product.category.categoryId);
      productsByCategories[index].products.push(oderProduct);
    }
  });

  console.log(productsByCategories);

  return (
    <div className="border-2 border-white rounded-lg py-5 w-[300px] sm:w-[490px]">
      <header className="flex items-center justify-around text-amber-400 text-2xl font-bold">
        <h1>Pedido</h1>
        <span>{order.orderId}</span>
      </header>
      {productsByCategories.map(productsByCategory => (
        <table key={productsByCategory.category.categoryId} className="text-white text-lg w-full">
          <thead className="w-full flex items-center justify-between text-amber-400 text-lg font-bold p-4">
            <tr className="w-full flex items-center justify-between">
              <th className="w-[100px] text-center">{productsByCategory.category.name}</th>
              <th className="w-[100px] text-center">Qt</th>
              <th className="w-[100px] text-center">CheckList</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {productsByCategory.products.map( orderProduct => (
              <tr key={orderProduct.product.productId} className="flex items-center justify-between px-4">
                <td className="w-[100px] text-center">{orderProduct.product.name}</td>
                <td className="w-[100px] text-center">{orderProduct.quantity}</td>
                <td className="w-[100px] flex items-center justify-center"><Checkbox checked={true} id="1" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      <div className='flex items-center justify-around mt-4'>
        <Button className='w-[136px] h-[48px]'>
              Finalizar
        </Button>
        <Button className='w-[136px] h-[48px] bg-red-500 hover:bg-red-400'>
            Cancelar
        </Button>
      </div>
    </div>
  );
}
