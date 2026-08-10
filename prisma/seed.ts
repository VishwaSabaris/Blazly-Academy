import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'

// Use raw SQL for seeding to bypass Prisma 7 Early Access adapter issues
async function main() {
  console.log('Start seeding...')

  let databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    try {
      const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8')
      const match = envContent.match(/DATABASE_URL="([^"]+)"/)
      if (match && match[1]) {
        databaseUrl = match[1]
      }
    } catch (e) {
      // ignore
    }
  }

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Could not find it in .env.local')
  }

  const sql = neon(databaseUrl)

  const courses = [
    {
      id: 'course_1',
      slug: 'geo-foundations',
      title: 'GEO Foundations',
      description: 'Understand the core concepts of Generative Engine Optimization.',
      price: 0,
      published: true
    },
    {
      id: 'course_2',
      slug: 'geo-professional',
      title: 'GEO Professional',
      description: 'Advanced strategies for technical SEO and LLM optimization.',
      price: 199,
      published: false
    },
    {
      id: 'course_3',
      slug: 'platform-specialist',
      title: 'Blazly Platform Specialist',
      description: 'Master the Blazly video generation pipeline.',
      price: 0,
      published: true
    }
  ]

  for (const c of courses) {
    await sql`
      INSERT INTO "Course" (id, slug, title, description, price, published)
      VALUES (${c.id}, ${c.slug}, ${c.title}, ${c.description}, ${c.price}, ${c.published})
      ON CONFLICT (slug) DO UPDATE 
      SET title = ${c.title}, description = ${c.description}, price = ${c.price}, published = ${c.published}
    `
    console.log(`Upserted course: ${c.slug}`)
  }

  // Seed Modules and Lessons for GEO Foundations
  const modId1 = 'mod_geo_1'
  const modId2 = 'mod_geo_2'

  // Get the actual ID of the geo-foundations course since it might have been generated differently before
  const courseResult = await sql`SELECT id FROM "Course" WHERE slug = 'geo-foundations' LIMIT 1`
  if (!courseResult || courseResult.length === 0) {
    throw new Error('GEO Foundations course not found after upsert')
  }
  const realCourseId = courseResult[0].id

  await sql`
    INSERT INTO "Module" (id, "courseId", title, description, "order")
    VALUES (${modId1}, ${realCourseId}, 'Introduction to GEO', 'Learn the basics of AI Search', 1)
    ON CONFLICT (id) DO UPDATE SET title = 'Introduction to GEO', "order" = 1, "courseId" = ${realCourseId}
  `

  await sql`
    INSERT INTO "Module" (id, "courseId", title, description, "order")
    VALUES (${modId2}, ${realCourseId}, 'Core Strategies', 'Advanced tactics for LLMs', 2)
    ON CONFLICT (id) DO UPDATE SET title = 'Core Strategies', "order" = 2, "courseId" = ${realCourseId}
  `

  const lessons = [
    { id: 'les_1', moduleId: modId1, title: 'What is Generative Engine Optimization?', duration: '5:30', videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', isFreePreview: true, order: 1 },
    { id: 'les_2', moduleId: modId1, title: 'How AI Search differs from Traditional SEO', duration: '8:15', videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', isFreePreview: false, order: 2 },
    { id: 'les_3', moduleId: modId2, title: 'Optimizing for LLM Context Windows', duration: '12:00', videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', isFreePreview: false, order: 1 },
    { id: 'les_4', moduleId: modId2, title: 'Structuring Data for RAG', duration: '9:45', videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', isFreePreview: false, order: 2 }
  ]

  for (const l of lessons) {
    await sql`
      INSERT INTO "Lesson" (id, "moduleId", title, duration, "videoUrl", "isFreePreview", "order")
      VALUES (${l.id}, ${l.moduleId}, ${l.title}, ${l.duration}, ${l.videoUrl}, ${l.isFreePreview}, ${l.order})
      ON CONFLICT (id) DO UPDATE 
      SET title = ${l.title}, duration = ${l.duration}, "videoUrl" = ${l.videoUrl}, "isFreePreview" = ${l.isFreePreview}, "order" = ${l.order}
    `
  }

  console.log('Seeded Modules and Lessons.')
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
