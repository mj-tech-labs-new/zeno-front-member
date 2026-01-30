import dayjs from 'dayjs'
import html2pdf from 'html-to-pdf-js'
import {memo, useCallback} from 'react'
import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {DownLoadButtonProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const DownloadButton = (props: DownLoadButtonProps) => {
  const {
    singleLineContent = '',
    className = '',
    challenge_id,
    imageUrl,
    isApiType = false,
    data,
  } = props

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

            html2pdf().from(div).save(`cerificate_${res?.data?.certificate_id}`)
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
  }, [challenge_id])

  const downloadBill = useCallback(() => {
    if (!data) return
    const {challenge_fee, user_name, invoice_id} = data
    const div = document.createElement('div')
    div.innerHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Certificate</title>
  </head>
  <body>
    <table
      style="
        padding: 40px 0px 20px 0px;
        margin: 0 auto;
        width: calc(100% - 80px);
      "
    >
      <tbody>
        <tr>
          <td style="width: fit-content; display: flex; ali">
            <img
              src="https://zenotraders.com/assets/logo-Dywl1gc3.png"
              id="imgToRender"
              alt="Zeno Traders Logo"
              height="50"
              crossorigin="anonymous"
            
            />
          </td>
        </tr>

        <tr>
          <td style="padding-top: 40px">
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
          <th style="padding: 10px; border: 1px solid black">Product</th>
          <th style="padding: 10px; border: 1px solid black">Amount</th>
          <th style="padding: 10px; border: 1px solid black">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px; border: 1px solid black">Challenge</td>
          <td style="padding: 5px; border: 1px solid black">
            $${challenge_fee}
          </td>
          <td style="padding: 5px; border: 1px solid black; text-align: right">
            $${challenge_fee}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 5px; border: 1px solid black"></td>
          <td style="padding: 10px 5px; border: 1px solid black"></td>
          <td
            style="
              padding: 10px 5px;
              border: 1px solid black;
              text-align: right;
            "
          ></td>
        </tr>
        <tr>
          <td style="padding: 5px; border: 1px solid black; font-weight: bold">
            Total
          </td>
          <td style="padding: 5px; border: 1px solid black"></td>
          <td
            style="
              padding: 5px;
              border: 1px solid black;
              text-align: right;
              font-weight: bold;
            "
          >
            $${challenge_fee}
          </td>
        </tr>
        <tr>
          <td style = "padding-bottom: 10px"><strong>Bill To:</strong>${user_name}</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`

    const opt = {
      margin: 1,
      filename: 'document.pdf',
      image: {type: 'jpeg', quality: 0.98},
      html2canvas: {
        dpi: 192,
        letterRendering: true,
        useCORS: true,
      },
      jsPDF: {unit: 'in', format: 'letter', orientation: 'landscape'},
    }

    html2pdf().set(opt).from(div).save()
  }, [data])

  return (
    <button
      className={`text-secondary-light-color cursor-pointer  ${className}`}
      type="button"
      onClick={() => {
        if (isApiType) {
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
