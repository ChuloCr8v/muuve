import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTweet } from "../redux/tweetsSlice";
import useConnectAccount from "./useConnectAccount";
import useContract from "./useContract";

const useAddTweet = () => {
  const [tweet, setTweet] = useState("");
  const [addingTweet, setAddingTweet] = useState(false);

  const { contract } = useContract();
  const { connectedAccount } = useConnectAccount();

  const dispatch = useDispatch();

  const addTweet = async () => {
    setAddingTweet(true);
    try {
      const newTweet = await contract.methods
        .addTweet(tweet)
        .send({ from: connectedAccount });

      dispatch(addNewTweet(newTweet));
      setTweet("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setAddingTweet(false);
  };

  return { addTweet, tweet, addingTweet, setTweet };
};

export default useAddTweet;
