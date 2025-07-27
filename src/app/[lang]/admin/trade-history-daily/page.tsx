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





import {
  getUserPhoneNumber,
  getUserEmail,
} from "thirdweb/wallets/in-app";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
import { add } from "thirdweb/extensions/farcaster/keyGateway";
 


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
//import Chat from "@/components/Chat";
import { ClassNames } from "@emotion/react";


import useSound from 'use-sound';
import { it } from "node:test";
import { get } from "http";


import { useSearchParams } from 'next/navigation';



/*
    {
      date: '2025-07-25',
      storecode: 'repruuqp',
      totalUsdtAmount: 19339.14,
      totalKrwAmount: 26688000
    },
    */

interface BuyOrder {

  date: string,
  storecode: string,
  totalUsdtAmount: number,
  totalKrwAmount: number,
  totalCount: number, // Count the number of orders

  totalSettlementAmount: number,
  totalSettlementAmountKRW: number,
}


/*
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
*/

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
      ],
    },
  }),
];


// get escrow wallet address

//const escrowWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum




export default function Index({ params }: any) {

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');


  // limit, page number params

  const limit = searchParams.get('limit') || 10;
  const page = searchParams.get('page') || 1;



  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: arbitrum,
  
  
  
    // the contract's address
    ///address: contractAddressArbitrum,

    address: contractAddressArbitrum,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });


 
  const activeWallet = useActiveWallet();




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


      /*
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
      */



    };


    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 5000);

    return () => clearInterval(interval);

  } , [address, contract]);











  const [escrowWalletAddress, setEscrowWalletAddress] = useState('');
  const [makeingEscrowWallet, setMakeingEscrowWallet] = useState(false);

  const makeEscrowWallet = async () => {
      
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }


    setMakeingEscrowWallet(true);

    fetch('/api/order/getEscrowWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.center,
        walletAddress: address,
        //isSmartAccount: activeWallet === inAppConnectWallet ? false : true,
        isSmartAccount: false,
      }),
    })
    .then(response => response.json())
    .then(data => {
        
        //console.log('getEscrowWalletAddress data.result', data.result);


        if (data.result) {
          setEscrowWalletAddress(data.result.escrowWalletAddress);
          toast.success(Escrow_Wallet_Address_has_been_created);
        } else {
          toast.error(Failed_to_create_Escrow_Wallet_Address);
        }
    })
    .finally(() => {
      setMakeingEscrowWallet(false);
    });

  }

  //console.log("escrowWalletAddress", escrowWalletAddress);




  // get escrow wallet address and balance
  
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [escrowNativeBalance, setEscrowNativeBalance] = useState(0);

  
  useEffect(() => {

    const getEscrowBalance = async () => {

      if (!address) {
        setEscrowBalance(0);
        return;
      }

      if (!escrowWalletAddress || escrowWalletAddress === '') return;


      
      const result = await balanceOf({
        contract,
        address: escrowWalletAddress,
      });

      //console.log('escrowWalletAddress balance', result);

  
      setEscrowBalance( Number(result) / 10 ** 6 );
            


      /*
      await fetch('/api/user/getUSDTBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.center,
          walletAddress: escrowWalletAddress,
        }),
      })
      .then(response => response?.json())
      .then(data => {

        console.log('getUSDTBalanceByWalletAddress data.result.displayValue', data.result?.displayValue);

        setEscrowBalance(data.result?.displayValue);

      } );
       */




      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.center,
          walletAddress: escrowWalletAddress,
        }),
      })
      .then(response => response?.json())
      .then(data => {


        ///console.log('getBalanceByWalletAddress data', data);


        setEscrowNativeBalance(data.result?.displayValue);

      });
      



    };

    getEscrowBalance();

    const interval = setInterval(() => {
      getEscrowBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, escrowWalletAddress, contract, params.center]);
  

  //console.log('escrowBalance', escrowBalance);







  

  // get User by wallet address
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);





  useEffect(() => {

    if (address) {

      getUserEmail({ client }).then((email) => {
        console.log('email', email);

        if (email) {
          

          fetch('/api/user/setUserVerified', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // storecode, walletAddress, nickname, mobile, email
            body: JSON.stringify({
              storecode: params.center,
              walletAddress: address,
              nickname: email,
              mobile: '+82',
              email: email,
            }),
          })
          .then(response => response.json())
          .then(data => {
              //console.log('data', data);



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
                  //console.log('data', data);
                  setUser(data.result);
              })

          });



        }

      });

  

      //const phoneNumber = await getUserPhoneNumber({ client });
      //setPhoneNumber(phoneNumber);


      getUserPhoneNumber({ client }).then((phoneNumber) => {
        setPhoneNumber(phoneNumber || "");
      });

    }

  } , [address]);



  
  useEffect(() => {

    if (!address) {

      setUser(null);
      return;
    }

    setLoadingUser(true);

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
        
        /////console.log('data.result', data.result);


        setUser(data.result);

        setEscrowWalletAddress(data.result.escrowWalletAddress);

        setIsAdmin(data.result?.role === "admin");

    })
    .catch((error) => {
        console.error('Error:', error);
        setUser(null);
        setEscrowWalletAddress('');
        setIsAdmin(false);
    });

    setLoadingUser(false);


  } , [address, params.center]);

  


  const [isPlaying, setIsPlaying] = useState(false);
  //const [play, { stop }] = useSound(galaxySfx);
  const [play, { stop }] = useSound('/ding.mp3');

  function playSong() {
    setIsPlaying(true);
    play();
  }

  function stopSong() {
    setIsPlaying(false);
    stop();
  }






  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  


  const [searchMyOrders, setSearchMyOrders] = useState(false);




  // limit number
  const [limitValue, setLimitValue] = useState(limit || 20);
  useEffect(() => {
    setLimitValue(limit || 20);
  }, [limit]);

  // page number
  const [pageValue, setPageValue] = useState(page || 1);
  useEffect(() => {
    setPageValue(page || 1);
  }, [page]);
  



  // search form date to date
  const [searchFromDate, setSearchFormDate] = useState("");
  // set today's date in YYYY-MM-DD format
  useEffect(() => {

    //const today = new Date();
    //first day of the year
    const today = new Date( new Date().getFullYear(), 0, 1);

    today.setHours(today.getHours() + 9); // Adjust for Korean timezone (UTC+9)


    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setSearchFormDate(formattedDate);
  }, []);




  const [searchToDate, setSearchToDate] = useState("");

  // set today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // Adjust for Korean timezone (UTC+9)

    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setSearchToDate(formattedDate);
  }, []);





  const [searchBuyer, setSearchBuyer] = useState("");

  const [searchDepositName, setSearchDepositName] = useState("");


  // search store bank account number
  const [searchStoreBankAccountNumber, setSearchStoreBankAccountNumber] = useState("");

  





  // limit number
  //const [limit, setLimit] = useState(20);

  // page number
  //const [page, setPage] = useState(1);


  const [totalCount, setTotalCount] = useState(0);

  const [loadingBuyOrders, setLoadingBuyOrders] = useState(false);
    
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);



   

  useEffect(() => {


    const fetchBuyOrders = async () => {


      setLoadingBuyOrders(true);

      const response = await fetch('/api/order/getAllBuyOrdersByStorecodeDaily', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(

            {
              storecode: params.center,
              limit: Number(limit),
              page: Number(page),
              walletAddress: address,
              searchMyOrders: searchMyOrders,

              fromDate: searchFromDate,
              toDate: searchToDate,

              searchBuyer: searchBuyer,
              searchDepositName: searchDepositName,
              searchStoreBankAccountNumber: searchStoreBankAccountNumber,
            }

        ),
      });

      setLoadingBuyOrders(false);

      if (!response.ok) {
        return;
      }



      const data = await response.json();


      setBuyOrders(data.result.orders);

      setTotalCount(data.result.totalCount);
      


    }


    fetchBuyOrders();

    
    
    const interval = setInterval(() => {

      fetchBuyOrders();


    }, 5000);
  

    return () => clearInterval(interval);
    
    
    
    


  } , [
    limit,
    page,
    address,
    searchMyOrders,

    params.center,
    searchFromDate,
    searchToDate,
    searchBuyer,
    searchDepositName,
    searchStoreBankAccountNumber
]);


