import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'EXISTS (starts with ' + process.env.NEXT_PUBLIC_FIREBASE_API_KEY.slice(0, 5) + ')' : 'MISSING',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'MISSING',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'MISSING',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'MISSING',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'MISSING',
  })
}
