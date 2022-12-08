import Connect from "../components/Connect";
import Transact from "~/components/Transact";

export default function home() {
  return (
    <div>
      <h2>@txnlab/use-wallet remix example</h2>
      <hr />
      <Connect />
      <hr />
      <Transact />
    </div>
  );
}
