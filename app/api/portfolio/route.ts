import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getPortfolioData, updatePortfolioData } from '@/lib/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  if (!token) throw new Error('Unauthorized')
  jwt.verify(token, JWT_SECRET)
}

export async function GET() {
  try {
    const data = await getPortfolioData()
    
    const response = NextResponse.json(data)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Portfolio API GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    verifyAuth(request)
    const data = await request.json()
    
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    await updatePortfolioData(data)
    
    const response = NextResponse.json({ success: true })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    
    return response
  } catch (error) {
    console.error('Portfolio API PUT error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 })
  }
}
