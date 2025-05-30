'use client';

import { useState, useEffect, use, act } from "react";

import Image from "next/image";



// open modal

import Modal from '@/components/modal';

import { useRouter }from "next//navigation";


import { toast } from 'react-hot-toast';

import { client } from "../../../client";



import {
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";



import {
  polygon,
  arbitrum,
} from "thirdweb/chains";

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useWalletBalance,

  useSetActiveWallet,

  useConnectedWallets,


} from "thirdweb/react";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";





import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
import { add } from "thirdweb/extensions/farcaster/keyGateway";
 


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
import Chat from "@/components/Chat";
import { ClassNames } from "@emotion/react";


import useSound from 'use-sound';
import { it } from "node:test";
import { get } from "http";


import { useSearchParams } from 'next/navigation';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { format } from "date-fns";
import { ko } from "date-fns/locale";



interface BuyOrder {
  _id: string;
  createdAt: string;
  walletAddress: string;
  nickname: string;
  avatar: string;
  trades: number;
  price: number;
  available: number;
  limit: string;
  paymentMethods: string[];

  usdtAmount: number;
  krwAmount: number;
  rate: number;



  seller: any;

  tradeId: string;
  status: string;
  acceptedAt: string;
  paymentRequestedAt: string;
  paymentConfirmedAt: string;
  cancelledAt: string;


  buyer: any;

  canceller: string;

  escrowTransactionHash: string;
  transactionHash: string;
}



const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "x",
        "passkey",
        "phone",
        "facebook",
        "line",
        "apple",
        "coinbase",
      ],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),

];


// get escrow wallet address

//const escrowWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0x2f2a2543B76A4166549F7aab2e75Bef0aefC5B0f"; // USDT on Arbitrum




