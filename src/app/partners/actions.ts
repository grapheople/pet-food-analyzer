"use server";

import bcrypt from "bcryptjs";
import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPartner(payload: {
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
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const { error } = await supabase
    .from("partners")
    .insert({ ...payload, password: hashedPassword });

  if (error) throw new Error(error.message);

  revalidatePath("/partners");
}

export async function updatePartner(
  id: number,
  payload: Record<string, unknown>,
) {
  const supabase = createAdminClient();

  // 패스워드가 포함되어 있으면 해싱
  if (payload.password && typeof payload.password === "string") {
    payload.password = await bcrypt.hash(payload.password, 12);
  }

  const { error } = await supabase
    .from("partners")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/partners/${id}`);
  revalidatePath("/partners");
}

export async function uploadPartnerImage(
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

export async function deletePartner(id: number) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/partners");
  redirect("/partners");
}
