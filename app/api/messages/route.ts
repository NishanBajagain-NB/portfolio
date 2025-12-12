import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getMessages, addMessage, deleteMessage } from '@/lib/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  if (!token) throw new Error('Unauthorized')
  try {
    jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

export async function GET(request: NextRequest) {
  try {
    verifyAuth(request)
    const messages = await getMessages()
    
    const response = NextResponse.json(messages)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Messages API GET error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ 
      error: 'Failed to fetch messages', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const newMessage = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: new Date().toISOString().split('T')[0],
      read: false
    }
    
    await addMessage(newMessage)
    
    const response = NextResponse.json({ success: true })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    
    return response
  } catch (error) {
    console.error('Messages API POST error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    verifyAuth(request)
    const messages = await request.json()
    
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    // Update messages in database
    const db = await require('@/lib/database').getDatabase()
    await db.collection('messages').deleteMany({})
    if (messages.length > 0) {
      await db.collection('messages').insertMany(messages)
    }
    
    const response = NextResponse.json({ success: true })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    
    return response
  } catch (error) {
    console.error('Messages API PUT error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update messages' }, { status: 500 })
  }
}
