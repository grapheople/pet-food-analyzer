import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { ImagePreview } from "@/components/shared/image-preview";
import { PartnerActions } from "./client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PartnerDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("partners")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!data) notFound();

  const imageUrls = (data.profile_image_urls as string[] | null) ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/partners"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          목록
        </Link>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <Badge variant="outline">{data.category}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Row label="ID">{data.id}</Row>
        <Row label="이메일">{data.email}</Row>
        <Row label="업종"><Badge variant="outline">{data.category}</Badge></Row>
        <Row label="대표전화번호">{data.phone || "-"}</Row>
        <Row label="국가">{data.country || "-"}</Row>
        <Row label="도시">{data.city || "-"}</Row>
        <Row label="주소1">{data.address1 || "-"}</Row>
        <Row label="주소2">{data.address2 || "-"}</Row>
        <Row label="인스타그램">
          {data.instagram_url ? (
            <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
              {data.instagram_url}
            </a>
          ) : "-"}
        </Row>
        <Row label="웹주소">
          {data.website_url ? (
            <a href={data.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
              {data.website_url}
            </a>
          ) : "-"}
        </Row>
        <Row label="등록일">{formatDate(data.created_at)}</Row>
        <Row label="수정일">{formatDate(data.updated_at)}</Row>
      </div>

      {data.description && (
        <div>
          <dt className="text-sm font-medium text-muted-foreground">소개말</dt>
          <dd className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
            {data.description}
          </dd>
        </div>
      )}

      {imageUrls.length > 0 && (
        <div>
          <dt className="text-sm font-medium text-muted-foreground mb-2">프로필 이미지</dt>
          <dd className="flex flex-wrap gap-2">
            {imageUrls.map((url, i) => (
              <ImagePreview key={i} src={url} size={120} />
            ))}
          </dd>
        </div>
      )}

      <PartnerActions id={data.id} data={data} />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm">{children}</dd>
    </div>
  );
}
