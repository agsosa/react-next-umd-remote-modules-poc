import _Header from "./Header";
import _Fulfilment from "./Fulfilment";
import _FulfilmentDetails from "./FulfilmentDetails";
import withProviders from "./withProviders";

const Header = withProviders(_Header);
const Fulfilment = withProviders(_Fulfilment);
const FulfilmentDetails = withProviders(_FulfilmentDetails);

export { Header, Fulfilment, FulfilmentDetails };
