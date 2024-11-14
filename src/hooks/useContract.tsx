import Web3 from "web3";
import { contractAddress } from "../App";
import contractAbi from "../abi.json";

const useContract = () => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  return { contract };
};

export default useContract;
