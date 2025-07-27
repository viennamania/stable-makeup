import { NextResponse, type NextRequest } from "next/server";

import {
	getTotalNumberOfBuyOrders,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();
  const {
    storecode = '', // Default to empty string if not provided
  } = body;


  const result = await getTotalNumberOfBuyOrders({
    storecode: storecode,
  });

 
  return NextResponse.json({

    result,
    
  });
  
}