export default function Index({ params }: any) {

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');



  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.center === "arbitrum" ? arbitrum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

    address: params.center === "arbitrum" ? contractAddressArbitrum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });


 




  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    Buy: "",
    Sell: "",
    Amount: "",
    Price: "",
    Total: "",
    Orders: "",
    Trades: "",
    Search_my_trades: "",

    Anonymous: "",

    Seller: "",
    Buyer: "",
    Me: "",

    Buy_USDT: "",
    Rate: "",
    Payment: "",
    Bank_Transfer: "",

    I_agree_to_the_terms_of_trade: "",
    I_agree_to_cancel_the_trade: "",

    Opened_at: "",
    Cancelled_at: "",
    Completed_at: "",


    Opened: "",
    Completed: "",
    Cancelled: "",


    Waiting_for_seller_to_deposit: "",

    to_escrow: "",
    If_the_seller_does_not_deposit_the_USDT_to_escrow: "",
    this_trade_will_be_cancelled_in: "",

    Cancel_My_Trade: "",


    Order_accepted_successfully: "",
    Order_has_been_cancelled: "",
    My_Order: "",

    hours: "",
    minutes: "",
    seconds: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    Order_Opened: "",
    Trade_Started: "",
    Expires_in: "",

    Accepting_Order: "",

    Escrow: "",

    Chat_with_Seller: "",
    Chat_with_Buyer: "",

    Table_View: "",

    TID: "",

    Status: "",

    Sell_USDT: "",

    Buy_Order_Opened: "",
  
    Insufficient_balance: "",


    Request_Payment: "",

    Payment_has_been_confirmed: "",

    Confirm_Payment: "",

    Escrow_Completed: "",

    Buy_Order_Accept: "",

    Payment_Amount: "",

    Buy_Amount: "",

    Deposit_Name: "",

    My_Balance: "",

    Make_Escrow_Wallet: "",
    Escrow_Wallet_Address_has_been_created: "",
    Failed_to_create_Escrow_Wallet_Address: "",

    Newest_order_has_been_arrived: "",
    Payment_request_has_been_sent: "",
    Escrow_balance_is_less_than_payment_amount: "",

    Copied_Wallet_Address: "",


  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    Buy,
    Sell,
    Amount,
    Price,
    Total,
    Orders,
    Trades,
    Search_my_trades,

    Anonymous,

    Seller,
    Buyer,
    Me,

    Buy_USDT,
    Rate,
    Payment,
    Bank_Transfer,
    I_agree_to_the_terms_of_trade,
    I_agree_to_cancel_the_trade,

    Opened_at,
    Cancelled_at,
    Completed_at,

    Opened,
    Completed,
    Cancelled,

    Waiting_for_seller_to_deposit,

    to_escrow,

    If_the_seller_does_not_deposit_the_USDT_to_escrow,
    this_trade_will_be_cancelled_in,

    Cancel_My_Trade,

    Order_accepted_successfully,
    Order_has_been_cancelled,
    My_Order,

    hours,
    minutes,
    seconds,

    hours_ago,
    minutes_ago,
    seconds_ago,

    Order_Opened,
    Trade_Started,
    Expires_in,

    Accepting_Order,

    Escrow,

    Chat_with_Seller,
    Chat_with_Buyer,

    Table_View,

    TID,

    Status,

    Sell_USDT,

    Buy_Order_Opened,

    Insufficient_balance,

    Request_Payment,

    Payment_has_been_confirmed,

    Confirm_Payment,

    Escrow_Completed,

    Buy_Order_Accept,

    Payment_Amount,

    Buy_Amount,

    Deposit_Name,

    My_Balance,

    Make_Escrow_Wallet,
    Escrow_Wallet_Address_has_been_created,
    Failed_to_create_Escrow_Wallet_Address,

    Newest_order_has_been_arrived,
    Payment_request_has_been_sent,
    Escrow_balance_is_less_than_payment_amount,

    Copied_Wallet_Address,

  } = data;




  const router = useRouter();



  /*
  const setActiveAccount = useSetActiveWallet();
 

  const connectWallets = useConnectedWallets();

  const smartConnectWallet = connectWallets?.[0];
  const inAppConnectWallet = connectWallets?.[1];
  */


  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;



  const [phoneNumber, setPhoneNumber] = useState("");

  
  useEffect(() => {

    if (address) {

  

      //const phoneNumber = await getUserPhoneNumber({ client });
      //setPhoneNumber(phoneNumber);


      getUserPhoneNumber({ client }).then((phoneNumber) => {
        setPhoneNumber(phoneNumber || "");
      });

    }

  } , [address]);
  


  const [nativeBalance, setNativeBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      ///console.log('getBalance address', address);

      
      const result = await balanceOf({
        contract,
        address: address || "",
      });

  
      //console.log(result);
  
      setBalance( Number(result) / 10 ** 6 );


      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.center,
          walletAddress: address,
        }),
      })

      .then(response => response.json())

      .then(data => {
          setNativeBalance(data.result?.displayValue);
      });



    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, contract, params.center]);





  // get User by wallet address

  const [user, setUser] = useState<any>(null);
  useEffect(() => {

    if (!address) {

      setUser(null);
      return;
    }


    fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storecode: params.center,
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        setUser(data.result);


    })
    .catch((error) => {
        console.error('Error:', error);
    });
  } , [address]);





    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    




    // starDate, endDate
    // startDate is 1st day of the month
    const [startDate, setStartDate] = useState(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    );
    const [endDate, setEndDate] = useState(new Date());
    
    const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);
    const [loadingBuyOrders, setLoadingBuyOrders] = useState(false);

    const [totalCount, setTotalCount] = useState(0);
    const [totalKrwAmount, setTotalKrwAmount] = useState(0);
    const [totalUsdtAmount, setTotalUsdtAmount] = useState(0);

    useEffect(() => {
      
      const fetchBuyOrders = async () => {

        setLoadingBuyOrders(true);

        const response = await fetch('/api/order/getAllBuyOrdersBySeller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 200,
            page: 1,
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            walletAddress: address,
          }),
        });

        if (response.status !== 200) {
          console.error('Failed to fetch buy orders');

          setLoadingBuyOrders(false);
          return;
        }
        const data = await response.json();

        //console.log('data', data);

        setBuyOrders(data.result.orders);

        setTotalCount(data.result.totalCount);

        data.result.totalKrwAmount && setTotalKrwAmount(data.result.totalKrwAmount);

        data.result.totalUsdtAmount && setTotalUsdtAmount(data.result.totalUsdtAmount);

        setLoadingBuyOrders(false);

      }

      if (address) fetchBuyOrders();

    } , [address, startDate, endDate]);






    const [storeCodeNumber, setStoreCodeNumber] = useState('');

    useEffect(() => {
  
      const fetchStoreCode = async () => {
  
        const response = await fetch('/api/order/getStoreCodeNumber', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
  
        //console.log('getStoreCodeNumber data', data);
  
        setStoreCodeNumber(data?.storeCodeNumber);
  
      }
  
      fetchStoreCode();
  
    } , []);



    


    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-xl mx-auto">


        <div className="py-0 w-full">

            <div className="w-full flex flex-row gap-2 items-center justify-start text-zinc-500 text-lg"
            >
                {/* go back button */}
                <div className="p-4 w-full flex justify-start items-center gap-2">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center bg-gray-200 rounded-full p-2">
                        <Image
                            src="/icon-back.png"
                            alt="Back"
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                    </button>
                    {/* title */}
                    <span className="text-sm text-gray-500 font-semibold">
                        돌아가기
                    </span>
                </div>

                <div className="">
                {params.center}
                </div>

                {address && (
                    <button
                    className="text-sm text-zinc-500 underline"
                    onClick={() => {
                        navigator.clipboard.writeText(address);
                        toast.success(Copied_Wallet_Address);
                    } }
                    >
                    {address.substring(0, 6)}...{address.substring(address.length - 4)}
                    </button>
                )}

            </div>

    
            <div className="mt-4 flex justify-start space-x-4">
                <button
                    onClick={() => router.push(
                    '/' + params.lang + '/' + params.center
                    )}
                    className="text-zinc-100 font-semibold underline"
                >
                    {Go_Home}
                </button>
            </div>


          <div className="flex flex-col items-start justify-center space-y-4">

              <div className='flex flex-row items-center space-x-4'>
                  <Image
                    src="/logo-tether.svg"
                    alt="USDT"
                    width={35}
                    height={35}
                    className="rounded-lg"
                  />

                  <div className="text-2xl font-semibold">
                    나의 거래내역
                  </div>

              </div>


                {/* check box for Native Wallet */}
                {/*
                {address && (
                  <div className="flex flex-row items-center gap-2">
                    <input
                      disabled={true}
                      type="checkbox"
                      checked={
                        activeWallet === inAppConnectWallet
                      }
                      onChange={(e) => 
                        ///e.target.checked ? setActiveAccount(inAppConnectWallet) : setActiveAccount(smartConnectWallet)

                        e.target.checked ?
                        router.push( window.location.pathname )
                        :
                        router.push( window.location.pathname  + '?wallet=smart' )

                      } 
                      className="w-5 h-5"
                    />
                    <label className="text-sm text-zinc-400">Pro Wallet</label>
                  </div>
                )}
                */}



                <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-3">


                  <div className="flex flex-row items-start gap-3">
                  
                    {!address && (

                        <ConnectButton
                        client={client}
                        wallets={wallets}

                        /*
                        accountAbstraction={{
                            chain: polygon,
                            sponsorGas: true
                        }}
                        */
                        
                        theme={"light"}

                        // button color is dark skyblue convert (49, 103, 180) to hex
                        connectButton={{
                            style: {
                            backgroundColor: "#3167b4", // dark skyblue
                            // font color is gray-300
                            color: "#f3f4f6", // gray-300
                            padding: "10px 10px",
                            borderRadius: "10px",
                            fontSize: "16px",
                            // w-full
                            width: "100%",
                            },
                            label: "로그인",
                        }}

                        connectModal={{
                            size: "wide", 
                            //size: "compact",
                            titleIcon: "https://cryptopay.beauty/logo.png",                           
                            showThirdwebBranding: false,
                        }}

                        locale={"ko_KR"}
                        //locale={"en_US"}
                        />
                    )}


                  </div>

                </div>


                <div className="w-full flex flex-row items-start justify-between gap-2">


                  <div className="ml-10 flex flex-col items-center gap-2">
                    {/* reload button */}
                    {/*
                    <button
                      className="text-sm bg-zinc-800 px-2 py-1 rounded-md"
                      onClick={() => {

                        reload();

                      }}
                    >
                      Reload
                    </button>
                    */}

                    {/* date range picker */}
                    <div className="flex flex-row items-center gap-2
                      border border-zinc-400 rounded-md p-2"
                    >
                      <DatePicker
                        className="text-lg text-zinc-400
                          border-r border-zinc-400
                          rounded-md
                          pl-2
                          pr-2
                          bg-zinc-800
                        "
                        selected={startDate}
                        onChange={(date) => {
                          if (date) {
                            setStartDate(date);
                          }
                        }}
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                      />
                      <DatePicker
                        className="text-lg text-zinc-400
                          rounded-md
                          pl-2
                          pr-2
                          bg-zinc-800
                        "
                        selected={endDate}
                        onChange={(date) => {
                          if (date) {
                            setEndDate(date);
                          }
                        }}
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                      />

                      {loadingBuyOrders && (
                        <div className="text-sm text-zinc-400">
                          Loading...
                        </div>
                      )}

                    </div>




                  </div>






                  <div className="flex flex-row items-start gap-5">


                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">결제건수</div>
                      <div className="text-xl font-semibold text-zinc-500">
                        {totalCount}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">결제금액</div>
                      <div className="text-xl font-semibold text-zinc-500">
                        {
                          totalKrwAmount && Number(totalKrwAmount)?.toLocaleString('ko-KR', {
                            style: 'currency',
                            currency: 'KRW',
                          })
                        }
                      </div>
                    </div>
                    {/* totalUsdtAmount */}
                    {/* 결제금액 USDT */}
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-sm">결제금액 USDT</div>
                      <div className="text-xl font-semibold text-zinc-500">
                        {
                          totalUsdtAmount && Number(totalUsdtAmount)?.toLocaleString('us-US', {
                            style: 'currency',
                            currency: 'USD',
                          })
                        }
                      </div>
                    </div>


                  </div>







                </div>


                <div className="w-full overflow-x-auto">

                  <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                    <thead
                      className="bg-zinc-800 text-zinc-200 text-sm"
                    >
                      <tr>
                      <th className="p-2">{TID}</th>
                        <th className="p-2">완료날짜</th>
                        <th className="p-2">{Deposit_Name} / {Buyer}</th>

                        <th className="p-2">{Price} / {Buy_Amount} / {Rate}</th>
                        <th className="p-2">{Payment}</th>
                        <th className="p-2">{Payment_Amount}</th>
                      </tr>
                    </thead>

                    {/* if my trading, then tr has differenc color */}
                    <tbody>

                      {buyOrders.map((item, index) => (

                        
                        <tr key={index} className={`
                          ${
                            index % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-800'


                            //item.walletAddress === address ?
                            
  
                          }
                        `}>
                        

                          <td className="pl-2 text-blue-500 text-lg font-semibold">
                            {item.status !== 'ordered' &&
                              '#' + item.tradeId
                            }
                          </td>


                          <td className="p-2">
                            <div className="text-sm text-white font-semibold ">
                              {
                                new Date(item.paymentConfirmedAt)?.toLocaleString()
                              }
                            </div>
                          </td>
                          
                          <td className="p-2">
                            <div className="flex flex-row gap-2 items-center justify-start">
                              {/*
                              <Image
                                src={item.avatar || "/profile-default.png"}
                                alt="Avatar"
                                width={20}
                                height={20}
                                priority={true} // Added priority property
                                className="rounded-full"
                                style={{
                                    objectFit: 'cover',
                                    width: '20px',
                                    height: '20px',
                                }}
                              />
                              */}
                              <div className="flex flex-row gap-2 items-center justify-start">

                                <div className="text-sm text-yellow-500 font-semibold">
                                  {
                                    //item.walletAddress === address ? 'Me' : item.tradeId ? item.tradeId : ''

                                    item.walletAddress === address ? 'Me' :

                                    item?.buyer?.depositBankName + ' ' + item?.buyer?.depositName

                                  }
                                </div>
                                <div className="text-xs font-semibold text-white">
                                  {item.walletAddress === address ? 'Me' : item?.nickname}
                                </div>

                              </div>
                            </div>
                          </td>


                          <td className="p-2">
                            <div className="flex flex-row gap-1 items-center justify-start">
                              <span className="text-lg text-yellow-500 font-semibold">
                                {Number(item.krwAmount)?.toLocaleString('ko-KR', {
                                  style: 'currency',
                                  currency: 'KRW',
                                })}
                              </span>
                              <span className="text-sm text-white">{item.usdtAmount}{' '}USDT</span>
                              <span className="text-xs">
                                {
                                  Number(item.rate).toFixed(2)
                                  //Number(item.krwAmount / item.usdtAmount).toFixed(2)
                                }
                              </span>
                            </div>
                          </td>


                          <td className="p-2">
                            <div className="flex flex-row gap-2 items-center justify-start">
                              <div className="text-xs font-semibold text-white">
                                {item.seller?.bankInfo?.bankName}
                              </div>
                              <div className="text-xs font-semibold text-white">
                                {item.seller?.bankInfo?.accountNumber}
                              </div>
                              <div className="text-xs font-semibold text-white">
                                {item.seller?.bankInfo?.accountHolder}
                              </div>
                            </div>
                          </td>


                          <td className="p-2">
                            <div className="flex mr-2 text-right">
                              {

                                item.status === 'paymentConfirmed' ? (

                                  <div className=" text-green-500 text-lg font-semibold">
                                    {
                                      Number(item.krwAmount)?.toLocaleString('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                      })
                                    }
                                  </div>

                                ) : item.status === 'paymentRequested' ? (
                                  <></>
                                ) : (
                                  <></>
                                )

                              }
                            </div>
                          </td>


                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>


            </div>

        

            
          </div>


          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  //goChat={goChat}
              />
          </Modal>


        </main>

    );


};






// close modal

const TradeDetail = (
    {
        closeModal = () => {},
        goChat = () => {},
        
    }
) => {


    const [amount, setAmount] = useState(1000);
    const price = 91.17; // example price
    const receiveAmount = (amount / price).toFixed(2);
    const commission = 0.01; // example commission
  
    return (

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
          <h2 className="text-lg font-semibold text-black ">Iskan9</h2>
          <span className="ml-2 text-blue-500 text-sm">318 trades</span>
        </div>
        <p className="text-gray-600 mt-2">The offer is taken from another source. You can only use chat if the trade is open.</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span>{price} KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Limit</span>
            <span>40680.00 KRW - 99002.9 KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Available</span>
            <span>1085.91 USDT</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Seller&apos;s payment method</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 rounded-full">Tinkoff</span>
          </div>
          <div className="mt-4 text-gray-700">
            <p>24/7</p>
          </div>
        </div>
  
        <div className="mt-6 border-t pt-4 text-gray-700">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">I want to pay</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(
                    e.target.value === '' ? 0 : parseInt(e.target.value)
                ) }

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">I will receive</label>
              <input 
                type="text"
                value={`${receiveAmount} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Commission</label>
              <input 
                type="text"
                value={`${commission} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Buy USDT');
                    // go to chat
                    // close modal
                    closeModal();
                    goChat();

                }}
            >
                Buy USDT
            </button>
            <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Cancel');
                    // close modal
                    closeModal();
                }}
            >
                Cancel
            </button>
          </div>

        </div>


      </div>
    );
  };



