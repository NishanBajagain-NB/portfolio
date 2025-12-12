import clientPromise from './mongodb'

const DB_NAME = 'portfolio'

export async function getDatabase() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

export async function getPortfolioData() {
  const db = await getDatabase()
  const portfolio = await db.collection('portfolio').findOne({})
  
  if (!portfolio) {
    const defaultData = {
      personal: {
        name: "Nishan Bajagain",
        roles: ["Software Developer", "Software Engineer", "UX/UI Designer"],
        bio: "Passionate software developer with expertise in building modern web applications.",
        email: "nishan.nb.nis@gmail.com",
        phone: "+977 9768980979",
        location: "Kathmandu, Nepal",
        cvUrl: "/cv.pdf",
        avatar: "/profile.png",
        social: {
          github: "https://github.com/nishanbajagain",
          linkedin: "https://linkedin.com/in/nishanbajagain",
          facebook: "https://facebook.com/nishanbajagain",
          twitter: "https://twitter.com/nishanbajagain"
        }
      },
      stats: { yearsExperience: 0, projectsCompleted: 0, technologiesUsed: 0 },
      skills: [],
      experience: [],
      education: [],
      projects: []
    }
    await db.collection('portfolio').insertOne(defaultData)
    return defaultData
  }
  
  const { _id, ...data } = portfolio
  return data
}

export async function updatePortfolioData(data: any) {
  const db = await getDatabase()
  await db.collection('portfolio').replaceOne({}, data, { upsert: true })
}

export async function getMessages() {
  const db = await getDatabase()
  const messages = await db.collection('messages').find({}).toArray()
  return messages.map(({ _id, ...msg }) => ({ id: _id.toString(), ...msg }))
}

export async function addMessage(message: any) {
  const db = await getDatabase()
  const result = await db.collection('messages').insertOne({
    ...message,
    timestamp: new Date().toISOString()
  })
  return result.insertedId.toString()
}

export async function deleteMessage(id: string) {
  const db = await getDatabase()
  const { ObjectId } = require('mongodb')
  await db.collection('messages').deleteOne({ _id: new ObjectId(id) })
}

export async function getAdminData() {
  const db = await getDatabase()
  const admin = await db.collection('admin').findOne({})
  
  if (!admin) {
    const bcrypt = require('bcryptjs')
    const defaultAdmin = {
      email: 'admin@portfolio.com',
      password: await bcrypt.hash('admin123', 10)
    }
    await db.collection('admin').insertOne(defaultAdmin)
    return defaultAdmin
  }
  
  const { _id, ...data } = admin
  return data
}

export async function updateAdminData(data: any) {
  const db = await getDatabase()
  await db.collection('admin').replaceOne({}, data, { upsert: true })
}
