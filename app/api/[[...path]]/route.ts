import { NextResponse } from 'next/server'
import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null

async function getDb(): Promise<Db> {
  if (!client) {
    if (!process.env.MONGO_URL) {
      throw new Error('Missing environment variable: MONGO_URL')
    }
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
  }
  return client.db(process.env.DB_NAME || 'portfolio')
}

interface RouteParams {
  params: Promise<{
    path?: string[]
  }>
}

interface ContactRequestBody {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request, { params }: RouteParams): Promise<NextResponse> {
  try {
    const resolvedParams = await params
    const path = (resolvedParams?.path || []).join('/')
    const body = (await request.json().catch(() => ({}))) as ContactRequestBody

    if (path === 'contact') {
      const { name, email, message } = body
      if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
      }
      
      const db = await getDb()
      const doc = {
        id: crypto.randomUUID(),
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      }
      
      await db.collection('messages').insertOne(doc)
      return NextResponse.json({ success: true, id: doc.id })
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: RouteParams): Promise<NextResponse> {
  try {
    const resolvedParams = await params
    const path = (resolvedParams?.path || []).join('/')
    
    if (path === 'health') {
      return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() })
    }
    return NextResponse.json({ message: 'Portfolio API' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
