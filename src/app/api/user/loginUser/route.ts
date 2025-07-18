import { NextResponse, type NextRequest } from "next/server";

import {
	getOneByNicknameAndPassword,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    storecode,
    memberid,
    password,
  } = body;

  console.log("loginUser storecode", storecode);
  console.log("loginUser memberid", memberid);
  console.log("loginUser password", password);



  const result = await getOneByNicknameAndPassword(
    storecode,
    memberid,
    password
  );

  if (!result) {
    return NextResponse.json({
      status: "error",
      message: "Invalid memberid or password",
    });
  }
  
  return NextResponse.json({

    result,
    
  });
  
}
