import { NextResponse, type NextRequest } from "next/server";

import {
	getSellOrdersForBuyer,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, searchMyOrders } = body;



  const result = await getSellOrdersForBuyer({
    limit: 300,
    page: 1,
    walletAddress,
    searchMyOrders,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}
