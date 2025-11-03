export default {
  baseUrl: "https://nuba.bn-kw.com",
  branch_code: "16",

  //=========== GENERAL ===========
  topMeals: "/api/getTopMealsH",
  topSubscriptions: "/api/getTopSubscription",
  slider_home: "/api/all_ads/",
  governments: "/api/address/getAreas",
  deliveryTimes: "/api/address/deliveryTimes",

  //===========  LOGIN  ==========
  userPersonlInfo: "/api/register/signupGetUserPersonlInfo",
  login: "/api/auth/login",

  //===========  FORGOT PASSWORD  ==========
  sendSmsOtp: "/api/sendSmsOtp",
  verifyResetOtpCode: "/api/auth/verifyResetOtpCode",
  resetPassword: "/api/auth/resetPassword",

  //===========  REGISTER  ==========
  userPersonlInfo2: "/api/register/signupGetUserPersonlInfo",
  sendSmsOtp2: "/api/sendSmsOtp",
  signupAddPersonalData: "/api/register/signupAddPersonalData",

  //===========  DELETE ACCOUNT  ==========
  deleteAccount: "/api/auth/deleteAccount",

  //============ ADDRESSES ===============
  myAddresses: "/api/address/getAdresses",
  addAddress: "api/address/addAddress",
  editAddress: "/api/address/editAddress",
  deleteAddress: "/api/address/deleteAddress",

  //============ SUBSCRIPTION ===============
  dietTypes: "/api/register/getDietDetails",
  subscriptionDetails: "/api/package/subscriptionDetails",
  subscribtionStartDates: "/api/register/getSubscribtionStartDates",
  addDietDetails: "/api/register/addDietDetails",
  availablePackagesAll: "/api/register/getAvailablePackagesAll",
  addPromoCode: "/api/register/addPromoCode",
  addCustomerPackage: "/api/register/addCustomerPackage",
  paymentStatus: "/api/paymentStatus",
  calenderDetails: "/api/package/calenderDetails",
  pauseMeal: "/api/meal/pauseMeal",
  unpauseMeal: "/api/meal/unpauseMeal",
  mealsListByDate: "/api/meal/getMealsListByDate",
  setMeals: "/api/meal/setMeals",
  //
  //
  //
  //
  //
  //===========  REGISTER  ==========
  signUp: "",
  forgetPassword: "",
  verificationCode: "",
  newPassword: "",
  completeAccount: "",

  requestOtp: `auth/request-otp`,
  registerAccount: `auth/register`,
  verifyOtpLogin: `auth/otp`,

  cities: "cities",
  mobileVersions: "mobile-versions",

  services_providers: "service_provider_types",
  appointmentsPending: "appointments/pending-appointments",
  appointmentsRequest: "appointments/hold-requests",
  appointmentsUpcoming: `appointments/upcoming`,
  appointmentsIncoming: `appointments/pervious`,
  appointmentsCanceled: "appointments/cancelled",
  serviceFeatured: "service_providers/featured",
  offers: "offers",
  packages: "bundles",
  allCenters: `service_providers`,
  services: `services`,
  serviceDetail: `services/`,
  products: "products",
  productDetail: `products/`,
  notifications: "notifications",
  reviews: "reviews",
  minimumConvertPoints: "points/minimum-points-to-convert",
  convertPoints: "points/convert-to-wallet-balance",
  profile_data: "profiles",
  profile_update: "users",
  branchesByMap: "service_providers/nearby",
  favorites: "favorites",
  stories: "stories",
  booking: "appointments",
  coupons: "coupons",
  appointment: `appointments`,
  serviceBookings: "service-bookings",

  cart: "carts",
  cartTotal: "carts/calculate-total",
  checkout: "carts/checkout",

  ordersUpcoming: "product-orders/upcoming",
  ordersPervious: "product-orders/pervious",
  ordersCanceled: "product-orders/cancelled",
  orderDetails: "product-orders/",

  topRatedCenters: `service_providers/highest-rated`,
  nearbyCenters: `service_providers/nearby`,
  branches: `branches`,
  branchServices: `services/service-provider/`,
  employees: `employees`,

  payment: `payments`,
  employeeTime: "employees/",
  defaultImage:
    "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800",
  toUp: "wallets/payments/top-up",
  help: "support-tickets",
  paymentCheck: "payments/tap/payment/check",
  fav: "favorites",

  rate: "reviews",
  address: "address-books",
  transactions: "transactions",
}
