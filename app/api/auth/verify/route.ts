import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
    return NextResponse.json({ authenticated: true, user: { email: decoded.email } })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
