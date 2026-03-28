// 카카오톡으로 처방 코드 전송
// 카카오 채널 메시지 API 사용

export async function sendKakaoMessage({
  accessToken,
  code,
  typeName,
  concern,
}: {
  accessToken: string
  code: string
  typeName: string
  concern: string
}) {
  // 카카오 나에게 보내기 API (사용자 본인에게 전송)
  const message = {
    object_type: 'text',
    text: `🌿 마음처방전이 발급되었습니다\n\n당신의 유형: ${typeName}\n고민: ${concern}\n\n출력 코드: ${code}\n\n현장 스태프에게 위 코드를 알려주시면 처방전을 출력해 드립니다.\n\n2026 국제선명상대회`,
    link: {
      web_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?code=${code}`,
      mobile_web_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?code=${code}`,
    },
    button_title: '처방전 다시 보기',
  }

  try {
    const res = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({
        template_object: JSON.stringify(message),
      }),
    })
    const data = await res.json()
    return data.result_code === 0
  } catch (e) {
    console.error('Kakao message failed:', e)
    return false
  }
}
