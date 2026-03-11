import { startTransition, useMemo, useState } from "react";

import { CustomerFormDialog } from "@/components/dashboard/customer-form-dialog";
import { CustomerTable } from "@/components/dashboard/customer-table";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DeleteCustomerDialog } from "@/components/dashboard/delete-customer-dialog";
import {
  type StatCardData,
  StatsCard,
} from "@/components/dashboard/stats-card";
import { mockCustomers } from "@/data/mock-dashboard";
import type { CustomerFormValues, CustomerRecord } from "@/types/customer";

function createCustomerRecord(
  nextId: number,
  values: CustomerFormValues,
): CustomerRecord {
  return {
    id: nextId,
    ...values,
    dateCreated: new Date().toISOString(),
  };
}

export function DashboardPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(
    null,
  );
  const [deletingCustomer, setDeletingCustomer] =
    useState<CustomerRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const stats = useMemo<StatCardData[]>(() => {
    const uniqueCountries = new Set(
      customers.map((customer) => customer.country),
    ).size;
    const enterpriseCustomers = customers.filter(
      (customer) => customer.customerType === "Enterprise",
    ).length;
    const addedThisMonth = customers.filter((customer) => {
      const created = new Date(customer.dateCreated);
      const now = new Date();
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length;

    return [
      {
        id: "customers",
        title: "Total customers",
        value: String(customers.length),
        change: 18,
        note: "Across active CRM accounts",
      },
      {
        id: "new",
        title: "New this month",
        value: String(addedThisMonth),
        change: 12,
        note: "Fresh accounts added in March",
      },
      {
        id: "enterprise",
        title: "Enterprise mix",
        value: String(enterpriseCustomers),
        change: 9,
        note: "High-value accounts in pipeline",
      },
      {
        id: "countries",
        title: "Countries served",
        value: String(uniqueCountries),
        change: 6,
        note: "Regional footprint across customers",
      },
    ];
  }, [customers]);

  const handleCreate = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const handleEdit = (customer: CustomerRecord) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const handleDelete = (customer: CustomerRecord) => {
    setDeletingCustomer(customer);
    setDeleteOpen(true);
  };

  const handleSave = (values: CustomerFormValues) => {
    startTransition(() => {
      setCustomers((current) => {
        if (editingCustomer) {
          return current.map((customer) =>
            customer.id === editingCustomer.id
              ? {
                  ...customer,
                  ...values,
                }
              : customer,
          );
        }

        const nextId =
          current.reduce((maxId, customer) => Math.max(maxId, customer.id), 0) +
          1;
        return [createCustomerRecord(nextId, values), ...current];
      });
    });

    setFormOpen(false);
    setEditingCustomer(null);
  };

  const confirmDelete = () => {
    if (!deletingCustomer) {
      return;
    }

    startTransition(() => {
      setCustomers((current) =>
        current.filter((customer) => customer.id !== deletingCustomer.id),
      );
    });

    setDeleteOpen(false);
    setDeletingCustomer(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard key={stat.id} stat={stat} />
          ))}
        </section>

        <section>
          <CustomerTable
            customers={customers}
            onAdd={handleCreate}
            onDelete={handleDelete}
            onEdit={handleEdit}
            pageSize={6}
            scrollable={false}
          />
        </section>
      </div>

      <CustomerFormDialog
        customer={editingCustomer}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) {
            setEditingCustomer(null);
          }
        }}
        onSave={handleSave}
      />

      <DeleteCustomerDialog
        customer={deletingCustomer}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) {
            setDeletingCustomer(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </DashboardLayout>
  );
}
