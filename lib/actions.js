"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text) => {
    return text.trim() === "" || !text
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }
    if (isInvalidText(meal.title) || isInvalidText(meal.name)) {
        return {
            message: 'Invalid input'
        }
    }


    await saveMeal(meal);
    // revalidatePath('/meals', 'layout');
    // revalidatePath('/ ', 'layout');
    revalidatePath('/meals');
    redirect('/meals')
}