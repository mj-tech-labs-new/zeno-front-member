const Endpoints = {
  registerUser: 'auth/register',
  loginUser: 'auth/login',
  updateUser: 'users/update',
  getUser: 'users',
  candleHistory: (tokenName: string) => `candle/history/${tokenName}`,
  getChallengeType: '/users/challenge/getChallengeStage',
  getTradingCapital: (step: number) =>
    `/users/challenge/getChallengePlan?step=${step}`,
  createChallenge: '/users/challenge/createChallenge',
  getChallengeById: '/users/challenge',
  tradingStatistics: '/users/order/tradingStatistics',
  suppportedToken: 'candle/supportedToken',
  getChallengeInfoDashboard: (
    status: string,
    page: number,
    limit: number,
    totalCount: number
  ) =>
    `/users/getAllChallenge?status=${status}&page=${page}&limit=${limit}&totalCount=${totalCount}`,
  buyOrSell: '/users/order/placeOrder',
  getClosedPnlDetails: '/users/order/closedPositionHistory',
  closeOrder: '/users/order/closeOrder',
  deleteOrder: '/users/order/cancelOrder',
  forgotPassword: '/users/forgotPassword',
  setNewPassword: '/users/resetPassword',
  verifyOtp: '/auth/varifyUserRagisterOtpAndRegister',
  getCertificate: (type: string, page: number, limit: number) =>
    `users/certificates/getCertificates?type=${type}&page=${page}&limit=${limit}`,
  downloadCertificate: '/users/certificates/downloadCertificate',
  getBilling: (page: number, limit: number) =>
    `users/billing/getAllBill?page=${page}&limit=${limit}`,
  updateOrder: `/users/order/updateOrder`,
}

export default Endpoints
