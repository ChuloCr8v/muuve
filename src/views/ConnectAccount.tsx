import { Button } from "antd";
import useConnectAccount from "../hooks/useConnectAccount";

const ConnectAccount = () => {
  const { connectedAccount, connectingAccount, handleConnectAccount } =
    useConnectAccount();

  if (connectedAccount) {
    return;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/not-connected.png" alt="connect account" className="mb-2" />
      <p className="text-gray-400">
        <span className="block text-center text-teal-500 font-semibold text-xl">
          Not Connected.
        </span>{" "}
        Click on the button below to connect your account.
      </p>
      <Button
        loading={connectingAccount}
        className="mt-4 bg-teal-500 border-none hover:!bg-teal-700 text-black hover:!text-white font-semibold"
        onClick={handleConnectAccount}
      >
        Connect Account
      </Button>
    </div>
  );
};

export default ConnectAccount;
