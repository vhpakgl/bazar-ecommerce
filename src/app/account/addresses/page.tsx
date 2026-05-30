import { AddressBook } from "@/components/account/AddressBook";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default function AccountAddressesPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr] md:px-6 md:py-14">
      <AccountSidebar />
      <AddressBook />
    </main>
  );
}
