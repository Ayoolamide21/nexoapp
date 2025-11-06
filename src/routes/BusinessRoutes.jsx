import CorporateSavings from "../pages/Business/CorporateSavings";
import { PaymentProcessing } from "../pages/Business/PaymentProcessing";
import { MerchantServices } from "../pages/Business/MerchantServices";
import { BusinessExchange } from "../pages/Business/BusinessExchange";
import { InvestmentPortfolios } from "../pages/Business/InvestmentPortfolio";
import Title from "../components/Title";
import { BusinessLoans } from "../pages/Business/BusinessLoans";
import { DedicatedSupport } from "../pages/Business/DedicatedSupport";

const BusinessRoutes = [
  {
    path: "/business/corporate-savings",
    element: (
      <>
        <Title page="Corporate Savings" />
        <CorporateSavings />
      </>
    ),
  },
  {
    path: "/business/payment-processing",
    element: (
      <>
        <Title page="Payment Processing" />
        <PaymentProcessing />
      </>
    ),
  },
  {
    path: "/business/merchant-services",
    element: (
      <>
        <Title page="Merchant Services" />
        <MerchantServices />
      </>
    ),
  },
  {
    path: "/business/exchange",
    element: (
      <>
        <Title page="Business Exchange" />
        <BusinessExchange />
      </>
    ),
  },
  {
    path: "/business/portfolio",
    element: (
      <>
        <Title page="Investment Portfolio" />
        <InvestmentPortfolios />
      </>
    ),
  },
{
    path: "/business/loans",
    element: (
      <>
        <Title page="Business Loans" />
        <BusinessLoans />
      </>
    ),
  },
  {
    path: "/business/support",
    element: (
      <>
        <Title page="Dedicated Support" />
        <DedicatedSupport/>
      </>
    ),
  },
];

export default BusinessRoutes;
