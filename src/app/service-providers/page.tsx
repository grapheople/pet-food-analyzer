import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import { PAGE_SIZE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/lib/database.types";
import { CreateProviderDialog } from "./create-dialog";

type ServiceProvider = Tables<"service_providers">;

interface Props {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}

const CATEGORIES = ["동물미용", "동물병원", "동물호텔", "용품판매점"] as const;

export default async function ServiceProvidersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const q = params.q ?? "";
  const category = params.category ?? "";

  const supabase = createAdminClient();
  let query = supabase
    .from("service_providers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  if (category) query = query.eq("category", category);

  const { data, count } = await query;
  const rows = data ?? [];
  const totalCount = count ?? 0;

  const columns: Column<ServiceProvider>[] = [
    {
      key: "id",
      header: "ID",
      className: "w-16",
      render: (row) => (
        <Link href={`/service-providers/${row.id}`} className="font-mono text-xs hover:underline">
          {row.id}
        </Link>
      ),
    },
    {
      key: "category",
      header: "업종",
      className: "w-24",
      render: (row) => <Badge variant="outline">{row.category}</Badge>,
    },
    {
      key: "name",
      header: "이름",
      className: "w-32",
      render: (row) => (
        <Link href={`/service-providers/${row.id}`} className="font-medium hover:underline">
          {row.name}
        </Link>
      ),
    },
    {
      key: "email",
      header: "이메일",
      className: "w-44",
      render: (row) => <span className="text-sm">{row.email}</span>,
    },
    {
      key: "phone",
      header: "전화번호",
      className: "w-32",
      render: (row) => <span className="text-sm">{row.phone || "-"}</span>,
    },
    {
      key: "city",
      header: "도시",
      className: "w-24",
      render: (row) => <span className="text-sm">{row.city || "-"}</span>,
    },
    {
      key: "created_at",
      header: "등록일",
      className: "w-40",
      render: (row) => formatDate(row.created_at),
    },
  ];

  const filterParams: Record<string, string> = {};
  if (q) filterParams.q = q;
  if (category) filterParams.category = category;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">서비스제공자</h1>
        <CreateProviderDialog />
      </div>
      <ProviderFilters q={q} category={category} />
      <DataTable
        columns={columns}
        data={rows}
        totalCount={totalCount}
        page={page}
        pageSize={PAGE_SIZE}
        basePath="/service-providers"
        searchParams={filterParams}
      />
    </div>
  );
}

function ProviderFilters({ q, category }: { q: string; category: string }) {
  return (
    <form className="flex flex-wrap gap-2">
      <input
        name="q"
        defaultValue={q}
        placeholder="이름 / 이메일 / 전화번호 검색..."
        className="h-9 rounded-md border bg-background px-3 text-sm w-64"
      />
      <select
        name="category"
        defaultValue={category}
        className="h-9 rounded-md border bg-background px-3 text-sm"
      >
        <option value="">전체 업종</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        type="submit"
        className="h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90"
      >
        검색
      </button>
    </form>
  );
}
