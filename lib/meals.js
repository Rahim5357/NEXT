import fs from 'node:fs'
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { generateRandomString } from './generateRandomString';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error("And error occurred!")
    return db.prepare('SELECT * FROM meals').all();
}

export function getmeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const randomString = generateRandomString(4);
    const fileName = `${meal.slug}-${randomString}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        }
    });

    meal.image = `/images/${fileName}`;

    try {
        db.prepare(`
            INSERT INTO meals
            (title, summary, instructions, image, creator, creator_email, slug)
            VALUES (
                @title,
                @summary,
                @instructions,
                @image,
                @creator,
                @creator_email,
                @slug
            )
        `).run(meal);
        console.log('Meal saved successfully');
    } catch (error) {
        console.error('Error saving meal:', error.message);
    }
}