import dayjs from 'dayjs'
import {jsPDF} from 'jspdf'
import {memo, useCallback, useMemo} from 'react'
import {toast} from 'react-toastify'

import {Images} from '@/helpers'
import {APICall, CommonFunction, Endpoints} from '@/services'
import {DownLoadButtonProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const DownloadButton = (props: DownLoadButtonProps) => {
  const {
    singleLineContent = '',
    className = '',
    challenge_id,
    imageUrl,
    isApiType = true,
    data,
  } = props
  const imgRender = useMemo(() => Images.billingLogo, [])

  const docElement = useMemo(
    () =>
      // eslint-disable-next-line new-cap
      new jsPDF('p', 'pt', [800, 800]),
    []
  )

  const downloadCertificateApi = useCallback(async () => {
    const payload = {challenge_id}

    return new Promise<any>((resolve) => {
      APICall('post', Endpoints.downloadCertificate, payload)
        .then((res: any) => {
          if (res?.status === 200 && res?.statusCode === 200) {
            resolve(res.data)
            const div = document.createElement('div')
            div.innerHTML = `<!doctype html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Certificate</title>
          <style>
            body {
              font-family: 'Arial';
              text-align: center;
              padding: 40px;
              position: relative;
            }
      
            .cert-id {
              position: absolute;
              top: 30px;
              right: 40px;
              font-size: 14px;
              color: #444;
              font-weight: bold;
            }
      
            .title {
              font-size: 28px;
              font-weight: bold;
              margin-top: 60px;
            }
      
            .name {
              font-size: 34px;
              font-weight: bold;
              color: #222;
              margin-top: 40px;
            }
      
            .challenge {
              font-size: 22px;
              margin-top: 10px;
            }
      
            .footer {
              margin-top: 100px;
              display: flex;
              justify-content: space-around;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="cert-id">Certificate ID: ${res?.data?.certificate_id}</div>
      
          <div class="title">Certificate of Achievement</div>
      
          <p>This certificate is proudly presented to</p>
      
          <div class="name">${res?.data?.user_name}</div>
      
          <p>For successfully completing the challenge:</p>
      
          <div class="challenge">${res?.data?.challenge_name}</div>
      
          <div class="footer">
            <div style="padding-bottom: 10px;" >
              <hr style="width: 150px" />
              Authorized Sign
            </div>
            <div style="padding-bottom: 10px;">
              <hr style="width: 150px" />
              ${res?.data?.date}
            </div>
          </div>
        </body>
      </html>
       `

            docElement.html(div)
            docElement.save(`cerificate_${res?.data?.certificate_id}`)
          } else {
            toast.error(res?.message)
            resolve(null)
          }
        })
        .catch((error) => {
          toast.error(error?.data?.message)
          resolve(null)
        })
    })
  }, [challenge_id, docElement])

  const downloadBill = useCallback(async () => {
    if (!data) return

    const {challenge_fee, user_name, invoice_id} = data
    const rawBase64 = await CommonFunction.getBase64FromUrl(imgRender)

    const logoBase64 = rawBase64.startsWith('data:')
      ? rawBase64
      : `data:image/png;base64,${rawBase64}`

    const div = document.createElement('div')
    div.innerHTML = `<!DOCTYPE html>
<html>
<style>
*:{
padding:0;
margin: 0;
box-sizing:border-box;
}
</style>
  <head>
    <meta charset="UTF-8" />
    <title>Certificate</title>
  </head>
  <body style = "width:100%; height:100;">
    <table
      style="
        padding: 40px 0px 20px 0px;
        margin: 0 auto;
        width: calc(100% - 80px);
        table-layout: auto;
      "
    >
      <tbody>
        <tr align="left">
          <td style="width: fit-content; display: flex; text-align:left;">
             <img src="${logoBase64}" id="imgToRender" alt="Logo" style="height:40px" crossOrigin='anonymous' />
          </td>
        </tr>

        <tr>
          <td style="padding-top: 20px">
            <span> <strong>Invoice: </strong></span> <span>${invoice_id}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 20px;"><strong><span>Date: </strong></span> <span>${dayjs().format('MM/DD/YYYY')}</span></td>
        </tr>
      </tbody>
    </table>

     <table
      style="
        margin: 0 auto;
        width: calc(100% - 80px);
        table-layout: auto;
        border-collapse: collapse;
      "
    >
      <thead style="background: rgba(117, 113, 113, 0.373)">
        <tr>
        <td style="padding-top:0 padding-bottom:5px; padding-left:5px; font-weight: bold; margin: auto auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; border: 1px solid  black">Challenge</td>
        <td style="padding-top:0 padding-bottom:5px; padding-left:5px; font-weight: bold; margin: auto auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; border: 1px solid black">Amount</td>
        <td style="padding-top:0 padding-bottom:5px; padding-left:5px; font-weight: bold; margin: auto auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; border: 1px solid black">Total</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="height: 20px; margin: auto auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; border: 1px solid black">Challenge</td>
          <td style="height: 20px; margin: auto auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; border: 1px solid black">
            $${challenge_fee}
          </td>
          <td style="height: 20px; margin: auto auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; border: 1px solid black; text-align: right">
            $${challenge_fee}
          </td>
        </tr>
        <tr>
          <td style="height: 20px; border: 1px solid black"></td>
          <td style="height: 20px; border: 1px solid black"></td>
          <td
            style="
              height: 20px;
              border: 1px solid black;
              text-align: right;
            "
          ></td>
        </tr>
        <tr>
          <td style="height: 20px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; border: 1px solid black; font-weight: bold">
            Total
          </td>
          <td style="height: 20px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; border: 1px solid black"></td>
          <td
            style="
              height: 20px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; border: 1px solid black;
              text-align: right;
              font-weight: bold;
            "
          >
            $${challenge_fee}
          </td>
        </tr>
        <tr>
          <td style = "padding-bottom: 10px"><strong>Bill To : </strong>${user_name}</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`
    docElement.allowFsRead = ['./fonts/*', './logo.svg']

    docElement.html(div, {
      x: 20,
      y: 20,
      width: 800,
      windowWidth: 800,
      callback: (doc) => doc.save('document.pdf'),
    })
  }, [data, docElement, imgRender])

  return (
    <button
      className={`text-secondary-light-color cursor-pointer  ${className}`}
      type="button"
      onClick={() => {
        if (!isApiType) {
          downloadBill()
          return
        }
        downloadCertificateApi()
      }}
    >
      {singleLineContent !== '' && singleLineContent}
      {imageUrl !== '' && (
        <ImageComponent className="h-6 w-6" imageUrl={imageUrl ?? ''} />
      )}
    </button>
  )
}

export default memo(DownloadButton)
