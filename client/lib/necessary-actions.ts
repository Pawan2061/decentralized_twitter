"use server";
import { revalidatePath } from "next/cache";

export async function refreshPosts() {
  try {
    revalidatePath("/", "page");
    return { success: true };
  } catch (error) {
    console.error("Failed to refresh posts:", error);
    return { success: false };
  }
}
