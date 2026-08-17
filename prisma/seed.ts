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
  // Get the actual ID of the geo-foundations course since it might have been generated differently before
  const courseResult = await sql`SELECT id FROM "Course" WHERE slug = 'geo-foundations' LIMIT 1`
  if (!courseResult || courseResult.length === 0) {
    throw new Error('GEO Foundations course not found after upsert')
  }
  const realCourseId = courseResult[0].id

  const seedModules = [
    { id: 'mod_geo_1', title: 'Search is Changing', description: 'Understand how search behavior is shifting in the AI era.', order: 1 },
    { id: 'mod_geo_2', title: 'Understanding AI Search', description: 'Deep dive into retrieval systems and synthesis engines.', order: 2 },
    { id: 'mod_geo_3', title: 'Introduction to GEO', description: 'Learn the core concepts of Generative Engine Optimization.', order: 3 },
    { id: 'mod_geo_4', title: 'Content for AI', description: 'How to structure and optimize content for LLM ingestion.', order: 4 },
    { id: 'mod_geo_5', title: 'Building Digital Authority', description: 'Establishing trustworthiness and credibility for LLMs.', order: 5 },
    { id: 'mod_geo_6', title: 'Future of Search', description: 'Preparing for the future of agentic and conversational engines.', order: 6 }
  ]

  for (const m of seedModules) {
    await sql`
      INSERT INTO "Module" (id, "courseId", title, description, "order")
      VALUES (${m.id}, ${realCourseId}, ${m.title}, ${m.description}, ${m.order})
      ON CONFLICT (id) DO UPDATE SET title = ${m.title}, description = ${m.description}, "order" = ${m.order}, "courseId" = ${realCourseId}
    `
  }

  const lessons = [
    { id: 'les_geo_1', moduleId: 'mod_geo_1', title: 'Video Lecture', duration: '4:32', videoUrl: 'https://drive.google.com/file/d/1_VTrIC-wVfqiVhKzfkSGjAeY7aC4Or_F/preview', isFreePreview: true, order: 1 },
    { id: 'les_geo_2', moduleId: 'mod_geo_2', title: 'Video Lecture', duration: '4:13', videoUrl: 'https://drive.google.com/file/d/1NRGxDCPMrOQ_aWqx0Df2g4uXXIhDiClq/preview', isFreePreview: false, order: 1 },
    { id: 'les_geo_3', moduleId: 'mod_geo_3', title: 'Video Lecture', duration: '6:59', videoUrl: 'https://drive.google.com/file/d/1IEYgPWX5JRfteDcHbPH99w4J9KJV4CyF/preview', isFreePreview: false, order: 1 },
    { id: 'les_geo_4', moduleId: 'mod_geo_4', title: 'Video Lecture', duration: '4:19', videoUrl: 'https://drive.google.com/file/d/1NczIAUKxLxVIatQ89oNnvH3f18AjhjwK/preview', isFreePreview: false, order: 1 },
    { id: 'les_geo_5', moduleId: 'mod_geo_5', title: 'Video Lecture', duration: '3:33', videoUrl: 'https://drive.google.com/file/d/1ozxqAXJut3RtgaIg7I84pOABtwLCTRPF/preview', isFreePreview: false, order: 1 },
    { id: 'les_geo_6', moduleId: 'mod_geo_6', title: 'Video Lecture', duration: '2:45', videoUrl: 'https://drive.google.com/file/d/1yQ_2WMY99LUAA38LS-2fE50sU1RgAH1s/preview', isFreePreview: false, order: 1 }
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
