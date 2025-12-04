import html2pdf from 'html-to-pdf-js'
import {memo, useCallback} from 'react'
import {toast} from 'react-toastify'

import {downloadCertificateApi} from '@/pages/ChallengeDashboard/api/ChallengeDashboardApi'
import {BuyOrSellApiProps} from '@/types/ChallengeTypes'
import {GeneralProps} from '@/types/CommonTypes'

const DownloadButton = (
  props: Required<Pick<GeneralProps, 'singleLineContent'>> &
    Pick<GeneralProps, 'className'> &
    Pick<BuyOrSellApiProps, 'challenge_id'>
) => {
  const {singleLineContent, className = '', challenge_id} = props

  const handleDownloadData = useCallback(() => {
    const payload = {challenge_id}

    downloadCertificateApi(payload)
      .then((res) => {
        if (res) {
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
        <div class="cert-id">Certificate ID: ${res?.certificate_id}</div>
    
        <div class="title">Certificate of Achievement</div>
    
        <p>This certificate is proudly presented to</p>
    
        <div class="name">${res?.user_name}</div>
    
        <p>For successfully completing the challenge:</p>
    
        <div class="challenge">${res?.challenge_name}</div>
    
        <div class="footer">
          <div style="padding-bottom: 10px;" >
            <hr style="width: 150px" />
            Authorized Sign
          </div>
          <div style="padding-bottom: 10px;">
            <hr style="width: 150px" />
            ${res?.date}
          </div>
        </div>
      </body>
    </html>
     `

          html2pdf().from(div).save(`cerificate_${res?.certificate_id}`)
        }
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }, [challenge_id])

  return (
    <button
      className={`text-secondary-light-color cursor-pointer ${className}`}
      onClick={handleDownloadData}
      type="button"
    >
      {singleLineContent}
    </button>
  )
}

export default memo(DownloadButton)
