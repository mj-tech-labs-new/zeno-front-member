// const getClosedPnlData = useCallback(
//   (
//     challenge_id: string,
//     page: number,
//     fromDate: string,
//     toDate: string,
//     order_type: string,
//     order_value: string
//   ) => {
//     getClosedPnlDetails({
//       challenge_id,
//       page,
//       fromDate,
//       toDate,
//       order_type,
//       order_value,
//     }).then((data) => {
//       if (!data) return
//       setClosedPNL(data.data)
//       setPaginationData(data?.page)
//     })
//   },
//   []
// )