///console.log('agreementForTrade', agreementForTrade);


const [fetchingBuyOrders, setFetchingBuyOrders] = useState(false);

const fetchBuyOrders = async () => {


  if (fetchingBuyOrders) {
    return;
  }
  setFetchingBuyOrders(true);

  const response = await fetch('/api/order/getAllBuyOrdersByStorecodeDaily', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        storecode: params.center,
        limit: Number(limitValue),
        page: Number(pageValue),
        walletAddress: address,
        searchMyOrders: searchMyOrders,

        searchOrderStatusCompleted: true,

        searchBuyer: searchBuyer,
        searchDepositName: searchDepositName,

        searchStoreBankAccountNumber: searchStoreBankAccountNumber,


        fromDate: searchFromDate,
        toDate: searchToDate,

      }

    ),
  });

  if (!response.ok) {
    setFetchingBuyOrders(false);
    toast.error('Failed to fetch buy orders');
    return;
  }
  const data = await response.json();
  //console.log('data', data);

  setBuyOrders(data.result.orders);
  setTotalCount(data.result.totalCount);
  setFetchingBuyOrders(false);

  return data.result.orders;
}




  


  // check table view or card view
  const [tableView, setTableView] = useState(true);




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
    



      // array of stores
  const [storeList, setStoreList] = useState([] as any[]);


  const [storeAdminWalletAddress, setStoreAdminWalletAddress] = useState("");

  const [fetchingStore, setFetchingStore] = useState(false);
  const [store, setStore] = useState(null) as any;

  useEffect(() => {


    setFetchingStore(true);

    const fetchData = async () => {
        const response = await fetch("/api/store/getOneStore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              storecode: params.center,
              ////walletAddress: address,
            }),
        });

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {

          setStore(data.result);

          setStoreAdminWalletAddress(data.result?.adminWalletAddress);

          if (data.result?.adminWalletAddress === address) {
            setIsAdmin(true);
          }

      } else {
        // get store list
        const response = await fetch("/api/store/getAllStores", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        });
        const data = await response.json();
        //console.log("getStoreList data", data);
        setStoreList(data.result.stores);
        setStore(null);
        setStoreAdminWalletAddress("");
      }

        setFetchingStore(false);
    };

    if (!params.center) {
      return;
    }

    fetchData();

    // interval to fetch store data every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }
    , 5000);
    return () => clearInterval(interval);

  } , [params.center]);





  const [tradeSummary, setTradeSummary] = useState({
    totalCount: 0,
    totalKrwAmount: 0,
    totalUsdtAmount: 0,
    totalSettlementCount: 0,
    totalSettlementAmount: 0,
    totalSettlementAmountKRW: 0,
    totalFeeAmount: 0,
    totalFeeAmountKRW: 0,
    totalAgentFeeAmount: 0,
    totalAgentFeeAmountKRW: 0,
    orders: [] as BuyOrder[],

    totalClearanceCount: 0,
    totalClearanceAmount: 0,
    totalClearanceAmountUSDT: 0,
  });
  const [loadingTradeSummary, setLoadingTradeSummary] = useState(false);


  const getTradeSummary = async () => {
    if (!address) {
      return;
    }
    setLoadingTradeSummary(true);
    const response = await fetch('/api/summary/getTradeSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        storecode: params.center,
        walletAddress: address,
        searchMyOrders: searchMyOrders,
        searchOrderStatusCompleted: true,

        searchBuyer: searchBuyer,
        searchDepositName: searchDepositName,

        searchStoreBankAccountNumber: searchStoreBankAccountNumber,

        fromDate: searchFromDate,
        toDate: searchToDate,
      })
    });
    if (!response.ok) {
      setLoadingTradeSummary(false);
      toast.error('Failed to fetch trade summary');
      return;
    }
    const data = await response.json();
    
    console.log('getTradeSummary data', data);


    setTradeSummary(data.result);
    setLoadingTradeSummary(false);
    return data.result;
  }




  useEffect(() => {

    if (!address || !params.center || !searchFromDate || !searchToDate) {
      setTradeSummary({
        totalCount: 0,
        totalKrwAmount: 0,
        totalUsdtAmount: 0,
        totalSettlementCount: 0,
        totalSettlementAmount: 0,
        totalSettlementAmountKRW: 0,
        totalFeeAmount: 0,
        totalFeeAmountKRW: 0,
        totalAgentFeeAmount: 0,
        totalAgentFeeAmountKRW: 0,
        orders: [] as BuyOrder[],

        totalClearanceCount: 0,
        totalClearanceAmount: 0,
        totalClearanceAmountUSDT: 0,
      });
      return;
    }

    getTradeSummary();

    /*
    // fetch trade summary every 10 seconds
    const interval = setInterval(() => {
      getTradeSummary();
    }, 10000);
    return () => clearInterval(interval);
    */

  } , [address, searchMyOrders, params.center, searchFromDate, searchToDate]);



  

  useEffect(() => {
    // Dynamically load the Binance widget script
    const script = document.createElement("script");
    script.src = "https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.20.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [address, store]);




  if (fetchingStore) {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">
        <div className="py-0 w-full flex flex-col items-center justify-center gap-4">

          <Image
            src="/banner-loading.gif"
            alt="Loading"
            width={200}
            height={200}
          />

          <div className="text-lg text-gray-500">가맹점 정보를 불러오는 중...</div>
        </div>
      </main>
    );
  }
  if (!fetchingStore && !store) {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">
        <div className="py-0 w-full flex flex-col items-center justify-center gap-4">
          <Image
            src="/banner-404.gif"
            alt="Error"
            width={200}
            height={200}
          />
          <div className="text-lg text-gray-500">가맹점 정보가 없습니다.</div>
          <div className="text-sm text-gray-400">가맹점 홈페이지로 이동해주세요.</div>

          {/* table of storeList */}
          {/* storeName, storeCode, storeLogo, goto center page */}
          
          <div className="w-full max-w-2xl">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">가맹점 이름</th>
                  <th className="px-4 py-2 text-left">가맹점 코드</th>
                  <th className="px-4 py-2 text-left">가맹점 로고</th>
                </tr>
              </thead>
              <tbody>
                {storeList.map((store) => (
                  <tr key={store.storecode} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{store.storeName}</td>
                    <td className="px-4 py-2">{store.storecode}</td>
                    <td className="px-4 py-2">
                      <Image
                        src={store.storeLogo || "/logo.png"}
                        alt={store.storeName}
                        width={100}
                        height={100}
                        className="rounded-lg w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => router.push('/' + params.lang + '/' + store.storecode + '/center')}
                        className="text-blue-500 hover:underline"
                      >
                        가맹점 페이지로 이동
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    );
  }


  if (!address) {
    return (
   <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


      <div className="py-0 w-full">




        {params.center && (
              <div className={`w-full flex flex-row items-center justify-start gap-2
                p-2 rounded-lg mb-4
                ${store?.backgroundColor ?
                  "bg-" + store.backgroundColor + " " :
                  "bg-black/10"
                }`}>
                
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <Image
                  src={store?.storeLogo || "/logo.png"}
                  alt="logo"
                  width={35}
                  height={35}
                  className="rounded-lg w-6 h-6"
                />
                {address && address === storeAdminWalletAddress && (
                  <div className="text-sm text-[#3167b4] font-bold">
                    {store?.storeName + " (" + store?.storecode + ") 가맹점 관리자"}
                  </div>
                )}
                {address && address !== storeAdminWalletAddress && (
                  <div className="text-sm text-[#3167b4] font-bold">
                    {store?.storeName + " (" + store?.storecode + ")"}
                  </div>
                )}

              </div>


              {address && !loadingUser && (


                <div className="w-full flex flex-row items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      router.push('/' + params.lang + '/' + params.center + '/profile-settings');
                    }}
                    className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                  >
                    {user?.nickname || "프로필"}
                  </button>


                  {/* logout button */}
                  <button
                      onClick={() => {
                          confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect()
                          .then(() => {

                              toast.success('로그아웃 되었습니다');

                              //router.push(
                              //    "/admin/" + params.center
                              //);
                          });
                      } }

                      className="flex items-center justify-center gap-2
                        bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                  >
                    <Image
                      src="/icon-logout.webp"
                      alt="Logout"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <span className="text-sm">
                      로그아웃
                    </span>
                  </button>

                </div>


              )}


              {!address && (
                <ConnectButton
                  client={client}
                  wallets={wallets}

                  /*
                  accountAbstraction={{
                    chain: arbitrum,
                    sponsorGas: true
                  }}
                  */
                  
                  theme={"light"}

                  // button color is dark skyblue convert (49, 103, 180) to hex
                  connectButton={{
                      style: {
                          backgroundColor: "#3167b4", // dark skyblue
                          color: "#f3f4f6", // gray-300
                          padding: "2px 10px",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "60x",
                          height: "38px",
                      },
                      label: "원클릭 로그인",
                  }}

                  connectModal={{
                    size: "wide", 
                    //size: "compact",
                    titleIcon: "https://www.stable.makeup/logo.png",                           
                    showThirdwebBranding: false,
                  }}

                  locale={"ko_KR"}
                  //locale={"en_US"}
                />
              )}




            </div>
        )}


        <div className="w-full flex flex-col justify-between items-center gap-2 mb-5">
   

          <div className="w-full flex flex-row gap-2 justify-end items-center">


          {/* right space */}
          {/* background transparent */}
          <select
            //className="p-2 text-sm bg-zinc-800 text-white rounded"


            className="p-2 text-sm bg-transparent text-zinc-800 rounded"

            onChange={(e) => {
              const lang = e.target.value;
              router.push(
                "/" + lang + "/" + params.center + "/center"
              );
            }}
          >
            <option
              value="en"
              selected={params.lang === "en"}
            >
              English(US)
            </option>
            <option
              value="ko"
              selected={params.lang === "ko"}
            >
              한국어(KR)
            </option>
            <option
              value="zh"
              selected={params.lang === "zh"}
            >
              中文(ZH)
            </option>
            <option
              value="ja"
              selected={params.lang === "ja"}
            >
              日本語(JP)
            </option>
          </select>

          {/* icon-language */}
          {/* color is tone down */}
          <Image
            src="/icon-language.png"
            alt="Language"
            width={20}
            height={20}
            className="rounded-lg w-6 h-6
              opacity-50
              "
          />

          </div>

        </div>


      </div>

    </main>


    );
  }





  // if store.adminWalletAddress is same as address, return "가맹점 관리자" else return "가맹점"
  // if user?.role is not "admin", return "가맹점"

  if (
    (address
    && store
    &&  address !== store.adminWalletAddress
    && user?.role !== "admin")
    

  ) {
    return (

      <div className={`w-full flex flex-row items-center justify-start gap-2
        p-2 rounded-lg mb-4
        ${store?.backgroundColor ?
          "bg-" + store.backgroundColor + " " :
          "bg-black/10"
        }`}>

        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src={store?.storeLogo || "/logo.png"}
            alt="logo"
            width={35}
            height={35}
            className="rounded-lg w-6 h-6"
          />
          <div className="text-sm text-[#3167b4] font-bold">
            {store?.storeName + " (" + store?.storecode + ") 가맹점 관리자가 아닙니다."}
          </div>
        </div>



        {/* 회원가입한후 가맹점 관리자 등록신청을 하세요 */}
        <div className="text-sm text-[#3167b4] font-bold">
          회원가입한후 센터에 문의하세요.
        </div>
        {/* 회원가입하러 가기 */}
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => {
              router.push('/' + params.lang + '/' + params.center + '/profile-settings');
            }}
            className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
          >
            회원가입하러 가기
          </button>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={() => {
            confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect()
            .then(() => {

                toast.success('로그아웃 되었습니다');

                //router.push(
                //    "/admin/" + params.center
                //);
            });
          } }

          className="flex items-center justify-center gap-2
            bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
        >
          <Image
            src="/icon-logout.webp"
            alt="Logout"
            width={20}
            height={20}
            className="rounded-lg w-5 h-5"
          />
          <span className="text-sm">
            로그아웃
          </span>
        </button>




      </div>
    );

  }






    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


        <div className="py-0 w-full">

          <div className={`w-full flex flex-col xl:flex-row items-center justify-between gap-2
            p-2 rounded-lg mb-4
            ${store?.backgroundColor ?
              "bg-" + store.backgroundColor + " " :
              "bg-black/10"
            }`}>
              
              
              <button
                onClick={() => {
                  router.push('/' + params.lang + '/' + params.center + '/center');
                }}
                className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
              >

                <div className="flex flex-row items-center gap-2">
                  <Image
                      src={store?.storeLogo || "/logo.png"}
                      alt="Store"
                      width={35}
                      height={35}
                      className="rounded-lg w-5 h-5"
                  />
                  <span className="text-sm text-zinc-50">
                    {
                      store && store?.storeName + " (" + store?.storecode + ")"
                    }
                  </span>

                </div>

              </button>


              <div className="flex flex-row items-center gap-2">
                

                <div className="w-full flex flex-row items-center justify-end gap-2">
                  {!address && (
                    <ConnectButton
                      client={client}
                      wallets={wallets}

                      /*
                      accountAbstraction={{
                        chain: arbitrum,
                        sponsorGas: true
                      }}
                      */
                      
                      theme={"light"}

                      // button color is dark skyblue convert (49, 103, 180) to hex
                      connectButton={{
                          style: {
                              backgroundColor: "#3167b4", // dark skyblue
                              color: "#f3f4f6", // gray-300
                              padding: "2px 10px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              width: "60x",
                              height: "38px",
                          },
                          label: "원클릭 로그인",
                      }}

                      connectModal={{
                        size: "wide", 
                        //size: "compact",
                        titleIcon: "https://www.stable.makeup/logo.png",                           
                        showThirdwebBranding: false,
                      }}

                      locale={"ko_KR"}
                      //locale={"en_US"}
                    />
                  )}
                </div>

            
                {address && !loadingUser && (
                    <div className="w-full flex flex-row items-center justify-end gap-2">

                      <button
                        onClick={() => {
                          router.push('/' + params.lang + '/' + params.center + '/profile-settings');
                        }}
                        className="
                        w-40
                        items-center justify-center
                        bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                      >
                        <div className="flex flex-col itmens-center justify-center gap-2">
                          <span className="text-sm text-zinc-50">
                            {user?.nickname || "프로필"}
                          </span>
                          {isAdmin && (
                            <div className="flex flex-row items-center justify-center gap-2">
                              <Image
                                src="/icon-admin.png"
                                alt="Admin"
                                width={20}
                                height={20}
                                className="rounded-lg w-5 h-5"
                              />
                              <span className="text-sm text-yellow-500">
                                가맹점 관리자
                              </span>
                            </div>
                          )}

                        </div>
                      </button>

                      {/* logout button */}
                      <button
                          onClick={() => {
                              confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect()
                              .then(() => {

                                  toast.success('로그아웃 되었습니다');

                                  //router.push(
                                  //    "/admin/" + params.center
                                  //);
                              });
                          } }

                          className="
                            w-32
                            flex items-center justify-center gap-2
                            bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                      >
                        <Image
                          src="/icon-logout.webp"
                          alt="Logout"
                          width={20}
                          height={20}
                          className="rounded-lg w-5 h-5"
                        />
                        <span className="text-sm">
                          로그아웃
                        </span>
                      </button>

                  </div>
                )}


              </div>


          </div>


          <div className="flex flex-col items-start justify-center gap-2">

            

            {/* USDT 가격 binance market price */}
            <div
              className="
              h-20
                w-full flex
                binance-widget-marquee
              flex-row items-center justify-center gap-2
              p-2
              "


              data-cmc-ids="1,1027,52,5426,3408,74,20947,5994,24478,13502,35336,825"
              data-theme="dark"
              data-transparent="true"
              data-locale="ko"
              data-fiat="KRW"
              //data-powered-by="Powered by OneClick USDT"
              //data-disclaimer="Disclaimer"
            ></div>


            <div className="w-full flex flex-col items-end justify-end gap-2
            border-b border-zinc-300 pb-2">

              {/* 가맹점 보유량 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-escrow.png"
                    alt="Escrow"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 보유
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      store?.escrowAmountUSDT
                      ? Number(store?.escrowAmountUSDT).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : 0
                    }
                  </span>
                </div>

              </div>


              {/* 가맹점 거래 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-trade.png"
                    alt="Trade"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 거래
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalUsdtAmount ? store?.totalUsdtAmount : 0)
                      .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-yellow-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalKrwAmount ? store?.totalKrwAmount : 0)
                      .toLocaleString('ko-KR')
                    }
                  </span>
                  <span className="text-sm text-zinc-500">
                    원
                  </span>
                </div>
              </div>




              {/* 가맹점 정산금 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-settlement.png"
                    alt="Settlement"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 정산
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalSettlementAmount ? store?.totalSettlementAmount : 0)
                      .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-yellow-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalSettlementAmountKRW ? store?.totalSettlementAmountKRW : 0)
                      .toLocaleString('ko-KR')
                    }
                  </span>
                  <span className="text-sm text-zinc-500">
                    원
                  </span>
                </div>
              </div>


              {/* 가맹점 판매금 */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-clearance.png"
                    alt="Clearance"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-zinc-500">
                    가맹점 판매
                  </span>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Image
                    src="/icon-tether.png"
                    alt="Tether"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg text-green-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalUsdtAmountClearance || 0)
                      .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                  </span>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg text-yellow-600 font-semibold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {
                      Number(store?.totalKrwAmountClearance || 0)
                      .toLocaleString('ko-KR')
                    }
                  </span>
                  <span className="text-sm text-zinc-500">
                    원
                  </span>
                </div>

                </div> 

            </div>



            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mb-4">



                <button
                    onClick={() => router.push('/' + params.lang + '/' + params.center + '/member')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    회원관리
                </button>

                <button
                    onClick={() => router.push('/' + params.lang + '/' + params.center + '/buyorder')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    구매주문관리
                </button>


                <div className='flex w-32 items-center justify-center gap-2
                  bg-yellow-500 text-[#3167b4] text-sm rounded-lg p-2'>
                    <Image
                      src="/icon-trade.png"
                      alt="Trade"
                      width={35}
                      height={35}
                      className="w-4 h-4"
                    />
                    <div className="text-sm font-semibold">
                      거래내역
                    </div>
                  </div>


                <button
                    onClick={() => router.push('/' + params.lang + '/' + params.center + '/clearance-history')}
                    className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                    hover:bg-[#3167b4]/80
                    hover:cursor-pointer
                    hover:scale-105
                    transition-transform duration-200 ease-in-out
                    ">
                    판매(거래소)
                </button>

                <button
                  onClick={() => router.push('/' + params.lang + '/' + params.center + '/clearance-request')}
                  className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                  hover:bg-[#3167b4]/80
                  hover:cursor-pointer
                  hover:scale-105
                  transition-transform duration-200 ease-in-out
                  ">
                    출금(회원)
                </button>     


            </div>








              <div className='flex flex-row items-center space-x-4'>
                  <Image
                    src="/icon-trade.png"
                    alt="Trade"
                    width={35}
                    height={35}
                    className="w-6 h-6"
                  />

                  <div className="text-xl font-semibold">
                    거래내역
                  </div>

                  
                  <Image
                    src="/loading.png"
                    alt="Loading"
                    width={35}
                    height={35}
                    className={`w-6 h-6 ${loadingBuyOrders ? 'animate-spin' : 'hidden'}`}
                  />

              </div>






              
              <div className="w-full flex flex-row items-center justify-end gap-2 mt-4">

                {/*
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">전체</div>
                  <div className="text-xl font-semibold text-zinc-500">
                    {totalCount}
                  </div>
                </div>
                */}


              </div>
              




              <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-3">



                {/* serach fromDate and toDate */}
                {/* DatePicker for fromDate and toDate */}
                <div className="flex flex-col xl:flex-row items-center gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/icon-calendar.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <input
                      type="date"
                      value={searchFromDate}
                      onChange={(e) => setSearchFormDate(e.target.value)}
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                    />
                  </div>

                  <span className="text-sm text-gray-500">~</span>

                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/icon-calendar.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <input
                      type="date"
                      value={searchToDate}
                      onChange={(e) => setSearchToDate(e.target.value)}
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                    />
                  </div>
                </div>


                {/* search depositName */}
                <div className="flex flex-col items-center gap-2">


                  <div className="flex flex-col xl:flex-row items-center justify-center gap-2">
                    {/* search nickname */}
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchBuyer}
                        onChange={(e) => setSearchBuyer(e.target.value)}
                        placeholder="회원 아이디"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchDepositName}
                        onChange={(e) => setSearchDepositName(e.target.value)}
                        placeholder="입금자명"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      />
                    </div>

                    {/* searchStoreBankAccountNumber */}
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchStoreBankAccountNumber}
                        onChange={(e) => setSearchStoreBankAccountNumber(e.target.value)}
                        placeholder="입금통장번호"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      /> 
                    </div>



                  


                    {/* 검색 버튼 */}
                    <div className="
                      w-28  
                      flex flex-row items-center gap-2">
                      <button
                        onClick={() => {
                          setPageValue(1);
                          
                          fetchBuyOrders();

                          getTradeSummary();
                        }}
                        //className="bg-[#3167b4] text-white px-4 py-2 rounded-lg w-full"
                        className={`${
                          fetchingBuyOrders ? 'bg-gray-400' : 'bg-[#3167b4]'
                        }
                        text-white px-4 py-2 rounded-lg w-full
                        hover:bg-[#3167b4]/80
                        hover:cursor-pointer
                        hover:scale-105
                        transition-transform duration-200 ease-in-out`}
                        title="검색"

                        disabled={fetchingBuyOrders}
                      >
                        <div className="flex flex-row items-center justify-between gap-2">
                          <Image
                            src="/icon-search.png"
                            alt="Search"
                            width={20}
                            height={20}
                            className="rounded-lg w-5 h-5"
                          />
                          <span className="text-sm">
                            {fetchingBuyOrders ? '검색중...' : '검색'}
                          </span>
                        </div>

                      </button>
                    </div>

                  </div>



                </div>




  

              </div>



              {/* trade summary */}

              <div className="flex flex-col xl:flex-row items-center justify-between gap-2
                w-full
                bg-zinc-100/50
                p-4 rounded-lg shadow-md
                ">

                <div className="w-full xl:w-1/3 flex flex-row items-center justify-between gap-2 pl-4 pr-4">
                  
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 거래수(건)</div>
                    <div className="text-xl font-semibold text-zinc-500">
                      {tradeSummary.totalCount?.toLocaleString()} 건
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 거래금액(원)</div>
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-xl font-semibold text-yellow-600"
                        style={{ fontFamily: 'monospace' }}
                      >
                      
                        {tradeSummary.totalKrwAmount?.toLocaleString()}
                      </span>
                      <span className="text-sm text-zinc-500">
                        원
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 거래량(USDT)</div>
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        src="/icon-tether.png"
                        alt="Tether"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-xl font-semibold text-green-600"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {Number(tradeSummary.totalUsdtAmount
                          ? tradeSummary.totalUsdtAmount
                          : 0
                        ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* divider */}
                <div className="hidden xl:block w-0.5 h-10 bg-zinc-300"></div>
                <div className="xl:hidden w-full h-0.5 bg-zinc-300"></div>

                <div className="w-full xl:w-1/2
                  flex flex-row items-center justify-between gap-2 pl-4 pr-4">

                  
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 정산수(건)</div>
                    <div className="text-xl font-semibold text-zinc-500">
                      {tradeSummary.totalSettlementCount?.toLocaleString()} 건
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 정산금액(원)</div>
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-xl font-semibold text-yellow-600"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {tradeSummary.totalSettlementAmountKRW?.toLocaleString()}
                      </span>
                      <span className="text-sm text-zinc-500">원</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 정산량(USDT)</div>
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        src="/icon-tether.png"
                        alt="Tether"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-xl font-semibold text-green-600"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {Number(tradeSummary.totalSettlementAmount
                          ? tradeSummary.totalSettlementAmount
                          : 0
                        ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 수수료금액(원)</div>
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-xl font-semibold text-yellow-600"
                        style={{ fontFamily: 'monospace' }}
                      >

                        {
                          (tradeSummary.totalFeeAmountKRW + tradeSummary.totalAgentFeeAmountKRW)
                          .toLocaleString()
                        }

                      </span>
                      <span className="text-sm text-zinc-500">원</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 수수료수량(USDT)</div>
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        src="/icon-tether.png"
                        alt="Tether"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-xl font-semibold text-green-600"
                        style={{ fontFamily: 'monospace' }}
                      >
                      {
                        (tradeSummary.totalFeeAmount + tradeSummary.totalAgentFeeAmount)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      </span>
                    </div>
                  </div>
                </div>


                {/* divider */}
                {/*}
                <div className="hidden xl:block w-0.5 h-10 bg-zinc-300"></div>
                <div className="xl:hidden w-full h-0.5 bg-zinc-300"></div>

                <div className="w-full xl:w-1/4 flex flex-row items-center justify-between gap-2 pl-4 pr-4">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 청산수(건)</div>
                    <div className="text-xl font-semibold text-zinc-500">
                      {tradeSummary.totalClearanceCount?.toLocaleString()} 건
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 청산금액(원)</div>
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-xl font-semibold text-yellow-600">
                        {tradeSummary.totalClearanceAmount?.toLocaleString()}
                      </span>
                      <span className="text-sm text-zinc-500">원</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="text-sm">총 청산수량(USDT)</div>
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        src="/icon-tether.png"
                        alt="Tether"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-xl font-semibold text-green-600">
                        {Number(tradeSummary.totalClearanceAmountUSDT
                          ? tradeSummary.totalClearanceAmountUSDT
                          : 0
                        ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </div>
                  </div>
                </div>
                */}
                
              </div>


              {/*
              getAllBuyOrders result {
                storecode: 'repruuqp',
                fromDate: '2025-07-26',
                toDate: '2025-07-26',
                orders: [
                  {
                    date: '2025-07-25', 날짜
                    storecode: 'repruuqp', 가맹점
                    totalUsdtAmount: 19339.14, 총 USDT 금액
                    totalKrwAmount: 26688000, 총 KRW 금액
                  },
                  {
                    date: '2025-07-26',
                    storecode: 'repruuqp',
                    totalUsdtAmount: 5877.05,
                    totalKrwAmount: 8110295
                  }
                ]
              }
                */}


              <div className="w-full overflow-x-auto">

                <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                  <thead className="bg-zinc-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">날짜</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">가맹점</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">총 거래건수(건)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">총 거래량(USDT)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">총 거래금액(원)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">총 정산량(USDT)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-600">총 정산금액(원)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyOrders.map((order, index) => (
                      <tr key={index} className="border-b border-zinc-300 hover:bg-zinc-100">
                        <td className="px-4 py-2 text-sm text-zinc-700">
                          {new Date(order.date).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-4 py-2 text-sm text-zinc-700">
                          {order.storecode}
                        </td>
                        <td className="px-4 py-2 text-sm text-zinc-700">
                          {order.totalCount ? order.totalCount.toLocaleString() : 0} 건
                        </td>
                        <td className="px-4 py-2 text-sm text-green-600 font-semibold"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalUsdtAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                        <td className="px-4 py-2 text-sm text-yellow-600 font-semibold"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalKrwAmount).toLocaleString('ko-KR')}
                        </td>
                        <td className="px-4 py-2 text-sm text-green-600 font-semibold"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalSettlementAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                        <td className="px-4 py-2 text-sm text-yellow-600 font-semibold"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {Number(order.totalSettlementAmountKRW).toLocaleString('ko-KR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-sm text-zinc-500">
                        
                      </td>
                    </tr>
                  </tfoot>
                </table>



              </div>


            


            </div>

        

            {/* pagination */}
            {/* url query string */}
            {/* 1 2 3 4 5 6 7 8 9 10 */}
            {/* ?limit=10&page=1 */}
            {/* submit button */}
            {/* totalPage = Math.ceil(totalCount / limit) */}
            <div className="mt-4 flex flex-row items-center justify-center gap-4">


              <div className="flex flex-row items-center gap-2">
                <select
                  value={limit}
                  onChange={(e) =>
                    
                    router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(e.target.value)}&page=${page}&wallet=${wallet}&searchMyOrders=${searchMyOrders}`)

                  }

                  className="text-sm bg-zinc-800 text-zinc-200 px-2 py-1 rounded-md"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* 처음 페이지로 이동 */}
              <button
                disabled={Number(page) <= 1}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) <= 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  
                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=1`);

                }
              }
              >
                처음
              </button> 


              <button
                disabled={Number(page) <= 1}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) <= 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  
                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=${Number(page) - 1}`);

                }}
              >
                이전
              </button>


              <span className="text-sm text-zinc-500">
                {page} / {Math.ceil(Number(totalCount) / Number(limit))}
              </span>


              <button
                disabled={Number(page) >= Math.ceil(Number(totalCount) / Number(limit))}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) >= Math.ceil(Number(totalCount) / Number(limit)) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  
                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=${Number(page) + 1}`);

                }}
              >
                다음
              </button>

              {/* 마지막 페이지로 이동 */}
              <button
                disabled={Number(page) >= Math.ceil(Number(totalCount) / Number(limit))}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) >= Math.ceil(Number(totalCount) / Number(limit)) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  
                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=${Math.ceil(Number(totalCount) / Number(limit))}`);

                }}
              >
                마지막
              </button>

            </div>


            
            <div className="w-full flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-md rounded-lg mt-5">
              <div className="text-sm text-zinc-600">
                © 2024 Stable Makeup. All rights reserved.
              </div>
              <div className="text-sm text-zinc-600">
                <a href={`/${params.lang}/terms-of-service`} className="text-blue-500 hover:underline">
                  이용약관
                </a>
                {' | '}
                <a href={`/${params.lang}/privacy-policy`} className="text-blue-500 hover:underline">
                  개인정보처리방침
                </a>
                {' | '}
                <a href={`/${params.lang}/contact`} className="text-blue-500 hover:underline">
                  고객센터
                </a>
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



