interface OrdersCardProps{
  ProgressText: string;
  total : number;
  orders: [{
    id: number;
    value: string;
  }]
}

export function OrdersCard( {ProgressText, total, orders} : OrdersCardProps) {
  return(
    <div className="border-2 border-white rounded-lg py-5 w-[300px] sm:w-[420px] 2xl:w-[490px]">
      <header className="flex justify-between items-center text-amber-400 px-4 text-2xl font-bold">
        <p>{ProgressText}</p>
        <p>Total: <span>{total}</span></p>
      </header>
      <table className="text-white text-lg px-6 block">
        <tr className="flex justify-between text-center">
          <th className="w-[100px]"># </th>
          <th className="w-[100px]">Valor</th>
          <th className="w-[100px]">Ação</th>
        </tr>
        {orders.map(order => (
          <tr className="flex justify-between text-center" key={order.id}>
            <td className="w-[100px]">{order.id}</td>
            <td className="w-[100px]">{order.value}</td>
            <td className="w-[100px]">🔎</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
