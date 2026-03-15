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
} from "@/components/ui/dialog";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { updatePartner, deletePartner } from "../actions";
import { ImageUploader } from "../image-upload";
import type { Tables } from "@/lib/database.types";

type Partner = Tables<"partners">;

const CATEGORIES = ["동물미용", "동물병원", "동물호텔", "용품판매점"] as const;

export function PartnerActions({ id, data }: { id: number; data: Partner }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const existingUrls = (data.profile_image_urls as string[] | null) ?? [];
  const [imageUrls, setImageUrls] = useState<string[]>(existingUrls);

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData(e.currentTarget);
      const payload: Record<string, unknown> = {};

      for (const field of [
        "name", "email", "category", "country", "city",
        "address1", "address2", "phone", "instagram_url",
        "website_url", "description",
      ]) {
        const val = (fd.get(field) as string)?.trim();
        payload[field] = val || null;
      }

      const newPassword = (fd.get("password") as string)?.trim();
      if (newPassword) payload.password = newPassword;

      payload.profile_image_urls = imageUrls.length > 0 ? imageUrls : [];

      await updatePartner(id, payload);
      setEditOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deletePartner(id);
    } catch {
      alert("삭제에 실패했습니다.");
      setDeleting(false);
    }
  }

  function handleEditOpen() {
    setImageUrls(existingUrls);
    setEditOpen(true);
  }

  return (
    <div className="flex items-center gap-2 border-t pt-4">
      <Button size="sm" onClick={handleEditOpen}>
        <Pencil className="size-4" />
        수정
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
        <Trash2 className="size-4" />
        삭제
      </Button>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>파트너스 수정</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>이름</Label>
                <Input name="name" defaultValue={data.name} required />
              </div>
              <div>
                <Label>업종</Label>
                <select
                  name="category"
                  defaultValue={data.category}
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
                <Label>이메일</Label>
                <Input name="email" type="email" defaultValue={data.email} required />
              </div>
              <div>
                <Label>패스워드 (변경 시에만 입력)</Label>
                <Input name="password" type="password" placeholder="변경 없으면 빈칸" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>국가</Label>
                <Input name="country" defaultValue={data.country ?? ""} />
              </div>
              <div>
                <Label>도시</Label>
                <Input name="city" defaultValue={data.city ?? ""} />
              </div>
            </div>
            <div>
              <Label>주소1</Label>
              <Input name="address1" defaultValue={data.address1 ?? ""} />
            </div>
            <div>
              <Label>주소2</Label>
              <Input name="address2" defaultValue={data.address2 ?? ""} />
            </div>
            <div>
              <Label>대표전화번호</Label>
              <Input name="phone" defaultValue={data.phone ?? ""} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>인스타그램</Label>
                <Input name="instagram_url" defaultValue={data.instagram_url ?? ""} />
              </div>
              <div>
                <Label>웹주소</Label>
                <Input name="website_url" defaultValue={data.website_url ?? ""} />
              </div>
            </div>
            <ImageUploader
              initialUrls={existingUrls}
              onChange={setImageUrls}
              pathPrefix={`${id}`}
            />
            <div>
              <Label>소개말</Label>
              <Textarea name="description" defaultValue={data.description ?? ""} rows={3} />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "저장 중..." : "저장"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="파트너스 삭제"
        description="이 파트너스를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
