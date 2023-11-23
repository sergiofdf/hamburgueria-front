import { useState } from 'react';
import { Category } from '../../../../app/entities/Category';
import { Order } from '../../../../app/entities/Order';
import { OrderProduct } from '../../../../app/entities/OrderProduct';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { useOrderDetailController } from './useOrderDetailController';
import { Spinner } from '../../../components/Spinner';

interface OrderDetailProps{
  order: Order;
}

interface ProductsByCategory{
  category: Category;
  products: OrderProduct[];
}

export function OrderDetail( {order}: OrderDetailProps){

  const { handleCancelOrder, handleFinishPreparation, isLoadingCancel, isLoadingFinishing } = useOrderDetailController({id: order.orderId,});

  const [ isAllChecked, setIsAllChecked ] = useState(false);
  const [ counter, setCounter ] = useState(0);

  const productsByCategories: ProductsByCategory[] = [];

  order.orderProduct.forEach( orderProduct => {
    orderProduct.finished = false;
    if (!productsByCategories.some(item => orderProduct.product.category.categoryId == item.category.categoryId)) {
      const newCategory = orderProduct.product.category;
      const newProduct = orderProduct;
      productsByCategories.push({category: newCategory, products: [newProduct]});
    } else {
      const index = productsByCategories.findIndex( item => item.category.categoryId == orderProduct.product.category.categoryId);
      productsByCategories[index].products.push(orderProduct);
    }
  });

  function handleClick(checkState: boolean): void{
    if(checkState){
      setCounter(current => ++current);
    } else {
      setCounter(current => --current);
    }

    if(counter == order.orderProduct.length - 1 && checkState){
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }

  }

  return (
    <div className="border-2 border-white rounded-lg py-5 w-[300px] sm:w-[490px]">
      <header className="flex items-center justify-around text-amber-400 text-2xl font-bold">
        <h1>Pedido</h1>
        <span>{order.orderId}</span>
      </header>
      {productsByCategories.map(productsByCategory => (
        <table key={productsByCategory.category.categoryId} className="text-white text-lg w-full">
          <thead className="w-full flex items-center justify-between text-amber-400 text-base sm:text-lg sm:font-bold py-4 sm:px-4">
            <tr className="w-full flex items-center justify-between">
              <th className="w-[100px] text-center">{productsByCategory.category.name}</th>
              <th className="w-[100px] text-center">Qt</th>
              <th className="w-[100px] text-center">CheckList</th>
            </tr>
          </thead>
          <tbody className="w-full flex items-center justify-between sm:px-4">
            {productsByCategory.products.map( orderProduct => (
              <tr key={orderProduct.orderProductId} className="flex items-center justify-between sm:w-full">
                <td className="w-[100px] text-center">{orderProduct.product.name}</td>
                <td className="w-[100px] text-center">{orderProduct.quantity}</td>
                <td className="w-[100px] flex items-center justify-center" >
                  <Checkbox id={orderProduct.orderProductId} handleClick={handleClick} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      <div className='flex items-center justify-around mt-8'>
        <Button className='w-[136px] h-[48px]' disabled={!isAllChecked || isLoadingCancel} onClick={handleFinishPreparation}>
          {isLoadingFinishing ? <Spinner className='w-6 h-6 fill-green-600'/> : 'Finalizar'}
        </Button>
        <Button className='w-[136px] h-[48px] bg-red-500 hover:bg-red-400' onClick={handleCancelOrder} disabled={isLoadingFinishing}>
          {isLoadingCancel? <Spinner className='w-6 h-6 fill-red-500'/> : 'Cancelar'}
        </Button>
      </div>
    </div>
  );
}
