"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { createPartner } from "./actions";
import { ImageUploader } from "./image-upload";

const CATEGORIES = ["동물미용", "동물병원", "동물호텔", "용품판매점"] as const;

export function CreatePartnerDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData(e.currentTarget);
      await createPartner({
        email: (fd.get("email") as string).trim(),
        name: (fd.get("name") as string).trim(),
        password: (fd.get("password") as string).trim(),
        category: fd.get("category") as string,
        country: (fd.get("country") as string).trim() || null,
        city: (fd.get("city") as string).trim() || null,
        address1: (fd.get("address1") as string).trim() || null,
        address2: (fd.get("address2") as string).trim() || null,
        phone: (fd.get("phone") as string).trim() || null,
        instagram_url: (fd.get("instagram_url") as string).trim() || null,
        website_url: (fd.get("website_url") as string).trim() || null,
        description: (fd.get("description") as string).trim() || null,
        profile_image_urls: imageUrls.length > 0 ? imageUrls : null,
      });
      setOpen(false);
      setImageUrls([]);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setImageUrls([]);
      setError("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" />
          파트너스 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>파트너스 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sp_name">이름 *</Label>
              <Input id="sp_name" name="name" required />
            </div>
            <div>
              <Label htmlFor="sp_category">업종 *</Label>
              <select
                id="sp_category"
                name="category"
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sp_email">이메일 *</Label>
              <Input id="sp_email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="sp_password">패스워드 *</Label>
              <Input id="sp_password" name="password" type="password" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sp_country">국가</Label>
              <Input id="sp_country" name="country" placeholder="KR" />
            </div>
            <div>
              <Label htmlFor="sp_city">도시</Label>
              <Input id="sp_city" name="city" />
            </div>
          </div>
          <div>
            <Label htmlFor="sp_address1">주소1</Label>
            <Input id="sp_address1" name="address1" />
          </div>
          <div>
            <Label htmlFor="sp_address2">주소2</Label>
            <Input id="sp_address2" name="address2" />
          </div>
          <div>
            <Label htmlFor="sp_phone">대표전화번호</Label>
            <Input id="sp_phone" name="phone" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sp_instagram">인스타그램</Label>
              <Input id="sp_instagram" name="instagram_url" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <Label htmlFor="sp_website">웹주소</Label>
              <Input id="sp_website" name="website_url" placeholder="https://..." />
            </div>
          </div>
          <ImageUploader
            onChange={setImageUrls}
            pathPrefix={`new-${Date.now()}`}
          />
          <div>
            <Label htmlFor="sp_description">소개말</Label>
            <Textarea id="sp_description" name="description" rows={3} />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "등록 중..." : "등록"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
