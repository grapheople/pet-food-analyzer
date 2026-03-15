"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createServiceProvider(payload: {
  email: string;
  name: string;
  password: string;
  category: string;
  country?: string | null;
  city?: string | null;
  address1?: string | null;
  address2?: string | null;
  phone?: string | null;
  instagram_url?: string | null;
  website_url?: string | null;
  description?: string | null;
  profile_image_urls?: string[] | null;
}) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("service_providers").insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath("/service-providers");
}

export async function updateServiceProvider(
  id: number,
  payload: Record<string, unknown>,
) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("service_providers")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/service-providers/${id}`);
  revalidatePath("/service-providers");
}

export async function uploadProviderImage(
  pathPrefix: string,
  base64: string,
): Promise<string> {
  const supabase = createAdminClient();
  const bucket = "service-provider-images";
  const filename = `${pathPrefix}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;

  const buffer = Buffer.from(base64, "base64");

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data.publicUrl;
}

export async function deleteServiceProvider(id: number) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("service_providers")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/service-providers");
  redirect("/service-providers");
}
