import { useEffect, useState } from "react";
import useConnectAccount from "./useConnectAccount";
import useContract from "./useContract";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetsSlice";

const useGetTweets = () => {
  const [isGettingTweets, setIsGettingTweets] = useState(false);

  const { tweets } = useSelector(
    (state: { tweets: { tweets: [] } }) => state.tweets
  );

  const { contract } = useContract();
  const { connectedAccount } = useConnectAccount();

  const dispatch = useDispatch();

  useEffect(() => {
    getTweets();
  }, [connectedAccount]);

  const getTweets = async () => {
    setIsGettingTweets(true);

    try {
      const allTweets = await contract.methods
        .getAllTweets(connectedAccount)
        .call();
      dispatch(getAllTweets(allTweets));

      console.log(allTweets);
    } catch (error) {
      console.log(error);
    }
    setIsGettingTweets(false);
  };

  return { tweets, isGettingTweets, getTweets };
};

export default useGetTweets;
