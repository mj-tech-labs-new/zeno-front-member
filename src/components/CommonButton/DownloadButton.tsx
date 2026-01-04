import html2pdf from 'html-to-pdf-js'
import {memo} from 'react'
import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {BuyOrSellApiProps} from '@/types/ChallengeTypes'
import {GeneralProps} from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const DownloadButton = (
  props: Pick<GeneralProps, 'singleLineContent'> &
    Pick<GeneralProps, 'className'> &
    Pick<BuyOrSellApiProps, 'challenge_id'> &
    Pick<GeneralProps, 'imageUrl'>
) => {
  const {singleLineContent = '', className = '', challenge_id, imageUrl} = props

  const downloadCertificateApi = async () => {
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
  }

  return (
    <button
      className={`text-secondary-light-color cursor-pointer  ${className}`}
      onClick={downloadCertificateApi}
      type="button"
    >
      {singleLineContent !== '' && singleLineContent}
      {imageUrl !== '' && (
        <ImageComponent className="h-6 w-6" imageUrl={imageUrl ?? ''} />
      )}
    </button>
  )
}

export default memo(DownloadButton)
