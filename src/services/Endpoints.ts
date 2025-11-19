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
}

export default Endpoints
