import { ResourceManager } from "@/components/admin/resources/resource-manager";

export default function WhitepapersAdminPage() {
  return (
    <ResourceManager
      lockedType="whitepaper"
      title="Whitepapers"
      description="Create and manage whitepapers (listing + detail pages)."
    />
  );
}
