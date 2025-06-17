import { NextResponse, type NextRequest } from "next/server";


// getAllUsersByStorecode
import {
  getAllUsersByStorecode,
} from "@lib/api/user";



import {
  UserProps,
	acceptBuyOrder,
  updateBuyOrderByQueueId,


  //getOneBuyOrder,
  getOneBuyOrderByTradeId,

  buyOrderConfirmPayment,

} from '@lib/api/order';






// webhook
// header
/*

Content-Type
application/json
x-webhook-key
your-webhook-key
(대시보드 > API설정 > 웹훅키에서 확인 가능)
x-mall-id
your-mall-id
(대시보드 > API설정 > 상점ID에서 확인 가능)
x-trace-id
트랜잭션 고유 ID
*/
// body
/*
{
    "transaction_type": "deposited",
    "bank_account_id": "1689197615581x256615117901486500",
    "bank_account_number": "12345678901234",
    "bank_code": "003",
    "amount": 100000,
    "transaction_date": "2024-04-15T15:03:00+09:00",
    "transaction_name": "홍길동",
    "balance": 111222333,
    "processing_date": "2024-04-15T15:03:01+09:00"
}
*/

// response body

/*
유형
상태코드
결과값
Response Body
200
{ "status": "success" }
 */


export async function POST(request: NextRequest) {


  // parse header
  const webhookKey = request.headers.get("x-webhook-key");
  const mallId = request.headers.get("x-mall-id");
  const traceId = request.headers.get("x-trace-id");

  console.log("payaction webhookKey", webhookKey);
  console.log("payaction mallId", mallId);
  console.log("payaction traceId", traceId); // payaction traceId 1747808169270x797731416156850300



  const body = await request.json();

  console.log("payaction body", body);
  /*
{
    "transaction_type": "deposited",
    "bank_account_id": "1689197615581x256615117901486500",
    "bank_account_number": "12345678901234",
    "bank_code": "003",
    "amount": 100000,
    "transaction_date": "2024-04-15T15:03:00+09:00",
    "transaction_name": "홍길동",
    "balance": 111222333,
    "processing_date": "2024-04-15T15:03:01+09:00"
}
  */


  if (!body) {
    return NextResponse.json({
      status: "error",
      message: "body is empty",
    });
  }



  const {
    transaction_type,
    bank_account_id,
    bank_account_number,
    bank_code,
    amount,
    transaction_date,
    transaction_name,
    balance,
    processing_date,
  } = body;

 


  console.log("payaction transaction_type", transaction_type);
  console.log("payaction bank_account_id", bank_account_id);
  console.log("payaction bank_account_number", bank_account_number);
  console.log("payaction bank_code", bank_code);
  console.log("payaction amount", amount);
  console.log("payaction transaction_date", transaction_date);
  console.log("payaction transaction_name", transaction_name);
  console.log("payaction balance", balance);
  console.log("payaction processing_date", processing_date);




  // center = 'place69_bot'
  // userid = 'mcmcmo'
  // storecode = storecode

  const storecode = "gjdzwxes"; // 예시로 storecode를 지정합니다. 실제로는 mallId나 다른 방법으로 가져와야 합니다.

  try {


    // get all users by storecode
    const response = await getAllUsersByStorecode({
      storecode: storecode,
      limit: 1000,
      page: 1,
    });

    const users = response?.users || [];

    console.log("getAllUsersByStorecode response", response);
    console.log("getAllUsersByStorecode users", users);


    if (users && users.length > 0) {


      //for (const user of users) {


      for (let i = 0; i < users.length; i++) {
        const user = users[i];


        //const userid = user.nickname;

        //const userid = user.id;
        // toString()으로 변환하여 사용
        const userid = user.id.toString();



        const response = await fetch("https://dubai-telegram.vercel.app/api/telegram/sendMessageByUseridAndStorecode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            center: "place69_bot",
            userid: userid,
            storecode: storecode,
            //message: `주문이 완료되었습니다. 주문번호: ${orderId}, 결제금액: ${paymentAmount}원`,

            // 주문번호: tradeId,
            // 입금시간: '2025년 5월 21일 15시 31분 06초',
            // 입금자명: "홍길동",
            // 입금액: 10,000원

            
            message:

            '입금자명: ' + transaction_name + '\n' +
            '입금액: ' + amount.toLocaleString() + '원' + '\n' +
            '입금계좌: ' + bank_account_number + '\n' +
            '입금은행: ' + bank_code + '\n' +
            '거래유형: ' + transaction_type + '\n' +
            '거래일시: ' + transaction_date.replace('T', ' ').replace('+09:00', '') + '\n' +
            '잔액: ' + balance.toLocaleString() + '원' + '\n'
            
            //message: `주문번호: ${order_number}, 입금시간: ${processing_date}, 회원아이디: ${buyerNickname}, 입금자명: ${buyerDepositName}, 입금액: ${paymentAmount.toLocaleString()}원`,

          }),
        });

        if (!response.ok) {
          console.error("Failed to send Telegram message for user:", userid, "with status:", response.status);
          continue; // Skip to the next user if sending fails
        }
        const data = await response.json();
        console.log("Telegram message sent for user:", userid, "with response:", data);

      }


    } else {
      console.log("No users found for storecode:", storecode);
    }

  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }




  

  return NextResponse.json({
    status: "success",
  });
  
}
