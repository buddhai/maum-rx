import type { NextApiRequest, NextApiResponse } from 'next'

// 카카오 OAuth 콜백 처리
// 1. code로 access_token 교환
// 2. access_token으로 사용자 정보 조회
// 3. 세션 쿠키 설정 후 /quiz로 리다이렉트

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state, error } = req.query

  if (error) {
    // If there is an error but we have state (came from quiz), still return to saving to generate anonymous rx
    if (state) {
       return res.redirect(`/saving?state=${encodeURIComponent(state as string)}`)
    }
    return res.redirect('/?error=kakao_denied')
  }

  try {
    // Step 1: access_token 교환
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:   'authorization_code',
        client_id:    process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakao/callback`,
        code: code as string,
      }),
    })
    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      throw new Error('Token exchange failed')
    }

    // Step 2: 사용자 정보 조회
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const userData = await userRes.json()

    const kakaoId   = String(userData.id)
    const kakaoName = userData.kakao_account?.profile?.nickname || '익명'

    // If state exists (Redirected from Quiz Step 3)
    if (state && typeof state === 'string') {
      try {
        const decodedState = JSON.parse(decodeURIComponent(state))
        decodedState.k_id = kakaoId
        decodedState.k_name = kakaoName
        const finalState = encodeURIComponent(JSON.stringify(decodedState))
        return res.redirect(`/saving?state=${finalState}`)
      } catch (e) {
        console.error('Failed to parse state:', e)
        return res.redirect(`/saving?state=${encodeURIComponent(state)}`)
      }
    }

    // Step 3: 세션 쿠키 설정 (간단하게 base64 인코딩) - 기존 로직 (랜딩 로그인용)
    const sessionData = Buffer.from(JSON.stringify({ kakaoId, kakaoName })).toString('base64')

    res.setHeader('Set-Cookie', [
      `rx_session=${sessionData}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`,
    ])

    return res.redirect('/quiz')

  } catch (e) {
    console.error('Kakao callback error:', e)
    return res.redirect('/?error=auth_failed')
  }
}
